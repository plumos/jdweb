<template>
    <div>
        <!--        <el-button class="add">添加菜品</el-button>-->
        <el-tabs v-model="activeName" style="margin-left: 20%;width: 70%">
            <el-tab-pane label="单品管理" name="first">
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
                        height="550"
                        style="width: 100%;font-size: 18px">
                    <el-table-column prop="name" label="菜品" width="250"></el-table-column>
                    <el-table-column prop="state" label="状态" ></el-table-column>
                    <el-table-column  label="余量" width="150">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.number" class="tbinput"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜品管理">
                        <template>
                            <el-button type="text">余量</el-button>
                            <el-button type="text">售罄</el-button>
                            <el-button type="text">隐藏</el-button>
                            <el-button type="text">恢复</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="关联管理" name="second">
<!--                <el-pagination-->
<!--                        class="pagina" background @size-change="handleSizeChange" @current-change="current_change" :current-page.sync="currentPage"-->
<!--                        :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="sizes,prev, pager, next" :total="total">-->
<!--                </el-pagination>-->
                <div style="display: flex">
                    <div style="width:70%">

                        <el-radio-group v-model="radio" size="small" style="" >
                            <el-radio-button label="上海"></el-radio-button>
                            <el-radio-button label="北京"></el-radio-button>
                            <el-radio-button label="广州"></el-radio-button>
                            <el-radio-button label="深圳"></el-radio-button>
                            <el-radio-button label="其他"></el-radio-button>
                        </el-radio-group>
                        <el-row style="margin-top:10px" v-if="showqita">
                            <el-input size="small" style="width: 30%"></el-input>
                            <el-button size="small" style="margin-left: 10px">搜索</el-button>
                        </el-row>

                    <el-table
                        :data="menus.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        :cell-style="{padding:0.5}"
                        border
                        :header-cell-class-name="tableHeader"

                        height="550"
                        style="width: 100%;font-size: 18px;margin-top:10px">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="菜品" ></el-table-column>
                        <el-table-column prop="state" label="状态" ></el-table-column>
                        <el-table-column prop="number" label="余量" ></el-table-column>
                    </el-table>
                    </div>
                    <div style="margin-top: 30px;padding-left: 10px">

<!--                            <el-form ref="form" :model="form" label-width="80px">-->
<!--                                <el-form-item label="余量">-->
<!--                                    <el-input type="number" v-model="number"  style="width: 50%"></el-input>-->
<!--                                    <el-button style="margin-left:10%" >设定</el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->

<!--                        <el-card style="margin-left: 10px">-->
                            <el-button  style="margin-left: 10px;margin-top:20px">售罄</el-button>
                            <el-button >隐藏</el-button>
                            <el-button >恢复</el-button>
<!--                        </el-card>-->
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
            <el-card :body-style="{ padding: '0px' }">
                <img :src="dialogImgUrl" width="100%" height="100%">
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "cfoodcontrol",
        data(){
            return{
                menus:[{name:"鱼香肉丝",unitprice:"15.0",state:"停用",number:0,unit:"份",
                    imgurl:"https://www.baidu.com/img/pcpad_3d7575f432a74060c1a5a0bfb71c8a2e.png"},
                ],
                imgVisible:false,
                dialogImgUrl:null,
                currentPage:0,
                total: 0,
                pagesize:10,
                activeName:'first',
                radio:"深圳",
                number:0,
                form:{},
                showqita:false,
            }
        },
        methods:{
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
                console.log(1)
            },
            handleSizeChange:function(currentsize){
                this.total = this.menus.length;
                this.pagesize = currentsize;
                console.log(2)
            },
        },
        mounted(){
            this.handleSizeChange(10)
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
    .tbinput .el-input__inner{
        border:none;
    }

</style>
<style scoped>
@import "../../css/newview.css";
</style>
