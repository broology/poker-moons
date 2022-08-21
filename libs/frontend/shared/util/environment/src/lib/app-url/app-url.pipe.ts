import { Inject, Pipe, PipeTransform } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '../ng-environment';

/**
 * @description Given the relative path, this pipe builds the app url depending on the environment.
 *
 * @example
 *     <img [src]="'/path/image.png' | appUrl"/>
 *     // _Will render as:_
 *     <img src="https://beta.pokermoons.net/path' "/>
 */
@Pipe({ name: 'appUrl' })
export class AppUrlPipe implements PipeTransform {
    constructor(@Inject(NG_ENVIRONMENT) private readonly ngEnvironment: NgEnvironment) {}

    transform(path: string): string {
        return `${this.ngEnvironment.app}${path}`;
    }
}
