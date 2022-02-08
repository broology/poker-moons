import { Pipe, PipeTransform } from '@angular/core';
import { ChipDenomination } from '../../chip.type';

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
