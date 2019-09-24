import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import feedback from '@/components/feedback'
import fblists from '@/components/fblists'
import panel from '@/components/panel'
import noticelist from '@/components/noticelist'
import notice from '@/components/notice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/fblists',
      name: 'fblists',
      component: fblists
    },
    {
      path: '/panel',
      name: 'panel',
      component: panel
    },
    {
      path: '/noticelist',
      name: 'noticelist',
      component: noticelist
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    }
  ]
})
