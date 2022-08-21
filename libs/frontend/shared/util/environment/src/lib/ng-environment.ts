export const NG_ENVIRONMENT = 'ng_environment' as const;

export type EnvType = 'local' | 'production' | 'testing';

export interface NgEnvironment {
    /**
     * @description Configuration value to determine which environment the application is running under.
     */
    env: EnvType;

    /**
     * @description The base url of the the frontend app being served.
     */
    app: string;

    /**
     * @description The base url of the api server (no trailing slash)
     */
    api: string;

    /**
     * @description The base url of the assets cdn domain. (no trailing slash)
     */
    assets: string;
}
