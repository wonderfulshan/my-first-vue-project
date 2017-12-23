// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import mock from './mock/mock'
import Layout from './components/layout'
import IndexPage from './pages/index'
import OrderListPage from './pages/orderList'
import DetailPage from './pages/detail'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailPubPage from './pages/detail/publish'

import store from './store/index'

Vue.config.productionTip = false

Vue.use(VueRouter)
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderList',
      component: OrderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect:'/detail/count',
      children: [
        {
        path: 'analysis',
        component: DetailAnaPage
        },
        {
        path: 'count',
        component: DetailCouPage
        },
        {
        path: 'forecast',
        component: DetailForPage
        },
        {
        path: 'publish',
        component: DetailPubPage
        }
      ]
    }
      ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
