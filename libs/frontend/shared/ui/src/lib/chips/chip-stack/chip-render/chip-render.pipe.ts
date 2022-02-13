import { Pipe, PipeTransform } from '@angular/core';
import { ChipDenomination } from '../../chip.type';

const buildAssetPath = (denomination: ChipDenomination, count: number) =>
    `/chips/${denomination}/chip-${denomination}-${count}.svg`;

/**
 * Given the `denomination` will render the correct asset path when used with `assetUrl`
 *
 * ```html
 * <!-- @usage -->
 * <img [src]="5000 | chipRender: 1 | assetUrl"/>
 * <!-- @result -->
 * <img [src]="https://assets.poker-moons.net/chips/5000/chip-5000-1.svg"/>
 * ```
 */
@Pipe({ name: 'chipRender' })
export class ChipRenderPipe implements PipeTransform {
    transform(denomination: ChipDenomination, count: number): string {
        return buildAssetPath(denomination, count);
    }
}
