<template>
    <div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="80%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span >
            <el-button type="text" style="color:black" >{{orginfos}}</el-button>
        </span>
        <div  style="display: flex; margin-left: 20%;margin-top: 20px;">
            <el-form  :model="form" class="foodform" label-width="80px" label-position="left">
                <el-form-item label="菜品" >
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="单价(元)">
                    <el-input-number v-model="form.unitprice"  :controls="false"  style="width:100%;horiz-align:left"></el-input-number>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="form.sort" placeholder="请选择" style="width:100%" >
                        <el-option
                                v-for="item in sorts"
                                :key="item.sort"
                                :label="item.sort"
                                :value="item.sort">
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
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过100kb</div>
            </el-upload>
        </div>
        <div class="foodbtn">
            <el-button  style="background-color: whitesmoke" @click="fdback" >返回</el-button>
            <el-button  style="background-color: whitesmoke" @click="fdcommit" :disabled="commiting">提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cfoodchange",
        data(){
            return{
                orginfos:'',
                food:{},
                form:{},
                sorts:[],
                dialogVisible:false,
                dialogImageUrl:'',
                hideUpload:false,
                limitCount:1,
                menus:[],
                showAllCommit:false,
                file:null,
                fileList:[],
                commiting:false,
                changeflag:false
            }
        },
        methods: {
            fdback(){
                this.$router.push({
                    path: '/tmenu',
                    name: 'tmenu',
                })
            },
            fdcommit(){
                if(typeof(this.form.name)==="undefined"||this.form.name===""){
                    this.$notify.error({message:"菜品为空"});
                    return
                }
                if(typeof(this.form.unitprice)==="undefined"||this.form.unitprice===0){
                    this.$notify.error({message:"单价为空"});
                    return
                }
                if(typeof(this.form.sort)==="undefined"||this.form.sort===""){
                    this.$notify.error({message:"单位为空"});
                    return
                }
//                console.log(this.form.sort);
                if(this.file===null &&this.changeflag===true){
                    this.$notify.error({message:"图片为空"});
                    return;
                }
                let file = this.file;
                let param = new FormData() ; // 创建form对象
                if(this.changeflag===true) {
                    if(this.file.size/1024>100){
                        this.$notify.error({message:'上传文件不能大于100KB'});
                        return
                    }
                    param.append('file', file.raw);  // 通过append向form对象添加数据
                }
                param.append('account', window.sessionStorage.getItem("account"))
                param.append('name', this.form.name);
                param.append('sort', this.form.sort);
                param.append('unitprice', this.form.unitprice);
                param.append("flag",this.changeflag);
                param.append("filereal",this.form.filereal);
                param.append("id",this.form.id);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                // 添加请求头
                this.commiting=true;

                this.axios.post('/dc/changefood', param, config)
                    .then(response => {
                        if (response.status === 200){
                            if (response.data.status === 0){
                                this.$notify({message: '修改成功', type: 'success'});
                                this.getfdname(); //刷新fdname
                                this.$router.push({
                                    path: '/tmenu',
                                    name: 'tmenu',
                                })
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
                setTimeout(()=>{this.hideUpload=false;}, 500);
                this.changeflag=true;
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
        mounted:function () {


            if (this.$route.params.food) {
                this.form = this.$route.params.food;

                this.orginfos = "原信息:"+this.form.name + "  " + this.form.unitprice + "元 " + this.form.sort;

                this.fileList.push({url:this.form.imgurl});
                if(this.form.imgurl!==null){
                    this.hideUpload=true;
                }
                this.sorts=JSON.parse(window.sessionStorage.getItem("sorts"));
            }else{
                this.$router.push({
                    path: '/tmenu',
                    name: 'tmenu',
                })
            }
        }
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
