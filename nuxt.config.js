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
  ** Plugins to load before mounting the App. 
  // It replaces the main.js app of normal vue-apps in nuxt
  // It can run any javascript code at application start
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules: 
  ** Docs at https://nuxtjs.org/guide/modules or https://github.com/nuxt-community/awesome-nuxt#modules
  // Registering modules written by third party.
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/nuxt-community/axios-module
    '@nuxtjs/axios'
  ],
  // Made available through modules. No need to import axios anymore
  // Access it with:
  //  For asyncData and nuxtServerInit: - context.app.$axios.$get 
  //  For Store methods:                - this.$axios.$get  
  axios: {
    // Here we can define the global config of axios
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-9be94.firebaseio.com',
    credentials: false
    // proxyHeaders: false
  },

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

  // Additional settings. Not displayed at creation of nux.config.js
    // Set environment variables
  env: {
    // Here we set the baseURL environment variable. If the server it's running on has one in process.env
    // It will take that. If it's not set it will take the hardcode one
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-9be94.firebaseio.com'
  },
  // in router we can override all attributes of the router contructor
  route: {

  },
  // Here we can define general transitions on route change. The css for it is in ~assets/styles/main.css
  // See CSS section above to include it into nuxt
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  }
}
