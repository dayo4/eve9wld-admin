// const path = require('path')
// var PrerenderSPAPlugin = require('prerender-spa-plugin')
// const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/globalStyles/devOnly/_variables.scss";
                @import "@/globalStyles/devOnly/_mixins.scss";
                `,
                // sassOptions: {
                //     indentedSyntax: true
                // }
            }
        }
    },
}

