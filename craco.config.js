const path = require('path')
const CracoLessPlugin = require('craco-less')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = pathname => path.resolve(__dirname, pathname)
module.exports = {
  // less
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  // webpack
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      utils: resolve('src/utils')
      /* 更具官方文档 使用styled-components需替换依赖引入 */
      // '@mui/styled-engine': '@mui/styled-engine-sc'
    },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            // 移除 debugger
            drop_debugger: true,
            // 移除console.*函数
            drop_console: true,
            // 移除console.log的引用
            // 例如 log = console.log, 移除log，同时移除console.log
            pure_funcs: ['console.log']
          }
        },
        // 多进程并行运行
        parallel: true,
        // 启用缓存
        cache: true,
        // 抽取注释
        extractComments: true
      })
    ]
  }
}
