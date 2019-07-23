module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.douban.com/v2',
        // changeOrigin: true,
        // ws: true,
        pathRewrite: {
          //一定要加上这个！！！！不然不能跨域，亲身体验！
          '^/api': '',
        },
      },
    },
  },
};
