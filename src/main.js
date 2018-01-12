// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUi from 'element-ui'
import axios from 'axios'
import router from './router'
import store from './store'
import './static/styles/index.scss'
import { httpConfig, response, responseError } from './static/javascripts/interceptor'

Vue.use(ElementUi)
Vue.http = axios
Vue.prototype.$http = axios
Vue.http.interceptors.response.use(response, responseError)
Vue.http.defaults = Object.assign(Vue.http.defaults, httpConfig)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  ...App
})
