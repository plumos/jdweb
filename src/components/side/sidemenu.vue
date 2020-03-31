<template>
    <div >
        <el-menu
                active-text-color="#6D2840"
                :router="true"
                :default-active="$route.name">
            <el-submenu index="side" >
                <template slot="title">
                    <i class="el-icon-notebook-1"></i>
                    <span>菜品</span>
                </template>
                <el-menu-item index="tmenu">
                    <i class="el-icon-reading"></i>
                    <span>菜单</span>
                </el-menu-item>
                <el-menu-item index="food">
                    <i class="el-icon-food"></i>
                    <span>新增</span>
                </el-menu-item>
                <el-menu-item index="foodcon">
                    <i class="el-icon-refrigerator"></i>
                    <span>管理</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="order">
                <i class="el-icon-s-order"></i>
                <span slot="title">订单</span>
            </el-menu-item>
            <el-menu-item index="census">
                <i class="el-icon-coin"></i>
                <span slot="title">统计</span>
            </el-menu-item>
        </el-menu>

    </div>
</template>

<script>
    export default {
        name: "sidemenu",
        components: {},
        data(){
            return{
                group:0,
                seen:[false,false,false,false,false],
                isWuliu:false
            }
        },
        methods: {
        },
        mounted:function () {
        }
    }
</script>
<style lang="scss">
        .el-menu{
            /*background-image: linear-gradient(to right, #B6CBCE , #7AAEBE);*/
            background-color: #fcfcfc;
            border-right: 0;
        }

        .el-submenu__title{
            /*background-image: linear-gradient(to right, #B6CBCE , #7AAEBE);*/
            background-color: #fcfcfc;
            font-size: 25px;
            margin-left: 15%;
        }

        .el-submenu .el-menu-item{
            font-size: 15px;
            margin-left: 15%;
        }

        .el-menu-item{
            font-size: 25px;
            margin-left: 15%;
        }
        .el-menu-item.is-active{
            background-color: transparent;
        }
        .el-menu-item:hover{
            background-color: transparent;
            color:#6D2840
        }

</style>

<style scoped>
</style>

