// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 5001,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 解决跨域的问题请看 https://github.com/chimurai/http-proxy-middleware#proxycontext-config
    proxyTable: {
      '/api':{
        target:'http://academy.yonyou.com',
        changeOrigin:true,
      },
      '/Upload':{
        target:'http://academy.yonyou.com',
        changeOrigin:true,
      },
      '/test':{
         target:'http://10.10.3.119:6006',
         changeOrigin:true,
      },
      '/PXUserCourse':{
        target:'http://academy.yonyou.com',
        changeOrigin:true,
      },
      '/lexuemgr':{
        target:'http://127.0.0.1:8180',
        changeOrigin:true,
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
