import {
    CreateApplicationVersionCommand,
    DescribeEnvironmentsCommand,
    ElasticBeanstalkClient,
    UpdateEnvironmentCommand,
    waitUntilEnvironmentUpdated,
} from '@aws-sdk/client-elastic-beanstalk';
import { logger } from '@nrwl/devkit';

interface CreateApplicationVersionInput {
    applicationName: string;
    versionLabel: string;
    sourceBundle: {
        bucket: string;
        key: string;
    };
}

interface UpdateEnvironmentVersionInput {
    environmentName: string;
    version: string;
}

export class ElasticBeanstalkFacade {
    /**
     * Amount of time to wait for an elastic beanstalk deployment to become healthy, before assuming deployment failed
     */
    private static EB_TIMEOUT_MINUTES = 30;

    private client: ElasticBeanstalkClient;

    /**
     * Instantiates a connection the the elastic beanstalk client.
     *
     * @param region - The aws region of the client
     */
    constructor(region: string) {
        this.client = new ElasticBeanstalkClient(region);
    }
    /**
     * Creates an ApplicationVersion in elastic beanstalk for the application. This application version
     * will automatically be applied to the application.
     *
     * Keep in mind this method does not wait for the application version to be deployed onto the instance,
     * it pushes the request to aws.
     *
     * @param input - Application name, version label,
     * @throws { Error } - If the application version fails to be created
     */
    async createApplicationVersion(input: CreateApplicationVersionInput): Promise<void> {
        const command = new CreateApplicationVersionCommand({
            ApplicationName: input.applicationName,
            SourceBundle: {
                S3Bucket: input.sourceBundle.bucket,
                S3Key: input.sourceBundle.key,
            },
            VersionLabel: input.versionLabel,
            Process: true,
        });

        const result = await this.client.send(command);

        if (result.$metadata.httpStatusCode !== 200) {
            logger.error(result);
            throw new Error(`Failed to create application version ${input.versionLabel}`);
        }
    }

    /**
     * Updates the eb environment with the new version. Then waits until deploy completes and instances become healthy
     *
     * @param input - Environment name, and version to be deploying to the environment
     * @throws { Error } - If the environment version failed to be created
     */
    async updateEnvironmentVersion(input: UpdateEnvironmentVersionInput): Promise<void> {
        const command = new UpdateEnvironmentCommand({
            EnvironmentName: input.environmentName,
            VersionLabel: input.version,
        });

        const result = await this.client.send(command);

        if (result.$metadata.httpStatusCode !== 200) {
            logger.error(result);
            throw new Error(`Failed to update environment version ${input.environmentName}`);
        }

        logger.log(`\twaiting for instances to become healthy...`);
        await this.awaitSuccessfulVersionDeploy(input.environmentName, input.version);
    }

    private async awaitSuccessfulVersionDeploy(environmentName: string, expectedVersion: string): Promise<void> {
        // * Wait for environment to finish update
        const updateResult = await waitUntilEnvironmentUpdated(
            {
                client: this.client,
                maxWaitTime: ElasticBeanstalkFacade.EB_TIMEOUT_MINUTES * 60,
            },
            { EnvironmentNames: [environmentName] },
        );

        if (updateResult.state !== 'SUCCESS') {
            logger.error(updateResult);
            throw new Error(`Something went wrong updating environment ${environmentName}`);
        }

        // * Check that version after update is the same as version requested
        const command = new DescribeEnvironmentsCommand({
            EnvironmentNames: [environmentName],
        });

        const result = await this.client.send(command);

        if (result.Environments && result.Environments[0].VersionLabel !== expectedVersion) {
            logger.error(result);
            throw new Error(
                `Failed to update environment ${environmentName} to version ${expectedVersion}. It's been reverted to previous version`,
            );
        }
    }
}
