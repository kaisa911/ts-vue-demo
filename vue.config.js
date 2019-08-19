const utils = require('./utils/utils');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  pages: utils.getPages(), // 自动生成多页信息
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'table-row-hover-bg': '#ebf0f7',
          'pagination-font-family': 'MicrosoftYaHei',
        },
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: conf => {
    conf.optimization = {
      splitChunks: {
        cacheGroups: {
          common: {
            name: 'chunk~common',
            minChunks: 2,
            minSize: 0,
            chunks: 'all',
          },
        },
      },
    };
  },
  chainWebpack: conf => {
    conf.resolve.alias
      .set('@src', resolve('src'))
      .set('@utils', resolve('utils'))
      .set('@components', resolve('src/common/components'));
  },

  // 用于测试的代理服务
  devServer: {
    proxy: 'https://devcollect.cbim.org.cn', // 测试服务器
  },
};
