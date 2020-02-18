<template>
    <div class="login">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account" @keyup.enter.native="loginin"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.pwd" show-password @keyup.enter.native="loginin"></el-input>
            </el-form-item>
        </el-form>

        <el-button style="margin-left:60px" type="primary" plain @click="loginin">登录</el-button>

        <el-row><p style="margin-left:40%;color:red">{{message}}</p></el-row>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "login",
        data(){
            return{
                message:'',
                form:{
                    account:'',
                    pwd:''
                }
            }
        },
        methods:{
            loginin(){
                console.log("login");
                if(this.form.account==='' || this.form.pwd===''){
                    this.message ="请输入账号或密码";
                    return
                }
                axios.post('/login', {
                    account: this.form.account,
                    pwd: this.form.pwd
                })
                    .then(response => {
                        if (response.status === 200){
                            if (response.data.status === 0){
                                window.sessionStorage.setItem("token",response.data.data.token);
                                window.sessionStorage.setItem("account",this.form.account);
                                window.sessionStorage.setItem("name",response.data.data.user.name);
                                window.sessionStorage.setItem("level",response.data.data.user.level);
                                this.$router.push({
                                    path: '/tmenu',
                                    name: '',
                                });
                                this.afterlogin();
                            }else{
                                //this.$message.error("账号或密码不对")
                                this.message ="账号或密码不对"
                            }
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            afterlogin(){
            }
        }
    }
</script>

<style scoped>
    @import '../../css/newview.css';
</style>
