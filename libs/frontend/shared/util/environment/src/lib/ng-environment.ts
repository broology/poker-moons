export const NG_ENVIRONMENT = 'ng_environment' as const;

export type EnvType = 'local' | 'production' | 'testing';

export interface NgEnvironment {
    /**
     * Configuration value to determine which environment the application is running under
     */
    env: EnvType;

    /**
     * The base url of the api server (no trailing slash)
     */
    api: string;

    /**
     * The base url of the assets cdn domain. (no trailing slash)
     */
    assets: string;
}
