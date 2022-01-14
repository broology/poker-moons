import { ExecutorContext, logger } from '@nrwl/devkit';
import { cli } from '../../util/cli';

interface AWSDockerBuildAndPush {
    region: string;
    ecrRegistryUrl: string;
    platform: string;
    tag: string;
}

export default async function (
    options: AWSDockerBuildAndPush,
    context: ExecutorContext,
): Promise<{ success: boolean }> {
    const app = context.projectName;

    logger.log(`Starting Docker Build of ${app}`);

    const appRegistry = `${options.ecrRegistryUrl}/${context.projectName}`;

    //  Build docker image with linux/arm64, as that's what we are using on elastic beanstalk
    cli(
        `docker build . -t "${context.projectName}:${options.tag}" --target="${context.projectName}" --memory=500m -f ./apps/${context.projectName}/Dockerfile --platform=${options.platform}`,
    );

    // Before we can push to ecr, we need to authenticate with it
    cli(`docker login -u AWS -p $(aws ecr get-login-password --region ${options.region}) ${options.ecrRegistryUrl}`);

    // Tag Image
    cli(`docker tag "${context.projectName}:${options.tag}" "${appRegistry}:${options.tag}"`);

    // Push docker image
    cli(`docker push "${appRegistry}:${options.tag}"`);

    logger.log(`Docker Build and Push for ${app} was successful`);

    return { success: true };
}
