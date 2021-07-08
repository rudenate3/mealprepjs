const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>']
}
