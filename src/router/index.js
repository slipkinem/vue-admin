/**
 * Created by slipkinem on 2016/12/8.
 */
'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Table from '../components/nav1/Table.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      name: '组件',
      children: [
        {
          path: '', name: 'Table', component: Table
        },
        {
          path: 'table', name: 'Table', component: Table
        },
        {
          path: 'form', name: 'Form', component: resolve => require(['../components/nav1/Form.vue'], resolve)
        }
      ]
    },
    {
      path: '*', redirect: '/home/table'
    }
  ]
})
