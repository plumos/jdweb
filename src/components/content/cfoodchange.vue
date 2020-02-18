<template>
    <div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="80%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <div style="display: flex; margin-left: 120px;margin-top: 20px;">
            <el-form  :model="formInline" class="foodform" label-width="80px" label-position="left">
                <el-form-item label="菜品" >
                    <el-input v-model="formInline.name" ></el-input>
                </el-form-item>
                <el-form-item label="单价(元)"  >
                    <el-input v-model="formInline.unitprice" type="number" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-select v-model="formInline.unit" placeholder="请选择" style="width:100%" >
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
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :show-file-list="true"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
        <div class="foodbtn">
            <el-button  style="background-color: whitesmoke" @click="onSubmit">返回</el-button>
            <el-button  style="background-color: whitesmoke" @click="onSubmit">提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cfoodchange",
        data(){
            return{
                formInline:{},
                units:[{unit:"串"},{unit:"份"},{unit:"个"}],
                dialogVisible:false,
                dialogImageUrl:'',
                hideUpload:false,
                limitCount:1,
                menus:[{name:"白菜炒萝卜",unitprice:12.3,unit:"串"}],
                showAllCommit:false,
            }
        },
        methods:{
            handleChange(file,fileList){
                this.hideUpload = fileList.length >= this.limitCount;
                console.log(1,fileList)
            },
            handleRemove(file, fileList) {
                this.hideUpload = fileList.length >= this.limitCount;

                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit:function(){

            },
        }
    }
</script>
<style>
    .hide .el-upload--picture-card {
        display: none;
    }
</style>
<style scoped>
    @import "../../css/newview.css";
</style>
