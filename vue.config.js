// var sassResourcesLoader = require('sass-resources-loader');
var path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/': {
        target: 'https://api.pc.dpandora.cn',
        changeOrigin: true,
        wx: true
      }
    }
  },
  chainWebpack: config => {
    // const scssRule = config.module.rule('scss');
    // console.log(scssRule)
    //
    // scssRule
    //   .use('sass-resources-loader')
    //   .loader('sass-resources-loader')

    config.module
      .rule('sass-resources')
      .test(/\.(scss|sass)$/)
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: [
          path.resolve(__dirname, 'src/assets/scss/theme.scss'),
          path.resolve(__dirname, 'src/assets/scss/mixins.scss')
        ]
      })
      .end();
  }
};
