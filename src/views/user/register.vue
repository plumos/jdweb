<template>
    <div class="register">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account" ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.pwd" show-password ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="form.confirmpwd" show-password ></el-input>
            </el-form-item>
            <el-form-item label="名字">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
        </el-form>
        <el-button style="margin-left:60px" type="primary" plain @click="register">提交</el-button>
    </div>
</template>

<script>
    import axios from 'axios';
    import md5 from 'js-md5';
    export default {
        name: "register",
        data(){
            return{
                form:{
                    account:"",
                    pwd:"",
                    confirmpwd:"",
                    name:"",
                    phone:'',
                }
            }
        },
        methods:{
            register(){
                if(this.form.account===""||this.form.pwd===""||this.form.confirmpwd===""||this.form.phone===""||this.form.name===""){
                    this.$notify.error({message: "必填字段为空"});
                    return
                }
                if(this.form.pwd!==this.form.confirmpwd){
                    this.$notify.error({message: "两次密码不一致"});
                    return
                }
                var pwd = md5(this.form.pwd);
                axios.post('/register', {
                    account: this.form.account,
                    pwd: pwd,
                    phone:this.form.phone,
                    name:this.form.name,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.$notify({message: '注册账号成功', type: 'success'});
                            this.$router.push({
                                path: '/login',
                            });
                        }else{
                            this.$notify.error({message: "注册失败"});
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    @import "../../css/newview.css";
</style>
