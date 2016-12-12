// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUi from 'element-ui'

import VueResource from 'vue-resource'
import router from './router'
import store from './store'

Vue.use(VueResource)
Vue.use(ElementUi)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  ...App
})
