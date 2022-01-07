import { Inject, Pipe, PipeTransform } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '../ng-environment';

/**
 * Given the relative path of an asset, this pipe builds the asset url to the correct cdn,
 * depending on the environment.
 *
 * @example
 * ```html
 * <img [src]="'/path/image.png' | assetUrl"/>
 * ```
 * _Will render as:_
 * ```html
 * <img src="https://poker-moons-domain-cdn.com/path/image.png' "/>
 * ```
 *
 */
@Pipe({ name: 'assetUrl' })
export class AssetUrlPipe implements PipeTransform {
    constructor(@Inject(NG_ENVIRONMENT) private readonly ngEnvironment: NgEnvironment) {}

    transform(path: string): string {
        return `${this.ngEnvironment.assets}${path}`;
    }
}
