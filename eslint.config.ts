import eonova from '@eonova/eslint-config'

export default eonova(
  {
    unocss: true,
    formatters: true,
    ignores: [
      'eslint.config.mjs',
      'src/helper/pinia-auto-refs.ts',
      'scripts/verify-commit.ts',
    ],
  },
)
