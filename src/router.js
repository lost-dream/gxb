import Vue from 'vue';
import Router from 'vue-router';
import IndexList from '@/layout/indexList';
import Home from './views/Homepage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: IndexList,
      children: [
        {
          path: '',
          name: 'homepage',
          component: Home
        },
        {
          path: 'loan-market',
          name: 'loanMarket',
          component: () =>
            import(/* webpackChunkName: "LoanMarket" */ '@/views/LoanMarket')
        },
        {
          path: 'find',
          name: 'find',
          component: () => import(/* webpackChunkName: "find" */ '@/views/Find')
        },
        {
          path: 'mine',
          name: 'mine',
          component: () => import(/* webpackChunkName: "mine" */ '@/views/Mine')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login')
    }
  ]
});
