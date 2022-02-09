/**
 * This script will take a stack list of manually created denomination 1 chips, and the chips for all other denominations.
 * Applying the new colours, and new price values to the original svg data and creating new files to be uploaded to cloudfront
 * under s3://poker-moons-assets/chips/`
 *
 * @Usage
 * - Populate `./assets/1/chip-1-{STACK_SIZE}.svg`
 * - run `yarn ts-node tools/scripts/chip-generation/index.ts`
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ChipDenominationImgData {
    denomination: number;
    primary: string;
    accent: string;
}

/**
 * The type of chip that has been manually created
 */
const manual: ChipDenominationImgData = { denomination: 1, primary: '#ffffff', accent: '#c4c4c4' };
const manualTextXValue = '54.600403';

/**
 * The chips that will be created via this script
 */
const automated: ChipDenominationImgData[] = [
    { denomination: 5, primary: '#e6261d', accent: '#b82018' },
    { denomination: 10, primary: '#141de6', accent: '#0d138f' },
    { denomination: 25, primary: '#008000', accent: '#006900' },
    { denomination: 50, primary: '#d84712', accent: '#c23f10' },
    { denomination: 100, primary: '#242424', accent: '#000000' },
    { denomination: 250, primary: '#ab4dc2', accent: '#8b3f9e' },
    { denomination: 500, primary: '#7638d1', accent: '#532894' },
    { denomination: 1000, primary: '#8c8c8c', accent: '#666666' },
    { denomination: 2500, primary: '#45d3f0', accent: '#3ab2c9' },
    { denomination: 5000, primary: '#af6e2f', accent: '#8f5b27' },
];

/**
 * Number of chips that can sit in a stack (an asset per type)
 */
const chipsPerStack = 10;

/**
 * Function to get the x value of a denomination to center it based on the number of characters in the number
 */
function denominationNumberOfZerosToPriceX(size: number): string {
    switch (size) {
        case 1:
            return '54.600403';
        case 2:
            return '49.599022';
        case 3:
            return '44.638226';
        case 4:
            return '39.538139';
        default:
            throw Error('Unsupported size of denomination, currently only support $0-$9999');
    }
}
const assetFolder = (denomination: number) => join(__dirname, `assets/${denomination}`);
const fileName = (denomination: number, stack: number) => `chip-${denomination}-${stack}.svg`;
function replaceAll(text: string, findText: string, replaceText: string): string {
    return text.replace(new RegExp(findText, 'g'), replaceText);
}

/**
 * Applies changes to update the manual svg to a new automated chip
 */
function applyChanges(imgData: ChipDenominationImgData, svg: string): string {
    // * Replace Colours
    const replacedPrimary = replaceAll(svg, manual.primary, imgData.primary);
    const replacedColours = replaceAll(replacedPrimary, manual.accent, imgData.accent);

    // * Replace Price
    const replacedPrice = replaceAll(replacedColours, `${manual.denomination}<`, `${imgData.denomination}<`);
    const replacedPriceX = replaceAll(
        replacedPrice,
        manualTextXValue,
        denominationNumberOfZerosToPriceX(`${imgData.denomination}`.length),
    );

    return replacedPriceX;
}

if (!existsSync(assetFolder(manual.denomination))) {
    throw new Error('Missing manually created base denomination');
}

for (const { denomination, primary, accent } of automated) {
    // * Load svg base svg files data into memory
    let svgs = new Array(chipsPerStack)
        .fill(0)
        .map((_, idx) =>
            readFileSync(join(assetFolder(manual.denomination), fileName(manual.denomination, idx + 1))).toString(
                'utf-8',
            ),
        );

    // * Write updated svg data to denomination files
    for (let [idx, svg] of svgs.entries()) {
        const folder = assetFolder(denomination);

        // * Create folder if doesn't exist
        if (!existsSync(folder)) {
            mkdirSync(folder);
        }

        const updatedSvg = applyChanges({ denomination, primary, accent }, svg);

        writeFileSync(join(folder, fileName(denomination, idx + 1)), Buffer.from(updatedSvg, 'utf8'));
    }
}
