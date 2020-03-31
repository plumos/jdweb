<template>
    <div>
        <i style="color:red" v-if="msgshow===0">您的店铺正在审核中，请耐心等待</i>
        <i style="color:red" v-if="msgshow===1">店面审核未通过，请联系工作人员</i>
        <el-button type="text" style="margin-left: 30px" @click="back">返回</el-button>
    </div>
</template>

<script>
    export default {
        name: "wait",
        data(){
            return{
                msgshow:0,
            }
        },
        methods:{
            back(){
                this.$router.push({
                    path: '/login',
                    name: '',
                });
            }
        },
        mounted:function() {
            if (this.$route.params.msgshow) {
                this.msgshow =this.$route.params.msgshow;
            }
        }
    }
</script>

<style scoped>

</style>