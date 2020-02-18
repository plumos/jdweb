import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    auditors:[],
    currencys : [],
    customers:[],
    units:[],
    goods:[],
    fees:[],
    banks:[],
    bankpis:[],
    deplots:[],
    wulius:[],
    group:0,
    condition:[
        {
            text:'New'
        },
        {
            text:'Used'
        }
    ],
    odstates:[
      {
        text:'新建',
        value:0,
      },
      {
        text:'待审核',
        value:1,
      },
      {
        text:'已驳回',
        value:2,
      },
      {
        text:'已通过',
        value:3,
      },
      {
        text:'已完成',
        value:4,
      }
    ],
    pfstates:[
      {
        text:'未完成',
        value:0,
      },
      {
        text:'已完成',
        value:1,
      },
    ],
    purstates:[
      {
        text:'已提交',
        value:1,
      },
      {
        text:'已结束',
        value:2,
      },
    ],
    tuistates:[
      {
        text:'已提交',
        value:1,
      },
      {
        text:'已驳回',
        value:2,
      },
      {
        text:'已通过',
        value:3,
      },
      {
        text:'已结束',
        value:4,
      },
    ],
    bankst:[],

    sales:[],
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      sessionStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      sessionStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  },
  actions: {

  }
})
