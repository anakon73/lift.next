import antfu from '@antfu/eslint-config'
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'

export default antfu({
  plugins: {
    'readable-tailwind': eslintPluginReadableTailwind,
  },
  rules: {
    'max-len': ['error', { code: 80 }],
    'perfectionist/sort-imports': ['off'],
    'import/order': [
      'warn',
      { groups: ['builtin', 'external'], warnOnUnassignedImports: true },
    ],
    'unused-imports/no-unused-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    ...eslintPluginReadableTailwind.configs.warning.rules,
    ...eslintPluginReadableTailwind.configs.error.rules,
    'readable-tailwind/multiline': ['warn', { printWidth: 80 }],
  },
})
