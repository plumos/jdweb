<template>
    <div>
        <i >{{shop.name}}<br/></i>
        <i>{{shop.address}}<br/></i>
        <i>{{shop.phone}}<br/></i>
        <i >起送价:{{shop.sendprice}}<br/></i>
        <i >营业状态:{{shop.state}}<br/></i>
        <el-button  type="text" @click="back" >返回<br/></el-button>
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "personal",
        data() {
            return{
                shop:{}
            }
        },
        methods:{
            getshop(){
                axios.post('/dc/getshop', {
                    account:window.sessionStorage.getItem("account"),
                    shopid: parseInt(window.sessionStorage.getItem("shopid")),
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.shop = response.data.data;
                        }else{
                            this.$notify.error({message: "注册失败"});
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            back(){
                this.$router.push({
                    path: '/tmenu',
                    name: '',
                });
            }
        },
        mounted() {
            this.getshop();
        }
    }
</script>

<style scoped>

</style>
