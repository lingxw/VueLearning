const path = require('path')
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.exclude.add(path.resolve(__dirname, './src/icons')).end()
    const iconsRule = config.module.rule('icons')
    iconsRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule
        .test(/\.svg$/)
        .exclude.add(path.resolve(__dirname, './src/icons'))
        .end()
        .use('file-loader')
        .loader('file-loader')
    config.module
      .rule('jcl')
      .test(/\.jcl$/)
      .use('html-loader')
      .loader('html-loader')
      .options({
        minimize: false
      })
      .end()

    const csonRule = config.module.rule('cson')
    csonRule
      .test(/\.cson$/)
      .use('cson-loader')
      .loader('cson-loader')
      .end()
  }
}