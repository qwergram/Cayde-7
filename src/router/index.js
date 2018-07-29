import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/admin/AppLayout'
import AuthLayout from '../components/auth/AuthLayout'
import lazyLoading from './lazyLoading'
import store from '../store/index'

Vue.use(Router)

// const EmptyParentComponent = {
//   template: '<router-view></router-view>'
// }

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: lazyLoading('auth/login/Login'),
          meta: { authPage: true }
        },
        {
          name: 'signup',
          path: 'signup',
          component: lazyLoading('auth/signup/Signup'),
          meta: { authPage: true }
        },
        {
          path: '',
          redirect: {name: 'login'}
        }
      ]
    },
    {
      name: 'Admin',
      path: '/dash',
      component: AppLayout,
      meta: { auth: true },
      children: [
        {
          name: 'dashboard',
          path: '',
          component: lazyLoading('dashboard/Dashboard'),
          default: true,
          meta: { auth: true }
        }
      ],
    },
    {
      path: '/dev',
      name: 'dev',
      beforeEnter (to, from, next) {
        window.location = 'https://pengrabot.ddns.net/dev/'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('verifyToken')
  const authRequired = to.matched.some((route) => route.meta.auth)
  const authPage = to.matched.some((route) => route.meta.authPage)
  const authed = store.state.loggedIn && store.state.jwt
  if (authRequired && !authed) {
    next('/auth/login')
  } else if (authPage && authed) {
    next('/dash')
  } else {
    next()
  }
})

export default router
