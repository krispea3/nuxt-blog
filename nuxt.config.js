import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    // We also can add head-tags in page-components. Just add head: {objectId: value}
    // Add it in script export default
    title: 'Tech-Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    // Here we can add external head links that apply to every html file
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Google fonts Open Sans
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Open+Sans&display=swap"}
    ]
  },

  /*
  ** Customize the progress-bar color
  // We also can adjust the height and the duration. When the page load is faster then the bar will disappear
  */
  loading: { color: '#6b8e23', height: '4px', duration: "5000" },
  // to desable progress-bar just put
  // loading: false

  // loadingIndicator shows a spinner on load. Only works in SPA mode not UNIVERSAL
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '6b8e23'
  // }

  /*
  ** Global CSS
  */
  css: [
    './assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
}
