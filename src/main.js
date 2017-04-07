// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUi from 'element-ui'

import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import './static/styles/index.scss'
import interceptor from './static/javascripts/interceptor'

Vue.use(VueResource)
Vue.use(ElementUi)

Vue.http.interceptors.push(interceptor)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  ...App
})
