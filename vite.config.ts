import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig({
  // 性能优化：预构建依赖
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'zustand'],
    force: true,
  },
  build: {
    sourcemap: false,
    // 优化：减小初始加载体积
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      format: {
        comments: false,
      },
    },
    // 性能优化：目标现代浏览器
    target: 'es2022',
    // 优化：更小的 chunk 大小
    chunkSizeWarningLimit: 500,
    // 优化：代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // 第三方库独立打包
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-utils': ['zustand', 'clsx', 'tailwind-merge', 'lucide-react'],
          // 将页面按功能分组
          'page-home': ['./src/pages/Home.tsx'],
          'page-data-analysis': ['./src/pages/DataAnalysisCourse.tsx'],
          'page-python': ['./src/pages/PythonCourse.tsx'],
          'page-finance': ['./src/pages/FinancialAnalysisCourse.tsx'],
          'page-data-collection': ['./src/pages/DataCollectionCourse.tsx'],
          'page-supply-chain': ['./src/pages/SupplyChainCourse.tsx'],
          'page-database': ['./src/pages/DatabaseCourse.tsx'],
        },
      },
    },
    // 性能优化：启用增量构建缓存
    commonjsOptions: {
      include: /node_modules/,
    },
  },
  server: {
    // 开发服务器优化
    warmup: {
      clientFiles: ['./src/main.tsx', './src/App.tsx'],
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
