<template>
    <div>
        <el-table
                :data="orders.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :cell-style="{padding:0}"
                border
                :header-cell-class-name="tableHeader"
                :cell-class-name="tablecell"
                height="647"
                style="margin-left:20%;width: 75%;font-size: 18px">
            <el-table-column prop="id" label="订单编号" width="250"></el-table-column>
            <el-table-column prop="createtime" label="下单时间" width="150"></el-table-column>
            <el-table-column prop="table" label="桌号" width="150"></el-table-column>
            <el-table-column prop="table" label="总价(元)" width="150"></el-table-column>
            <el-table-column label="订单详情">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.fdinfo[0].name" :disabled="true"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="table" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="tuicai(scope.row)">退菜</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "corder",
        data(){
            return{
                orders:[],
            }
        },
        methods:{
            tableHeader({row,rowIndex}){
                return "table-head-th";
            },
            tablecell({row,rowIndex}){
                return "table-cell-th";
            },
            tuicai(item){

            }
        }
    }
</script>
<style lang="scss">
    .el-table .table-head-th{
        /*background-color: floralwhite;*/
        padding: 0;

    }
    .el-table .table-cell-th{
        /*background-color: whitesmoke;*/
        padding: 0;
    }
</style>
<style scoped>

</style>
