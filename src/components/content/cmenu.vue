<template>
    <div>
<!--        <el-button class="add">添加菜品</el-button>-->
        <el-pagination
                class="pagina" background @size-change="handleSizeChange" @current-change="current_change" :current-page.sync="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="sizes,prev, pager, next" :total="total">
        </el-pagination>
        <el-table
            :data="menus.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :cell-style="{padding:0}"
            border
            :header-cell-class-name="tableHeader"
            :cell-class-name="tablecell"
            height="647"
            style="margin-left:20%;width: 75%;font-size: 18px">
            <el-table-column prop="name" label="菜品" width="250"></el-table-column>
            <el-table-column prop="unitprice" label="单价(元)" width="150"></el-table-column>
            <el-table-column prop="sort" label="分类" width="150"></el-table-column>
            <el-table-column label="图片"  height="60">
                <template slot-scope="scope">
                    　　　　<img :src="scope.row.imgurl" width="100" height="55" @click="openImg(scope.row.imgurl)"/>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotofoodchan(scope.row)">修改</el-button>
                    <el-button type="text" @click="delfood(scope.$index,scope.row.id,scope.row.filereal)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
            <el-card :body-style="{ padding: '0px' }">
                <img :src="dialogImgUrl" width="100%" height="100%">
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    import store from "@/store/store"
    export default {
        name: "cmenu",
        components:[store],
        data(){
            return{
                menus:[],
                imgVisible:false,
                dialogImgUrl:null,
                currentPage:0,
                total: 0,
                pagesize:10,
            }
        },
        methods:{
            gotofoodchan(food){
                this.$router.push({
                    path: '/foodchan',
                    name: 'foodchan',
                    params: {
                        food: food
                    }
                })
            },
            delfood(index,id,filereal){
                this.axios.post('/dc/delfood', {
                    account:window.sessionStorage.getItem("account"),
                    id:id,
                    filereal:filereal,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.menus.splice(index,1)
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            openImg(imgurl){
                this.imgVisible = true;
                this.dialogImgUrl = imgurl;
            },
            tableHeader({row,rowIndex}){
                return "table-head-th";
            },
            tablecell({row,rowIndex}){
                return "table-cell-th";
            },
            current_change: function (currentPage) {
                this.currentPage = currentPage;
            },
            handleSizeChange:function(currentsize){
                this.total = this.menus.length;
                this.pagesize = currentsize;
            },
            getmenu:function(){
                this.axios.post('/dc/getmenu', {
                    account:window.sessionStorage.getItem("account"),
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            if(response.data.data===null){
                                this.menus=[];
                            }else{
                                for(var item of response.data.data){
                                    item.imgurl = store.state.baseurl+item.imgurl
                                    this.menus.push(item)
                                }
                                //this.menus = response.data.data;
                            }
                            this.handleSizeChange(10);
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

        },
        mounted(){
            this.getmenu();
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
