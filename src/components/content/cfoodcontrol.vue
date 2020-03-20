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
                    <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">{{checkstate(scope.row.state)}}</template>
                    </el-table-column>
                    <el-table-column  label="余量" width="150">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.number" :controls="false" class="tbinput"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜品管理">
                        <template slot-scope="scope">
                            <el-button type="text" :disabled="scope.row.state.hidden||scope.row.state.soldout" @click="stateset(scope.$index,1,scope.row.id,scope.row.number)">限量</el-button>
                            <el-button type="text" :disabled="scope.row.state.hidden||scope.row.state.soldout" @click="stateset(scope.$index,2,scope.row.id)">售罄</el-button>
                            <el-button type="text" :disabled="scope.row.state.hidden" @click="stateset(scope.$index,3,scope.row.id)">隐藏</el-button>
                            <el-button type="text" @click="stateset(scope.$index,4,scope.row.id)">恢复</el-button>
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
                        <el-radio-group v-model="radio" size="small" style="" @change="rdchange">
                            <el-radio-button :label="item.word" :key="item.word" v-for="item in keywords"></el-radio-button>
                        </el-radio-group>

                    <el-table
                        :data="searchmenus"
                        :cell-style="{padding:0.5}"
                        border
                        :header-cell-class-name="tableHeader"
                        ref="mutipleTable"
                        height="550"
                        style="width: 100%;font-size: 18px;margin-top:10px">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="菜品" ></el-table-column>
                        <el-table-column prop="state" label="状态" >
                            <template slot-scope="scope">{{checkstate(scope.row.state)}}</template>
                        </el-table-column>
                    </el-table>
                    </div>
                    <div style="margin-top: 30px;padding-left: 10px">
                        <el-row style="margin-top: 15px" >
                            <el-input size="small" style="width: 50%" v-model="sword"></el-input>
                            <el-button size="small" style="margin-left: 10px;" @click="search" type="text">搜索</el-button>
                        </el-row>

                            <el-button @click="mutilstateset(2)" style="margin-left: 10px;margin-top:30px">售罄</el-button>
                            <el-button @click="mutilstateset(3)" >隐藏</el-button>
                            <el-button @click="mutilstateset(4)" >恢复</el-button>
