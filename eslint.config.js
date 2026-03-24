import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 允许在 useEffect 中调用 setState（React 19 新规则过于严格）
      'react-hooks/set-state-in-effect': 'off',
      // 允许组件和 Hook 在渲染时调用随机函数（用于骨架屏）
      'react-hooks/purity': 'warn',
      // 允许变量访问顺序问题（在某些情况下是合理的）
      'react-hooks/immutability': 'warn',
    },
  },
  // UI 组件文件可以忽略 fast-refresh 规则
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
