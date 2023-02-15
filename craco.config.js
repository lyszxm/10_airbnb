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
            drop_debugger: true, //是否清除debugger
            drop_console: false, // 若为true则移除console.*函数且移除console.log的引用 --- 例如 log = console.log, 移除log，同时移除console.log
            pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.debug'] //drop_console 设置false,需要特殊清除的
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
