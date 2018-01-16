/**
 * Created by slipkinem on 2016/12/8.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/Home.vue'
import Login from '../view/user/login.vue'

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
          path: 'table', name: '表格', component: resolve => require(['../view/nav/Table.vue'], resolve)
        },
        {
          path: 'form', name: '表单', component: resolve => require(['../view/nav/Form.vue'], resolve)
        },
        {
          path: 'charts', name: 'Charts', component: resolve => require(['../view/nav/charts.vue'], resolve)
        },
        {
          path: 'article', name: '文章', component: r => require(['../view/nav/Article.vue'], r)
        },
        {
          path: 'article/add', name: '新增文章', component: r => require(['../view/admin/Post.vue'], r)
        },
        {
          path: 'article/:postId', name: '文章详情', component: r => require(['../view/admin/PostDetail.vue'], r)
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
      path: '/register', name: 'Register', component: resolve => require(['../view/user/register.vue'], resolve)
    },
    {
      path: '*', redirect: '/login'
    }
  ]
})
