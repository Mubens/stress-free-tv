module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '悠哉悠哉在线动漫网（*＾ワ＾*）'
      return args
    })
  }
}
