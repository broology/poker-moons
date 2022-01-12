import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { logger } from '@nrwl/devkit';

export class CloudFrontFacade {
    private client: CloudFrontClient;

    constructor(region: string) {
        this.client = new CloudFrontClient({ region });
    }

    /**
     * Invalidate the cache on the given cloudfront distribution.
     * This can only be done once every minute per distribution.
     *
     * @param distributionId - The cloudfront distribution id to invalidate
     */
    async invalidate(distributionId: string): Promise<void> {
        const callerReference = `${Math.round(Date.now() / 60000)}`;

        const command = new CreateInvalidationCommand({
            DistributionId: distributionId,
            InvalidationBatch: {
                Paths: { Quantity: 1, Items: ['/*'] },
                /**
                 * Can't submit an invalidation request more than once a minute
                 */
                CallerReference: callerReference,
            },
        });

        const result = await this.client.send(command);

        if (result.$metadata.httpStatusCode !== 201) {
            logger.error(JSON.stringify(result, null, '\t'));
            throw new Error(`Failed to invalidate ${distributionId}`);
        }

        logger.log(`Created invalidation ${result.Invalidation?.Id}:${callerReference}`);
    }
}
