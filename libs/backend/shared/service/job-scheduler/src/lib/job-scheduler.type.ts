export interface ScheduleJobArgs<T> {
    /**
     * @description Delay of seconds to wait until the job executes.
     */
    delayInSeconds: number;

    /**
     * @description The name of the job being created.
     *
     * - Name that will be used in the `@Consumer('${Name}')` implementation.
     */
    name: string;

    /**
     * @description A unique identifier of the job.
     *
     * - Should be deterministic as you'll use this same id for `start` and `stop`
     */
    jobId: string;

    /**
     * @description Data to be stored with the job.
     */
    data: T;
}
