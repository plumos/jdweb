<template>
    <div>
        <el-button type="text" style="color:gray;position: fixed;right: 50px;top:10px;" plain @click="toregister">账号注册</el-button>
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
        <el-row><p style="margin-left:20%;color:red">{{message}}</p></el-row>
    </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import md5 from 'js-md5';
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
            //登录直接拿到shop状态，确定跳转方向
            loginin(){
                console.log("login");
                if(this.form.account==='' || this.form.pwd===''){
                    this.message ="请输入账号或密码";
                    return
                }
                var pwd = md5(this.form.pwd);

                axios.post('/login', {
                    account: this.form.account,
                    pwd: pwd
                }).then(response => {
                        if (response.status === 200){
                            if (response.data.status === 0){

                                if(response.data.data.shop!==undefined &&response.data.data.shop!==null) {

                                    if (response.data.data.shop.confirm !== 1) {
                                        this.$router.push({
                                            path: '/wait',
                                            name: 'wait',
                                            params: {
                                                msgshow: response.data.data.shop.confirm,
                                            }
                                        });
                                        return
                                    }
                                }
                                window.sessionStorage.setItem("token",response.data.data.token);
                                window.sessionStorage.setItem("account",this.form.account);
                                window.sessionStorage.setItem("name",response.data.data.user.name);
                                window.sessionStorage.setItem("phone",response.data.data.user.phone);
                                window.sessionStorage.setItem("shopid",response.data.data.user.shopid);

                                if (response.data.data.user.shopid===0||response.data.data.user.shopid ===undefined){
                                    this.$router.push({
                                        path: '/shop',
                                        name: '',
                                    });
                                    return
                                }
                                this.$router.push({
                                    path: '/tmenu',
                                    name: '',
                                });
                                this.afterlogin();
                            }else{
                                //this.$message.error("账号或密码不对")
                                this.message = response.data.msg //"账号或密码不对"
                            }
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            toregister(){
                this.$router.push({
                    path: '/register',
                });
            },
            afterlogin(){
                this.getsort();
                this.getfdname();
            },
        }
    }
</script>

<style scoped>
    @import '../../css/newview.css';
</style>
