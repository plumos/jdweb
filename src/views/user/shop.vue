<template>
    <div >
        <i style="color:blue">尚未创建店铺,请先创建</i>
        <div class="shop">
        <el-form ref="form" :model="shop" label-width="80px">
            <el-form-item label="店名">
                <el-input v-model="shop.name" ></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="shop.address"  ></el-input>
            </el-form-item>
            <el-form-item label="起送价格">
                <el-input-number v-model="shop.sendprice"  :controls="false" style="width:100%;horiz-align:left"></el-input-number>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="shop.phone" ></el-input>
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
        <el-button style="margin-left:60px" type="primary" plain @click="commit" :disabled="commiting">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "shop",
        data(){
            return{
                shop:{
                    name:"",
                    address:"",
                    sendprice:"",
                    phone:"",
                },
                file:null,
                fileList:[],
                hideUpload:false,
                limitCount:1,
                commiting:false,
            }
        },
        methods:{
            commit(){
                if(typeof(this.shop.name)==="undefined"||this.shop.name===""){
                    this.$notify.error({message:"店名为空"});
                    return
                }
                if(typeof(this.shop.address)==="undefined"||this.shop.address===0){
                    this.$notify.error({message:"地址为空"});
                    return
                }
                if(typeof(this.shop.phone)==="undefined"||this.shop.phone===0){
                    this.$notify.error({message:"电话为空"});
                    return
                }
                if(this.file===null){
                    this.$notify.error({message:"图片为空"});
                    return;
                }
                if(this.file.size/1024>100){
                    this.$notify.error({message:'上传文件不能大于100KB'});
                    return
                }
                let file = this.file;
                let param = new FormData() ; // 创建form对象
                param.append('file', file.raw);  // 通过append向form对象添加数据
                param.append('account', window.sessionStorage.getItem("account"))
                param.append('name', this.shop.name);
                param.append('address', this.shop.address);
                param.append('phone', this.shop.phone);
                param.append('sendprice', this.shop.sendprice);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                // 添加请求头
                this.commiting=true;

                this.axios.post('/dc/addshop', param, config)
                    .then(response => {
                        if (response.status === 200){
                            if (response.data.status === 0){
                                this.$notify({message: '添加成功', type: 'success'});
                                this.shop={};
                                this.fileList=[];
                                setTimeout(()=>{this.hideUpload=false;}, 500);
                                this.$router.push({
                                    path: '/wait',
                                    params: {
                                        msgshow: 0,
                                    }
                                });

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
            },
            handleRemove(file, fileList) {
                setTimeout(()=>{this.hideUpload=false;}, 500)
            },
        }
    }
</script>

<style scoped>
    @import '../../css/newview.css';
</style>