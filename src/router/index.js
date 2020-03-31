import Vue from 'vue'
import VueRouter from 'vue-router'
import tmenu from '../views/tmenu'
import food from '../views/food'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'side',
    component:()=>import("../components/side/side"),
    children:[{
      path:'/food',
      name:'food',
      component: food,
    },
      {
        path:'/tmenu',
        name:'tmenu',
        component: tmenu,
      },
      {
        path:'/foodcon',
        name:'foodcon',
        component:()=>import("../views/foodcontrol"),
      },
      {
        path:'/createuser',
        name:'createuser',
        component:()=>import("../views/user/createuser"),
      },{
        path:'/order',
        name:'order',
        component:()=>import("../views/order")
      },{
        path:'/census',
        name:'census',
        component:()=>import("../views/census")
      },
      {
        path:'/foodchan',
        name:'foodchan',
        component:()=>import("../views/foodchange"),
      },
    ],
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/personal',
    name:'personal',
    component:()=>import("../views/personal"),
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/login',
    name:'login',
    component:()=>import("../views/user/login")
  },
  {
    path:'/register',
    name:'register',
    component:()=>import("../views/user/register")
  },
  {
    path:'/shop',
    name:'shop',
    component:()=>import("../views/user/shop")
  },
  {
    path:'/wait',
    name:'wait',
    component:()=>import("../views/user/wait")
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
