import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  build: {
    extend(config, ctx) {
      if (ctx.isDev)
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      else {
        config.module.rules.push({
          enforce: 'pre',
          exclude: /(node_modules)/,
          loader: 'eslint-loader',
          test: /\.(js|ts|vue)$/
        })
      }
    },
    optimizeCSS: true
  },
  css: ['@/assets/scss/main.scss'],
  env: { title: 'Human Benchmark' },
  head: {
    link: [{ href: 'favicon/favicon.ico', rel: 'icon', type: 'image/x-icon' }],
    meta: [
      { charset: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      {
        content: process.env.npm_package_description || '',
        hid: 'description',
        name: 'description'
      }
    ],
    title: 'Human Benchmark',
    titleTemplate: process.env.title
  },
  loading: { color: colors.shades.black },
  plugins: ['@/plugins/vue-kinesis.client.ts'],
  render: {
    push: true,
    pushAssets: (_req, _res, publicPath, preloadFiles) =>
      preloadFiles
        .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
        .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
  },
  modules: [
    '@nuxtjs/pwa',
    ['@nuxtjs/axios', { baseURL: process.env.BASE_URL }]
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/vuetify',
      {
        customVariables: ['@/assets/scss/variables.scss'],
        theme: {
          themes: {
            light: {
              primary: colors.shades.white,
              secondary: colors.shades.black
            }
          }
        }
      }
    ]
  ]
}
