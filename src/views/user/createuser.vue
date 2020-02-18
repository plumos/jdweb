<template>
    <div>
        <el-form v-modle="form" ref="form" label-width="80px" style="margin-left: 50%;width:20%;padding-top: 100px">
            <el-form-item label="账号">
                <el-input v-model="form.account"/>
            </el-form-item>
            <el-form-item label="名字">
                <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.pwd" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" show-password>
                <el-input v-model="form.confirmpwd" show-password/>
            </el-form-item>
        </el-form>
        <el-button @click="submit" style="margin-left: 20%">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "createuser",
        data(){
            return{
                form:{
                    account:'',
                    name:'',
                    pwd:'',
                    confirmpwd:'',
                },
            }
        },
        methods:{
            submit:function () {
                if (this.form.pwd!==this.form.confirmpwd){
                    this.$notify.error({message: "两次输入密码不一致"});
                    return
                }
                this.axios.post('/dc/register', {
                    myaccount:window.sessionStorage.getItem("account"),
                    account:this.form.account,
                    name:this.form.name,
                    pwd:this.form.pwd,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.$notify({message: '注册账号成功', type: 'success'});
                            this.form.account="";
                            this.form.name="";
                            this.form.pwd="";
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            }
        }
    }
</script>

<style scoped>

</style>
