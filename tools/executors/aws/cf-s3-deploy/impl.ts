import { ExecutorContext, logger } from '@nrwl/devkit';
import { join } from 'path';
import { cwd } from 'process';
import { S3Facade } from '../util/aws/s3.facade';
import { CloudFrontFacade } from './../util/aws/cloud-front.facade';
interface AWSCloudFrontS3Deploy {
    region: string;
    bucket: string;
    distributionId: string;
}

export default async function (
    options: AWSCloudFrontS3Deploy,
    context: ExecutorContext,
): Promise<{ success: boolean }> {
    const app = context.projectName;

    logger.log(`Starting deployment of ${app}`);

    const cloudFrontFacade = new CloudFrontFacade(options.region);
    const s3Facade = new S3Facade(options.region);

    const buildPath = join(cwd(), `dist/apps/${app}`);

    await s3Facade.uploadDirectoryToBucket(options.bucket, buildPath);
    await cloudFrontFacade.invalidate(options.distributionId);

    logger.log(`Deployment of ${app} Successful`);

    return { success: true };
}
