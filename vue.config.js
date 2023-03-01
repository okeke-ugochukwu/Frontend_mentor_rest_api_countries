const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: '/Frontend_mentor_rest_api_countries',

  pages: {
   index: {
      entry: './src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      title: 'rest-api-countries ',
   },

   country: {
      entry: './src/views/country/main.js',
      template: 'public/index.html',
      filename: 'country.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      title: 'rest-api-countries ',
   },
  }
})
