import {
  baseConfigs,
  componentRules,
  createSourceConfig,
  tseslint,
} from '@formisch/eslint-config';
import preact from 'eslint-config-preact';

export default tseslint.config(
  { ignores: ['eslint.config.js', 'dist'] },
  ...baseConfigs,
  {
    ...preact[1],
    ...createSourceConfig({ tsconfigRootDir: import.meta.dirname }),
    plugins: { ...preact[1].plugins, ...createSourceConfig().plugins },
    languageOptions: {
      ...preact[1].languageOptions,
      parser: undefined,
      parserOptions: createSourceConfig().languageOptions.parserOptions,
    },
    rules: {
      ...preact[1].rules,
      ...createSourceConfig().rules,
      // Preact-specific rules
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
    },
  },
  {
    files: ['src/components/**/*.tsx'],
    rules: componentRules,
  }
);
