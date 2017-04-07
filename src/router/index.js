/**
 * Created by slipkinem on 2016/12/8.
 */
'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Table from '../components/nav1/Table.vue'
import Login from '../components/user/login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'Home',
      redirect: '/home/table',
      children: [
        {
          path: 'table', name: 'Table', component: Table
        },
        {
          path: 'form', name: 'Form', component: resolve => require(['../components/nav1/Form.vue'], resolve)
        }
      ]
    },
    {
      path: '/login', name: 'Login', component: Login
    },
    {
      path: '/register', name: 'Register', component: resolve => require(['../components/user/register.vue'], resolve)
    },
    {
      path: '*', redirect: '/login'
    }
  ]
})
