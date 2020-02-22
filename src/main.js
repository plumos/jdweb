import Vue from 'vue'
import App from './App.vue'
import router from './router'
import base from './base'
import axios from 'axios';
import store from './store/store'
import * as types from './store/types'

import VueAxios from 'vue-axios'

Vue.use(base)
Vue.use(VueAxios,axios);

import {Button, Dropdown, Menu,Breadcrumb,Tag,Icon,Submenu,Row,Col,MenuItem,MenuItemGroup,BreadcrumbItem,DropdownMenu,
  DropdownItem,Table,TableColumn,Card,Dialog,Pagination,Input,InputNumber,Form,FormItem,Select,Option,Upload,
  Tabs,TabPane,RadioGroup,RadioButton,Notification,Message} from 'element-ui';
//Vue.prototype.$notify = Notification;
const notify = Notification;
Vue.prototype.$notify = notify;

Vue.prototype.$message = Message;
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Tag);
Vue.use(Dropdown);
Vue.use(Submenu);
Vue.use(Row);
Vue.use(Col);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(BreadcrumbItem);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);


Vue.config.productionTip = false;


axios.interceptors.request.use(
    config => {
      if (config.method === 'post') {
        config.headers['token'] = store.state.token;
      }
      return config
    },
    error => {
      console.log(error) ;// for debug
      Promise.reject(error)
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回 401 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT);
            notify({
              message: '超时退出',
              type: 'error'
            });
            router.replace({
              path: '/login',
              query: {redirect:  router.currentRoute.fullPath}
            })
        }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('token')) {
    store.commit(types.LOGIN, window.sessionStorage.getItem('token'))
  }

  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
