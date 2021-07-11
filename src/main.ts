import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* import some global assets */
import './globalStyles/deploy'
import './plugins/vue_plugins/global-components'
import './plugins/vue_plugins/global-variables'

/* import modules */

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
