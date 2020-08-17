import Vue from 'vue'
import VueRouter from 'vue-router'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import Home from '../views/Home.vue'
import Jobs from '../views/Jobs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import VerifyEmail from '../views/VerifyEmail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: VerifyEmail,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser

  console.log(to.path)
  console.log(currentUser !== null, currentUser !== null ? currentUser.emailVerified : false)

  if (currentUser !== null && currentUser.emailVerified) {
    if (to.path === '/login' ||
        to.path === '/register' ||
        to.path === '/verify') {
      console.log('redirect to jobs')
      next('/jobs')
    } else {
      next()
    }
  } else if  (currentUser && !currentUser.emailVerified) {
    if (to.path !== '/verify') {
      next('verify')
    } else {
      next()
    }
  } else if (!currentUser) {
    if (to.path === '/verify' ||
        to.path === '/jobs') {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
