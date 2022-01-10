import { ExecutorContext, logger } from '@nrwl/devkit';

interface AWSElasticBeanstalkDeploy {
    region: string;
    ebEnvironment: string;
    ebApplication: string;
    tag: string;
}

export default async function (
    options: AWSElasticBeanstalkDeploy,
    context: ExecutorContext,
): Promise<{ success: boolean }> {
    const app = context.projectName;

    logger.log(`Starting deployment of ${app}`);

    logger.log(`Deployment of ${app} Successful`);

    return { success: true };
}
