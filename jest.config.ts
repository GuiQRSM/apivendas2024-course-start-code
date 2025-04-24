/* eslint-disable prettier/prettier */
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testRegex: '.*\\.spec\\.ts$',
  transforf: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  couverageDirectory: 'coverage',
  testEnvironment: 'node',
}
