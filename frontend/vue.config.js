const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Настройки dev сервера
  devServer: {
    port: 8085, // Порт frontend приложения
    open: false, // Автоматически открывать браузер
    hot: true, // Горячая перезагрузка

    // Проксирование API запросов
    proxy: {
      '/api': {
        target: 'http://localhost:8084', // Backend на порту 8084
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '/api' // Можно изменить если нужно
        }
      },
      // '/': {
      //   target: 'http://localhost:8084', // Для корневых запросов
      //   changeOrigin: true,
      //   secure: false,
      //   logLevel: 'debug'
      // }
    }
  },

  // Настройки production сборки
  configureWebpack: {
    // Базовые настройки webpack
  },

  // Настройки для разработки
  lintOnSave: process.env.NODE_ENV !== 'production'
})
