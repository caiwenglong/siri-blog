const timeStamp = new Date().getTime()
const path = require('path')
const name = 'siri blog'
const port = 8086
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/siri-blog/' : '/',
  devServer: {
    hot: true,
    port: port,
    open: false,
    proxy: {
      '/user-api': {
        target: 'http://localhost:8003',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/user-api': ''
        }
      },
      '/article-api': {
        target: 'http://localhost:8002',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/article-api': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pwa: {
    name: name
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  transpileDependencies: [
    'quasar',
    'vue-echarts',
    'resize-detector'
  ],

  // 关闭 sourcemap
  productionSourceMap: false,

  // 打包的时候不使用 hash 值
  filenameHashing: false,

  // Webpack 函数式配置
  configureWebpack: config => {
    // 体积分析
    if(process.env.use_analyzer) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }

    // 生产环境配置
    if(process.env.NODE_ENV === 'production') {
      // 消除 console 输出信息
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

      // Gzip 压缩
      const CompressionPlugin = require('compression-webpack-plugin')
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|woff|woff2|svg)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )

      // 将 js 文件夹添加时间戳，这样浏览器不会加载上个版本缓存的代码
      config.output.filename = `js/[name].${timeStamp}.js`
      config.output.chunkFilename = `js/[name].${timeStamp}.js`
    } else {
      // 开发环境配置
    }
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if(
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content
          }
          return content
        }
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugins.delete('preload')

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
