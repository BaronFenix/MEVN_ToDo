import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ToDo from '../views/ToDo.vue';
import Uncompleted from '../views/Uncompleted.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('../views/Completed.vue') // второй способ импорта
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo
  },
  {
    path: '/uncompleted',
    name: 'Uncompleted',
    component: Uncompleted
  },
]

const router = new VueRouter({
  routes
})

export default router
