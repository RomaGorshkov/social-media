import js from '@eslint/js';
import parserTypescript from '@typescript-eslint/parser';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
      parser: parserTypescript,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['**/*.config.js', '**/*.config.ts', '**/.prettierrc.js'],
  },
];
