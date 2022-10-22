/* eslint-disable */
export default {
    displayName: 'backend-data-access-state',

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
    coverageDirectory: '../../../../coverage/libs/backend/data-access/state',
    preset: '../../../../jest.preset.js',
};
