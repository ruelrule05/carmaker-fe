import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import CarsView from '../views/CarsView.vue'
import LoginView from '../views/LoginView.vue'
import ColorsView from '../views/Colors.vue'
import TypesView from '../views/Types.vue'
import ManufacturersView from '../views/Manufacturers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cars',
    component: CarsView,
    meta: {
      auth: true
    }
  },
  {
    path: '/colors',
    name: 'colors',
    component: ColorsView,
    meta: {
      auth: true
    }
  },
  {
    path: '/types',
    name: 'types',
    component: TypesView,
    meta: {
      auth: true
    }
  },
  {
    path: '/manufacturers',
    name: 'manufacturers',
    component: ManufacturersView,
    meta: {
      auth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router
