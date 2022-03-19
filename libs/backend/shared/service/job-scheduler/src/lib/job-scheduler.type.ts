export interface StartScheduledJobArgs<T> {
    /**
     * Delay of seconds to wait until the job executes
     */
    delayInSeconds: number;

    /**
     * The name of the job being created.
     * - Name that will be used in the `@Consumer('${Name}')` implementation
     */
    name: string;

    /**
     * A unique identifier of the job.
     * - Should be deterministic as you'll use this same id for `start` and `stop`
     */
    jobId: string;

    /**
     * Data to be stored with the job.
     */
    data: T;
}
