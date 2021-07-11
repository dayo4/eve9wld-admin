// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin-next')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer


module.exports = {
    productionSourceMap: false,

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/globalStyles/devOnly/_variables.scss";
                @import "@/globalStyles/devOnly/_mixins.scss";
                `,
            }
        }
    },

    configureWebpack:/*  config => */ {
      // resolve: {
      //   modules = [ path.resolve(__dirname, '../'), 'node_modules' ]
      // }
      // config.resolve.modules.set(path.resolve(__dirname, '../node_modules'))
        // if (process.env.NODE_ENV === 'production') {
        //   // mutate config for production...
        //   // config.plugins.push(plugins)
        // } else {
        //   // mutate for development...
        // }
      }

}
