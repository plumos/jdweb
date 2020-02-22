<template>
    <div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="80%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span >
        <i class="el-icon-notebook-2" @click="showCommit"
           style="font-size:40px;opacity: 50%;margin-right: 750px"></i>
        </span>
        <div  style="display: flex; margin-left: 20%;margin-top: 20px;">

            <el-form  :model="form" class="foodform" label-width="80px" label-position="left">
                    <el-form-item label="菜品" >
                        <el-input v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="单价(元)"  >
                        <el-input-number v-model="form.unitprice"  :controls="false"  style="width:100%;horiz-align:left"></el-input-number>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-select v-model="form.unit" placeholder="请选择" style="width:100%" >
                            <el-option
                                    v-for="item in units"
                                    :key="item.unit"
                                    :label="item.unit"
                                    :value="item.unit">
                            </el-option>
                        </el-select>
                    </el-form-item>
            </el-form>

            <el-upload
                    class="upimg"
                    :class="{hide:hideUpload}"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList"
                    :auto-upload="false"
                    :http-request="myUpload"
                    :on-change="handleChange"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
        <div class="foodbtn">
            <el-button  style="background-color: whitesmoke" @click="fdcommit" :disabled="commiting">提交</el-button>
<!--            <el-button  style="background-color: whitesmoke" @click="commit">提交图片</el-button>-->
        </div>
        <el-dialog :visible.sync="showAllCommit" class="fooddialog" title="已提交菜单">
        <el-table
                :data="menus"
                :cell-style="{padding:0}"
                border
                height="500"
                :header-cell-class-name="tableHeader"
                :cell-class-name="tablecell"
                style="margin-left:5%;width:85%;font-size: 18px;margin-top: 0px">
            <el-table-column prop="name" label="菜品" width="250"></el-table-column>
            <el-table-column prop="unitprice" label="单价(元)" width="150"></el-table-column>
            <el-table-column prop="unit" label="单位" width="150"></el-table-column>
            <el-table-column label="图片"  height="60">
                <template slot-scope="scope">
                    <img :src="scope.row.imgurl" width="100" height="55" @click="openImg(scope.row.imgurl)"/>
                </template>
            </el-table-column>
        </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "cfood",
        data(){
            return{
                form:{},
                units:[{unit:"串"},{unit:"份"},{unit:"个"}],
                dialogVisible:false,
                dialogImageUrl:'',
                hideUpload:false,
                limitCount:1,
                menus:[],
                showAllCommit:false,
                file:null,
                fileList:[],
                commiting:false,
            }
        },
        methods: {
            fdcommit(){
                if(typeof(this.form.name)==="undefined"||this.form.name===""){
                    this.$notify.error({message:"菜品为空"});
                    return
                }
                if(typeof(this.form.unitprice)==="undefined"||this.form.unitprice===0){
                    this.$notify.error({message:"单价为空"});
                    return
                }
                if(typeof(this.form.unit)==="undefined"||this.form.unit===""){
                    this.$notify.error({message:"单位为空"});
                    return
                }
//                console.log(this.form.unit);
                if(this.file===null){
                    this.$notify.error({message:"图片为空"});
                    return;
                }
                let file = this.file;
                let param = new FormData() ; // 创建form对象
                param.append('file', file.raw);  // 通过append向form对象添加数据
                param.append('account', window.sessionStorage.getItem("account"))
                param.append('name', this.form.name);
                param.append('unit', this.form.unit);
                param.append('unitprice', this.form.unitprice);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                // 添加请求头
                this.commiting=true;

                this.axios.post('/dc/addfood', param, config)
                    .then(response => {
                        if (response.status === 200){
                            if (response.data.status === 0){
                                this.$notify({message: '添加成功', type: 'success'});

                                console.log(response.data.imgurl,123);
                                this.menus.push({name:this.form.name,unit:this.form.unit,unitprice:this.form.unitprice,imgurl:response.data.imgurl});
                                this.form={};
                                this.fileList=[];
                                setTimeout(()=>{this.hideUpload=false;}, 500)

                            }else{
                                this.$notify.error({message: response.data.msg});
                            }
                        }
                        this.commiting=false;
                    })
                .catch(error=>{
                    this.$notify.error({message:'添加失败'});
                    this.commiting=false;
                })

            },
            myUpload:function(){
            },
            handleChange(file,fileList){
                this.hideUpload = fileList.length >= this.limitCount;
                this.file = file;
                console.log(1,file)
            },
            handleRemove(file, fileList) {
                setTimeout(()=>{this.hideUpload=false;}, 500)
            //    this.hideUpload = fileList.length >= this.limitCount;
         //       this.$refs.upload.clearFiles();
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit:function(){

            },
            tableHeader({row,rowIndex}){
                return "table-head-th";
            },
            tablecell({row,rowIndex}){
                return "table-cell-th";
            },
            showCommit(){
                this.showAllCommit = true;
            },
        },
    }
</script>

<style lang="scss">
    .hide .el-upload--picture-card {
        display: none;
    }
    .el-table .table-head-th{
        /*background-color: floralwhite;*/
        padding: 0;

    }
    .el-table .table-cell-th{
        /*background-color: whitesmoke;*/
        padding: 0;
    }
    .el-input-number .el-input__inner{
        text-align: left;
    }
</style>

<style scoped>
    @import "../../css/newview.css";
</style>
