import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChipDenomination, chipDenominations } from '../../chip.type';

interface ChipRenderParams {
    primary: string;
    accent: string;
}

const denominationRenderParamsMap: Record<ChipDenomination, ChipRenderParams> = {
    1: { primary: '#FFFFFF', accent: '#C4C4C4' },
    5: { primary: '#E6261D', accent: '#B82018' },
    10: { primary: '#141DE6', accent: '#0D138F' },
    25: { primary: '#008000', accent: '#006900' },
    50: { primary: '#d84712', accent: '#C23F10' },
    100: { primary: '#242424', accent: '#000000' },
    250: { primary: '#AB4DC2', accent: '#8B3F9E' },
    500: { primary: '#7638D1', accent: '#532894' },
    1000: { primary: '#8C8C8C', accent: '#666666' },
    2500: { primary: '#45D3F0', accent: '#3AB2C9' },
    5000: { primary: '#AF6E2F', accent: '#8F5B27' },
};

const svg = ({ primary, accent }: ChipRenderParams): string =>
    `<svg xmlns:osb="http://www.openswatchbook.org/uri/2009/osb" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="100%" height="auto" viewBox="0 0 250 200" version="1.1" id="svg885" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)" sodipodi:docname="chip.svg"> <defs id="defs879"> <linearGradient id="linearGradient3755" osb:paint="solid"> <stop style="stop-color: #079c00; stop-opacity: 1" offset="0" id="stop3753"/> </linearGradient> <marker style="overflow: visible" id="Arrow1Lstart" refX="0.0" refY="0.0" orient="auto" inkscape:stockid="Arrow1Lstart" inkscape:isstock="true" > <path transform="scale(0.8) translate(12.5,0)" style=" fill-rule: evenodd; stroke: #ffffff; stroke-width: 1pt; stroke-opacity: 1; fill: #079c00; fill-opacity: 1; " d="M 0.0,0.0 L 5.0,-5.0 L -12.5,0.0 L 5.0,5.0 L 0.0,0.0 z " id="path1503"/> </marker> <clipPath clipPathUnits="userSpaceOnUse" id="clipPath1000"> <g inkscape:label="Clip" id="use1002" style=" fill: ${primary}; fill-opacity: 1; stroke: ${accent}; stroke-width: 1.03014; stroke-linecap: butt; stroke-linejoin: round; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1; paint-order: fill markers stroke; "/> </clipPath> <clipPath clipPathUnits="userSpaceOnUse" id="clipPath1000-3"> <g inkscape:label="Clip" id="use1002-7" style=" fill: ${primary}; fill-opacity: 1; stroke: ${accent}; stroke-width: 1.00027; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1; " > <path id="path1197" style=" display: inline; opacity: 1; fill: ${primary}; fill-opacity: 1; stroke: ${accent}; stroke-width: 1.00027; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 28.5396; stroke-opacity: 1; paint-order: fill markers stroke; " d="M 199.57143,86.367561 A 71.626488,18.352694 0 0 1 127.94494,104.72025 71.626488,18.352694 0 0 1 56.318451,86.367561 71.626488,18.352694 0 0 1 127.94494,68.014868 71.626488,18.352694 0 0 1 199.57143,86.367561 Z"/> </g> </clipPath> </defs> <metadata id="metadata882"></metadata> <g inkscape:groupmode="layer" id="layer1" inkscape:label="Chip" style="display: inline" sodipodi:insensitive="true"> <path id="path1005" style=" display: inline; fill: ${primary}; fill-opacity: 1; stroke: ${accent}; stroke-width: 1.88976; stroke-linecap: butt; stroke-linejoin: round; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1; paint-order: fill markers stroke; " d="m 213.92126,330.42858 v 79.99915 c -10e-4,24.78187 50.53317,47.68136 134.29358,60.07227 83.75894,12.39064 186.95395,12.39064 270.71289,0 83.76042,-12.39091 133.95528,-35.2904 133.95417,-60.07227 l 0.37795,-79.99915 z" sodipodi:nodetypes="ccssccc" transform="scale(0.26458333)"/> <path id="path870-8-8" style=" display: inline; opacity: 1; fill: ${primary}; fill-opacity: 1; stroke: ${accent}; stroke-width: 1.03014; stroke-linecap: butt; stroke-linejoin: round; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 28.5396; stroke-opacity: 1; paint-order: fill markers stroke; " d="M 199.57143,86.367561 A 71.626488,18.352694 0 0 1 127.94494,104.72025 71.626488,18.352694 0 0 1 56.318451,86.367561 71.626488,18.352694 0 0 1 127.94494,68.014868 71.626488,18.352694 0 0 1 199.57143,86.367561 Z" transform="matrix(1,0,0,0.94233362,0,6.0388381)"/> <ellipse style=" display: inline; opacity: 1; fill: #141414; fill-opacity: 1; stroke: none; stroke-width: 5.24405; stroke-linecap: square; stroke-linejoin: round; stroke-dasharray: 5.24405, 15.7322; stroke-dashoffset: 24.1227; stroke-opacity: 1; paint-order: fill markers stroke; " id="path870-8" cx="127.94494" cy="87.425896" rx="62.36607" ry="15.058414"/> <ellipse style=" display: inline; opacity: 1; fill: #ffffff; fill-opacity: 1; stroke: none; stroke-width: 4.46539; stroke-linecap: square; stroke-linejoin: round; stroke-dasharray: 4.46539, 13.3962; stroke-dashoffset: 20.5408; stroke-opacity: 1; paint-order: fill markers stroke; " id="path870" cx="127.94494" cy="87.425896" rx="53.105652" ry="12.822468"/> <ellipse style=" display: inline; opacity: 1; fill: #ffffff; fill-opacity: 1; stroke: none; stroke-width: 4.70916; stroke-linecap: square; stroke-linejoin: round; stroke-dasharray: 4.70916, 14.1275; stroke-dashoffset: 21.6622; stroke-opacity: 1; paint-order: fill markers stroke; " id="path870-2" cx="127.94494" cy="87.425896" rx="56.004784" ry="13.522469"/> </g></svg>`;

/**
 * @description Chip denomination to its matching asset
 *
 * ```
 * { [denomination]: "<SVG_RENDER>" }
 * ```
 */
const pathByChipDenominationAndCount = chipDenominations.reduce(
    (prev, cur) => ({
        ...prev,
        [cur]: svg(denominationRenderParamsMap[cur]),
    }),
    {},
) as Record<ChipDenomination, string>;

/**
 * Given the `denomination` will render the correct asset path when used with `assetUrl`
 *
 * ```html
 * <!-- @usage -->
 * {{ denomination | chipRender}}
 * <!-- @result -->
 * <svg .../>
 * ```
 */
@Pipe({ name: 'chipRender' })
export class ChipRenderPipe implements PipeTransform {
    constructor(private readonly domSanitizer: DomSanitizer) {}

    transform(denomination: ChipDenomination): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(pathByChipDenominationAndCount[denomination]);
    }
}
