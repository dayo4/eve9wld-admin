"use strict"

// import Vue from 'vue'
import axios from 'axios'
import Router from '@/router'

// import { createRouter } from '@/router'
import { $Auth } from '@/store'
import LSAgent from '@/plugins/storage/LSAgent'

const router = Router
const devMode = process.env.NODE_ENV === 'development'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'http://127.0.0.1:3000/'
// axios.defaults.headers.common['Authorization'] = store.getters["auth/authToken"]
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const config = {
  // baseURL: (devMode ? 'https://orb.heroestoggery.com/wp-json/' : process.env.BASE_URL),
  // baseURL: (devMode ? 'http://localhost/wplocal/wp-json/' : process.env.BASE_URL),
  baseURL: (devMode ? 'http://127.0.0.1:3000/' : process.env.BASE_URL) + 'scv-v1/admEP/',
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)
// _axios.defaults.headers.common['Authorization'] = 'Bearer ' + LSAgent.getToken()

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = LSAgent.getToken()
    config.headers.common[ 'Authorization' ] = 'Bearer ' + token

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (devMode)
      console.log(response)

    return response
  },

  /* if error */
  function ({ response }) {
    // Do something with response error
    const error = response ? response.data.message : 'Unable to connect!'
    if (devMode)
      console.log(response)

    if (response)
    {
      if (response.status === 401)
      {
        const redirectUrl = router.currentRoute.value.path
        if (error === 'Re-login!')
        {
          $Auth.$form.logout()
          $Auth.$form.show({ showQuery: true, message: 'Please, Re-login to continue!', redirect: redirectUrl })
        } else
        {
          router.replace({ path: '/401' })
        }
      }
      if (response.status === 404)
      {
        router.push({ name: '404', /* query: { data: error } */ })
      }
    }
    return Promise.reject(error)
  }
)
// Plugin.install = function (Vue, options) {
//   Vue.axios = _axios
//   window.axios = _axios
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios
//       }
//     },
//     $Axios: {
//       get() {
//         return _axios
//       }
//     },
//   })
// }

// Vue.use(Plugin)

export default _axios
