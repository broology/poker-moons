import { ExecutorContext, logger } from '@nrwl/devkit';
import { S3Facade } from '../util/aws/s3.facade';
import { ElasticBeanstalkFacade } from './util/elastic-beanstalk.facade';
import { buildDockerRunTemplate } from './util/templates';

interface AWSElasticBeanstalkDeploy {
    region: string;
    ebEnvironment: string;
    ebApplication: string;
    ecrRegistryUrl: string;
    ebDeploymentBucket: string;
    tag: string;
}

export default async function (
    options: AWSElasticBeanstalkDeploy,
    context: ExecutorContext,
): Promise<{ success: boolean }> {
    const app = context.projectName!;

    logger.log(`Starting deployment of ${app}`);

    // * Create AWSDockerrun build
    const zip = await buildDockerRunTemplate({
        app,
        ecrRegistry: options.ecrRegistryUrl,
        tag: options.tag,
        dockerPort: '4000',
    });
    logger.log(`\tBuilt ${zip}`);
    const key = zip.split('/').pop()!;

    // * Upload AWSDockerrun build to S3
    const s3 = new S3Facade(options.region);

    await s3.uploadFileToBucket(options.ebDeploymentBucket, key, zip);

    // * Perform Elastic Beanstalk deployment
    const eb = new ElasticBeanstalkFacade(options.region);

    logger.log('Creating eb application version');
    await eb.createApplicationVersion({
        applicationName: options.ebApplication,
        versionLabel: options.tag,
        sourceBundle: {
            bucket: options.ebDeploymentBucket,
            key,
        },
    });
    logger.log(`\t Version ${key} created`);

    logger.log('Updating environment with new version');
    await eb.updateEnvironmentVersion({
        environmentName: options.ebEnvironment,
        version: options.tag,
    });

    logger.log(`Deployment of ${app} Successful`);

    return { success: true };
}
