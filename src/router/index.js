/**
 * Created by slipkinem on 2016/12/8.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/user/login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'Home',
      redirect: '/home/table',
      children: [
        {
          path: 'table', name: '表格', component: resolve => require(['../components/nav/Table.vue'], resolve)
        },
        {
          path: 'form', name: '表单', component: resolve => require(['../components/nav/Form.vue'], resolve)
        },
        {
          path: 'charts', name: 'Charts', component: resolve => require(['../components/nav/charts.vue'], resolve)
        },
        {
          path: 'article', name: '文章', component: r => require(['../components/nav/Article.vue'], r)
        },
        {
          path: 'post', name: '新增文章', component: r => require(['../components/admin/Post.vue'], r)
        },
        {
          path: 'post-detail', name: '文章详情', component: r => require(['../components/admin/PostDetail.vue'], r)
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        hideNav: true
      }
    },
    {
      path: '/register', name: 'Register', component: resolve => require(['../components/user/register.vue'], resolve)
    },
    {
      path: '*', redirect: '/login'
    }
  ]
})
