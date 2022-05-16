import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/starships'
  },
  {
    path: '/starships',
    component: () => import('../views/Starships.vue'),
    children: [
      {
        path: '',
        name: 'Starships list',
        component: () => import('../views/starships/Index'),
      },
      {
        path: ':id',
        name: 'Starship detail page',
        component: () => import('../views/starships/Detail'),
      },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
