module.exports = {
    displayName: 'backend-feature-table',
    preset: '../../../../jest.preset.js',
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
    moduleNameMapper: {
        "@poker-moons/shared/testing": "../../../../../../../shared/testing/src/index.ts",
        "@poker-moons/shared/type": "../../../../../../../shared/type/src/index.ts",
        "@poker-moons/shared/util": "../../../util/src/index.ts"
    },
};
