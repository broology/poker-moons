import { logger } from '@nrwl/devkit';
import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

interface TemplateBuildInput {
    app: string;
    ecrRegistry: string;
    tag: string;
    dockerPort: string;
}

const buildAWSEBDockerRunTemplate = ({ ecrRegistry, app, tag, dockerPort }: TemplateBuildInput): string => `
    {
    "AWSEBDockerrunVersion": "1",
    "Image": {
        "Name": "${ecrRegistry}/${app}:${tag}",
        "Update": "true"
    },
    "Ports": [
        {
        "ContainerPort": "${dockerPort}"
        }
    ],
    "Volumes": [
        {
        "HostDirectory": "/var/app",
        "ContainerDirectory": "/opt/app"
        }
    ],
    "Logging": "/var/log/app"
    }
    `;

/**
 * Zips files given into a folder at the `dest` path
 */
async function zip(files: { path: string; body: Buffer }[], dest: string): Promise<void> {
    return new Promise((resolve) => {
        const output = createWriteStream(dest);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('end', () => logger.log('Data has been drained'));
        output.on('close', () => {
            resolve();
        });

        archive.on('warning', (err: { code: string }) => {
            if (err.code === 'ENOENT') {
                logger.warn(['Warning: ', err]);
            } else {
                throw err;
            }
        });

        archive.on('error', (err: unknown) => {
            throw err;
        });

        archive.pipe(output);

        for (const file of files) {
            archive.append(file.body, {
                name: file.path,
            });
        }

        archive.finalize();
    });
}

/**
 * Builds the `Dockerrunaws.json` file and zips it into a zip as that is what is expected of elastic beanstalk
 *
 * @returns path - Containing the build path to the created template zip
 */
export async function buildDockerRunTemplate(input: TemplateBuildInput): Promise<string> {
    const path = join(cwd(), 'dist', `${input.app}-${input.tag}.zip`);

    await zip(
        [
            {
                path: 'Dockerrun.aws.json',
                body: Buffer.from(buildAWSEBDockerRunTemplate(input), 'utf-8'),
            },
        ],
        path,
    );
    return path;
}
