import { logger } from '@nrwl/devkit';
import { execSync } from 'child_process';

/**
 * Allows typescript to run `cli` commands as a function. And prints information for `circleci`
 *
 * @param command - Command to execute in the `cli`
 * @returns - Result of the command
 */
export function cli(command: string): string {
    logger.log(`Executing ${command}`);
    try {
        const result = execSync(command).toString();
        logger.info(`\t${result}`);
        return result;
    } catch (e) {
        logger.error(`Command: "${command}" failed`);
        throw e;
    }
}
