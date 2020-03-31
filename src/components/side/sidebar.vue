<template>
  <div class="bartop">
    <div class="bar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{list[index].a}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top">
      <el-dropdown class="bdd" >
            <span class="el-dropdown-link">
                <i class="el-icon-s-custom" style="font-size: 30px;"></i>
            </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="infoset">店铺信息</el-dropdown-item>
          <el-dropdown-item @click.native="pwdchange">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import store from '@/store/store'
  export default {
    name: "sidebar",
    props: ['index'],
    data(){
      return{
        list: [
          //0-10
          {a: '菜单'}
        ]
      }
    },
    methods:{
      infoset(){
        this.$router.push({
          path: '/personal',
          name: 'personal',
        })
      },
      pwdchange(){
        this.$router.push({
          path: '/pwd',
          name: 'pwd',
        })
      },
      logout(){
        //window.sessionStorage.clear()
        store.commit(types.LOGOUT);
        this.$router.push({
          path: '/login',
          name: 'login',
        })
      }
    }
  }
</script>

<style scoped>
@import "../../css/side.css";

</style>
