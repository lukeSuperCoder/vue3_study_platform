//配置跨域
module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8888,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'https://imissu.herokuapp.com/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {}
    }
}