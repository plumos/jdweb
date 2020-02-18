<template>
    <div id="top">
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
</template>

<script>
    export default {
        name: "sidetop",
        data(){
            return{
                name:'张三'
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
        /*        window.sessionStorage.clear()*/
                store.commit(types.LOGOUT)
                this.$router.push({
                    path: '/login',
                    name: 'login',
                })
            }
        },
        mounted:function(){
            // this.name=window.sessionStorage.getItem("name")
        }
    }
</script>

<style scoped>
    @import '../../css/side.css';
</style>
