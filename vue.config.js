
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: 'all',
    https: false,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws'
    },
    proxy: {
      '^/api': {
        target: 'http://host.docker.internal:8443',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    }
  }
})