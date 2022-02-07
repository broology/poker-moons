import { Pipe, PipeTransform } from '@angular/core';
import { ChipDenomination } from '../../chip.type';

// Denomination colours
// 1: { primary: '#FFFFFF', accent: '#C4C4C4' },
// 5: { primary: '#E6261D', accent: '#B82018' },
// 10: { primary: '#141DE6', accent: '#0D138F' },
// 25: { primary: '#008000', accent: '#006900' },
// 50: { primary: '#d84712', accent: '#C23F10' },
// 100: { primary: '#242424', accent: '#000000' },
// 250: { primary: '#AB4DC2', accent: '#8B3F9E' },
// 500: { primary: '#7638D1', accent: '#532894' },
// 1000: { primary: '#8C8C8C', accent: '#666666' },
// 2500: { primary: '#45D3F0', accent: '#3AB2C9' },
// 5000: { primary: '#AF6E2F', accent: '#8F5B27' },

const buildAssetPath = (denomination: ChipDenomination) => `/chips/chip-${denomination}.svg`;

/**
 * Given the `denomination` will render the correct asset path when used with `assetUrl`
 *
 * ```html
 * <!-- @usage -->
 * <img [src]="denomination | chipRender | assetUrl"/>
 * <!-- @result -->
 * <svg .../>
 * ```
 */
@Pipe({ name: 'chipRender' })
export class ChipRenderPipe implements PipeTransform {
    transform(denomination: ChipDenomination): string {
        return buildAssetPath(denomination);
    }
}
