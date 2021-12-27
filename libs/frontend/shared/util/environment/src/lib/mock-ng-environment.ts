import { Provider } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from './ng-environment';

const mockNgEnvironment: NgEnvironment = {
    env: 'testing',
    api: '',
    assets: 'https://d17df73wtlc9mc.cloudfront.net',
};

export const MockNgEnvironment: Provider = {
    provide: NG_ENVIRONMENT,
    useValue: mockNgEnvironment,
};
