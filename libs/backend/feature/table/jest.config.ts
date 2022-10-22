/* eslint-disable */
export default {
    displayName: 'backend-feature-table',

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
    coverageDirectory: '../../../../coverage/libs/backend/feature/table',
    preset: '../../../../jest.preset.js',
};
