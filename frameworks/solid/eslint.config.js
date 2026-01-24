import {
  baseConfigs,
  createSourceConfig,
  tseslint,
} from '@formisch/eslint-config';
import solidLint from 'eslint-plugin-solid/configs/typescript';

export default tseslint.config(
  { ignores: ['eslint.config.js'] },
  ...baseConfigs,
  {
    ...createSourceConfig({ tsconfigRootDir: import.meta.dirname }),
    plugins: { ...solidLint.plugins, ...createSourceConfig().plugins },
    rules: {
      ...solidLint.rules,
      ...createSourceConfig().rules,
    },
  }
);
