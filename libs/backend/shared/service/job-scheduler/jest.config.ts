/* eslint-disable */
export default {
    displayName: 'backend-shared-service-job-scheduler',

    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../../coverage/libs/backend/shared/service/job-scheduler',
    preset: '../../../../../jest.preset.js',
};
