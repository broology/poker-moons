export const NG_ENVIRONMENT = 'ng_environment' as const;

export type EnvType = 'local' | 'production';

export interface NgEnvironment {
    /**
     * Configuration value to determine which environment the application is running under
     */
    env: EnvType;

    /**
     * The base url of the api server
     */
    api: string;
}
