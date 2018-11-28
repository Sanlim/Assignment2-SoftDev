import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Funruns from '@/components/Funrun/Funruns'
import Members from '@/components/Funrun/Members'
import CreateFunrun from '@/components/Funrun/CreateFunrun'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Funrun from '@/components/Funrun/Funrun'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/funreads',
      name: 'Funruns',
      component: Funruns
    },
    {
      path: '/funread/new',
      name: 'CreateFunrun',
      component: CreateFunrun,
      beforeEnter: AuthGuard
    },
    {
      path: '/funreads/:id',
      name: 'Funrun',
      props: true,
      component: Funrun
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/member',
      name: 'Member',
      component: Members
    },

  ],

  mode: 'history'
})
