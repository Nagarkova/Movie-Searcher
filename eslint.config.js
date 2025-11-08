import tsParser from '@typescript-eslint/parser';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '*.min.js'
    ],
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularPlugin,
      'prettier': prettierPlugin,
      'import': importPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '*.min.js'
    ],
    files: ['src/**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },
];
