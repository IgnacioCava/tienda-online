import nextJest from 'next/jest.js'
import type { Config } from 'jest'

const createJestConfig = nextJest({ dir: './' })

const customJestConfig: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    // Handle CSS imports (e.g., Tailwind or CSS modules)
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // Handle static assets (images, svgs, etc.)
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/mocks/fileMock.ts',
    // Handle aliases (if you're using @ or similar)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
}

export default createJestConfig(customJestConfig)