<!--                        </el-card>-->
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关键词设置" name="third">
                <el-row style="margin-top: 10px;width:50%" >
                    <el-input size="small" style="width: 50%" v-model="newword"></el-input>
                    <el-button size="small" style="margin-left: 10px;margin-bottom: 10px" @click="addkword" type="text">添加</el-button>
                </el-row>
                <el-table
                    :data="keywords"
                    :cell-style="{padding:0}"
                    border
                    style="width: 70%">
                    <el-table-column label="关键词" prop="word"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="delkword(scope.$index,scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="分类设置" name="forth">
                <el-row style="margin-top: 10px;width:50%" >
                    <el-input size="small" style="width: 50%" v-model="sort"></el-input>
                    <el-button size="small" style="margin-left: 10px;margin-bottom: 10px" @click="addsort" type="text">添加</el-button>
                </el-row>
                <el-table
                        :data="sorts"
                        :cell-style="{padding:0}"
                        border
                        style="width: 70%">
                    <el-table-column label="分类" prop="sort"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="delsort(scope.$index,scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                menus:[],
                searchmenus:[],
                imgVisible:false,
                dialogImgUrl:null,
                currentPage:0,
                total: 0,
                pagesize:10,
                activeName:'first',
                radio:"",
                number:0,
                form:{},
                showqita:false,
                keywords:[],
                sword:'',
                keyword:'',
                states:[],
                newword:'',
                sorts:[],
                sort:'',
            }
        },
        methods:{
            keyset(){

            },
            rdchange(item){
                var tmpmenu = [];
                for(var i=0;i<this.menus.length;i++){
                    if(this.menus[i].name.indexOf(item)!==-1){
                        var tmenu = this.menus[i];
                        tmenu.index=i;
                        tmpmenu.push(tmenu);
                    }
                }
                this.searchmenus=tmpmenu;
                this.keyword=item;

                this.$nextTick(() => {
                    for (let i = 0; i < this.searchmenus.length; i++) {
                        this.$refs.mutipleTable.toggleRowSelection(this.searchmenus[i])
                    }
                })
            },
            search(){
              this.rdchange(this.sword);
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
                console.log(1)
            },
            handleSizeChange:function(currentsize){
                this.total = this.menus.length;
                this.pagesize = currentsize;
            },
            delkword(index,id){
                this.axios.post('/dc/delkword', {
                    account:window.sessionStorage.getItem("account"),
                    id:id,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.$notify({message:"删除成功",type:"success"})
                            this.keywords.splice(index,1)
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            delsort(index,id){
                this.axios.post('/dc/delsort', {
                    account:window.sessionStorage.getItem("account"),
                    id:id,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.$notify({message:"删除成功",type:"success"});
                            this.sorts.splice(index,1);
                            window.sessionStorage.setItem("sorts",JSON.stringify(response.data.sorts))
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            addkword(){
                if (this.newword===''){
                    this.$notify.error({message:"关键词为空"});
                    return
                }
                for(var item of this.keywords){
                    if (item.word===this.newword){
                        this.$notify.error({message:this.newword+"已存在"});
                        return;
                    }
                }
                this.axios.post('/dc/addkword', {
                    account:window.sessionStorage.getItem("account"),
                    word:this.newword,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.$notify({message:"添加成功",type:"success"})
                            // this.getkeyword()
                            this.keywords.push(response.data.keyword);
                            console.log(this.keywords)
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            addsort(){
                if (this.sort===''){
                    this.$notify.error({message:"分类为空"});
                    return
                }
                for(var item of this.sorts){
                    if (item.sort===this.sort){
                        this.$notify.error({message:this.sort+"已存在"});
                        return;
                    }
                }
                this.axios.post('/dc/addsort', {
                    account:window.sessionStorage.getItem("account"),
                    sort:this.sort,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.$notify({message:"添加成功",type:"success"});
                            this.sorts.push(response.data.sort);
                            window.sessionStorage.setItem("sorts",JSON.stringify(this.sorts))
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
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
                                this.menus = response.data.data;
                                this.rdchange(this.radio);
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
            getkeyword:function(){
                this.axios.post('/dc/getkword', {
                    account:window.sessionStorage.getItem("account"),
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            if(response.data.keywords===null){
                                this.keywords=[];
                            }else{
                                this.keywords = response.data.keywords;
                                this.radio=this.keywords[0].word;
                            }
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            fdgetsort:function(){
                this.axios.post('/dc/getsort', {
                    account:window.sessionStorage.getItem("account"),
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            if(response.data.sorts===null){
                                this.sorts=[];
                            }else{
                                this.sorts = response.data.sorts;
                            }
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

            stateset:function(index,tag,id,no) {
                if(tag===1&& typeof(no) === "undefined"){
                    this.$notify.error({message:"余量为空"})
                    return
                }
                this.axios.post('/dc/setstate',{
                    account:window.sessionStorage.getItem("account"),
                    tag:tag,
                    id:id,
                    no:no,
                }).then(response=>{
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.$notify({message:"设置成功",type:"success"});
                            var menus=this.menus;
                            switch (tag) {
                                case 1:
                                    menus[index].state.remain=no;
                                    delete(menus[index].number);
                                    break;
                                case 2:
                                    menus[index].state.remain=0;
                                    menus[index].state.soldout=true;
                                    break;
                                case 3:
                                    menus[index].state.remain=0;
                                    menus[index].state.hidden=true;
                                    break;
                                case 4:
                                    menus[index].state.remain=0;
                                    menus[index].state.hidden=false;
                                    menus[index].state.soldout=false;
                                    break
                            }
                            this.menus=menus;
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                })
            },
            mutilstateset:function(tag){
                const _selectData = this.$refs.mutipleTable.selection;
                console.log("sel:",_selectData);
                var ids = [];
                var indexs=[];
                for(var i=0;i<_selectData.length;i++){
                    var id=_selectData[i].id;
                    ids.push(id);
                    indexs.push(_selectData[i].index);
                }
                this.axios.post('/dc/changemutilstate',{
                    account:window.sessionStorage.getItem("account"),
                    tag:tag,
                    ids:ids,
                }).then(response=> {
                    if (response.status === 200) {
                        if (response.data.status === 0) {
                            this.$notify({message: "设置成功", type: "success"});
                            var menus=this.menus;
                            for(var index of indexs){
                                switch (tag) {
                                    case 1:
                                        menus[index].state.remain=no;
                                        delete(menus[index].number);
                                        break;
                                    case 2:
                                        menus[index].state.remain=0;
                                        menus[index].state.soldout=true;
                                        break;
                                    case 3:
                                        menus[index].state.remain=0;
                                        menus[index].state.hidden=true;
                                        break;
                                    case 4:
                                        menus[index].state.remain=0;
                                        menus[index].state.hidden=false;
                                        menus[index].state.soldout=false;
                                        break
                                }
                            }
                            this.menus=menus;
                            this.rdchange(this.keyword);
                        }
                    }
                })
            }
        },
        mounted(){
            this.getmenu();
            this.getkeyword();

            this.sorts = JSON.parse(window.sessionStorage.getItem("sorts"));


            this.handleSizeChange(10);
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
