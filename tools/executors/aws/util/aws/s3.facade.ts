import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { logger } from '@nrwl/devkit';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

export class S3Facade {
    private static CONTENT_TYPE_MAP: Record<string, string> = {
        html: 'text/html; charset=UTF-8',
        js: 'text/javascript; charset=UTF-8',
        css: 'text/css; charset=UTF-8',
        json: 'application/json; charset=UTF-8',
        zip: 'application/zip; charset=UTF-8',
    };

    private client: S3Client;

    constructor(region: string) {
        this.client = new S3Client({ region });
    }

    /**
     * Scans the directory to find all the files paths that exist under it.
     *
     * @param directory - The directory to get file paths under
     */
    private static getFilePaths(directory: string): string[] {
        const filePaths: string[] = [];

        for (const file of readdirSync(directory)) {
            const dirPath = join(directory, file);

            if (statSync(dirPath).isDirectory()) {
                filePaths.push(...S3Facade.getFilePaths(dirPath));
            } else {
                filePaths.push(dirPath);
            }
        }

        return filePaths;
    }

    /**
     * Given the filePath determines the `Content-Type` of the file
     *
     * @param filePath - The path of the file
     * @returns - The content type of the file eg. text/html
     */
    private static getContentType(filePath: string): string {
        return S3Facade.CONTENT_TYPE_MAP[filePath.split('.').pop() as string];
    }

    /**
     * Takes the files in the local `directory` and uploads them to the given S3 `bucket`
     *
     * @param bucket - The S3 bucket to upload the files too
     * @param directory - The local directory to get the files to upload
     */
    async uploadDirectoryToBucket(bucket: string, directory: string): Promise<void> {
        const filePaths = S3Facade.getFilePaths(directory);

        logger.log(`Starting Upload from ${directory}=>s3://${bucket}`);
        await Promise.all(
            filePaths.map((filePath) =>
                this.uploadFileToBucket(bucket, filePath.substring(directory.length + 1), filePath),
            ),
        );
        logger.log(`Finished Upload from ${directory}=>s3://${bucket}`);
    }

    async uploadFileToBucket(bucket: string, key: string, filePath: string): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            ContentType: S3Facade.getContentType(filePath),
            Body: readFileSync(filePath),
        });

        const result = await this.client.send(command);

        if (result.$metadata.httpStatusCode !== 200) {
            logger.error(JSON.stringify(result, null, '\t'));
            throw new Error(`Failed to upload file ${filePath}=>s3://${bucket}/${key}`);
        }

        logger.log(`\tUploaded: ${filePath}=>s3://${bucket}/${key}`);
    }
}
