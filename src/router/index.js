import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
      {
          path: '/',
          name: 'Home',
          component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
          path: '*',
          name: 'Not Found',
          component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
      }
  ]
  
  const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
  })
  
  export default router