<template>
  <div class="bartop">
    <div class="bar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{list[index].a}}</el-breadcrumb-item>
  <!--      <el-breadcrumb-item>{{list[index].b}}</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>
    <div class="top">
      <el-dropdown class="bdd" >
            <span class="el-dropdown-link">
                <i class="el-icon-s-custom" style="font-size: 30px;"></i>
            </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="infoset">个人设置</el-dropdown-item>
          <el-dropdown-item @click.native="pwdchange">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>
@import "../../css/side.css";

</style>
