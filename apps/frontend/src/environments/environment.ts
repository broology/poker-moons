import { NgEnvironment } from '@poker-moons/frontend/shared/util/environment';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: NgEnvironment = {
    env: 'local',

    app: 'http://localhost:4200',

    api: 'http://localhost:3000',

    assets: 'https://d17df73wtlc9mc.cloudfront.net',
};
