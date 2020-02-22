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
      }
    ],
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/test',
    name:'test',
    component:()=>import("../views/test"),
  },

  // {
  //   path:'/food',
  //   name:'food',
  //   component: food,
  //   meta:{
  //     requireAuth:true
  //   }
  // },
  // {
  //   path:'/tmenu',
  //   name:'tmenu',
  //   component: tmenu,
  //   meta:{
  //     requireAuth:true
  //   }
  // },
  {
    path:'/foodchan',
    name:'foodchan',
    component:()=>import("../views/foodchange"),
    meta:{
      requireAuth:true
    }
  },
  // {
  //   path:'/foodcon',
  //   name:'foodcon',
  //   component:()=>import("../views/foodcontrol"),
  //   meta:{
  //     requireAuth:true
  //   }
  // },
  {
    path:'/login',
    name:'login',
    component:()=>import("../views/user/login")
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
