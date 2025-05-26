import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [
    '@tailwindcss/typography',
    'tailwindcss',
    'lint-staged',
  ],
  entry: [
    '*.config.mjs',
    '*.config.ts',
  ],
  project: [
    'src/**/*.{ts,tsx}',
    'scripts/*.ts',
  ],
  ignore: [
    './scripts/verify-commit.ts',
    '**/*.d.ts',
  ],
}

export default config
