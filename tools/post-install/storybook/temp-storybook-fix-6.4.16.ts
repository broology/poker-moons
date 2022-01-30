import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

/**
 * The @storybook/angular@6.4.16 package is using the incorrect form of imports for an esm module.
 *
 * This script replaces that file with the correct import, so that storybooks can be run.
 *
 */
export function fixIncorrectStorybookAngularImport(): void {
    const filePath = join(cwd(), 'node_modules/@storybook/angular/dist/ts3.9/server/framework-preset-angular-cli.js');

    const file = readFileSync(filePath);

    const brokenCode = Buffer.from(file).toString('utf-8');

    const fixedCode = brokenCode.replace(
        `                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('@angular/core')); }).then(function (m) {
                            return semver_1.default.coerce(m.VERSION.full);
                        })];`,
        `                   return [4 /*yield*/, Promise.resolve().then(function () { return import('@angular/core').then((m)=> semver_1.default.coerce(m.VERSION.full)); })];`,
    );

    writeFileSync(filePath, Buffer.from(fixedCode, 'utf-8'));
    console.warn(`**DEPRECATED after version @storybook/angular@6.4.16** Replaced ${filePath} with esm import.`);
}
