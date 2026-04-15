import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
    // 优化：减小初始加载体积
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 优化：代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // 将课程页面拆分为独立的chunk
          'courses': [
            './src/pages/DataAnalysisCourse.tsx',
            './src/pages/PythonCourse.tsx',
            './src/pages/FinancialAnalysisCourse.tsx',
            './src/pages/DataCollectionCourse.tsx',
            './src/pages/SupplyChainCourse.tsx',
            './src/pages/DatabaseCourse.tsx'
          ],
          // 将组件拆分为独立的chunk
          'components': [
            './src/components/ChapterExercise.tsx',
            './src/components/ChapterContent.tsx'
          ],
        },
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }), 
    tsconfigPaths()
  ],
})
