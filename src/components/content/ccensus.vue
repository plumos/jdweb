<template>
    <div>
        <el-tabs v-model="activeName" style="margin-left: 20%;width: 70%">
            <el-tab-pane label="销量统计" name="first">
                <v-chart ref="chart1" :options="optionall" :auto-resize="true"/>
            </el-tab-pane>
            <el-tab-pane label="单品统计" name="second">
                <div style="display: flex">

                    <v-chart ref="chart2" :options="option" :auto-resize="true" />

<!--                <el-input v-model="food"></el-input>-->
<!--                <el-button @click="getday">查询</el-button>-->
                <div>
                    <el-radio-group v-model="radio" size="small" style="display: block" @change="rdchange" >
                        <el-radio-button label="年"></el-radio-button>
                        <el-radio-button label="月"></el-radio-button>
                        <el-radio-button label="日"></el-radio-button>
                    </el-radio-group>
                    <el-select v-model="food" placeholder="请选择" size="small" style="margin-top: 100px" @change="rdchange">
                        <el-option
                                v-for="item in foods"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "ccensus",
        data(){
            return{
                activeName:"first",
                food:'',
                radio:'年',
                option:{
                    title: {
                        text: '单品销售情况'
                    },
                    tooltip: {},
                    legend: {
                        data:['销售额','销量'],
                        selectedMode:"single",
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    dataZoom: [// 这个dataZoom组件，若未设置xAxisIndex或yAxisIndex，则默认控制x轴。
                        {
                            type: 'inside',//这个 dataZoom 组件是 slider 型 dataZoom 组件（只能拖动 dataZoom 组件导致窗口变化）
                            xAxisIndex: 0, //控制x轴
                            start: 75, 	// 左边在 10% 的位置
                            end: 100,}], 	// 右边在 60% 的位置

                    series: [{
                        name: '销售额',
                        type: 'bar',
                        data: []
                    },{name: '销量',
                        type: 'bar',
                        data: []}],
                    color:["#8B8B7A","green"],
                },
                optionall:{
                    title: {
                        text: '销售情况'
                    },
                    tooltip: {},
                    legend: {
                        data:['销售额','订单量']
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    series: [{
                        name: '销售额',
                        type: 'bar',
                        data: []
                    },{name: '订单量',
                        type: 'line',
                        data: []}],
                    color:["#8B8B7A"],
                },
                foods:[],

            }
        },
        methods:{
            rdchange(item) {
                switch (this.radio) {
                    case '年':
                        this.getyear();
                        break;
                    case "月":
                        this.getmon();
                        break;
                    case "日":
                        this.getday();
                        break;
                }
            },
            commonproc(flag,response){
                var stime = [];
                var values = [];
                var numbers=[];
                if(response===null){
                    this.option.xAxis.data=stime;
                    this.option.series[0].data=values;
                    this.option.series[1].data=numbers;
                    return
                }
                for(var item of response.dinfos){
                    stime.push(item[flag]);
                    values.push(item.total.toString());
                    numbers.push(item.number.toString())
                }
                this.option.xAxis.data=stime;
                this.option.series[0].data=values;
                this.option.series[1].data=numbers;
            },
            getdayall(){
                this.axios.post('/dc/getalldaycen', {
                    account:window.sessionStorage.getItem("account"),
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.commonproc("day",response.data.daycens);
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getday(){
                this.axios.post('/dc/getdaycen', {
                    account:window.sessionStorage.getItem("account"),
                    food:this.food,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.commonproc("day",response.data.daycens);
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getmonall(){
                this.axios.post('/dc/getallmoncen', {
                    account:window.sessionStorage.getItem("account"),
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.commonproc("mon",response.data.moncens);
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getmon(){
                this.axios.post('/dc/getmoncen', {
                    account:window.sessionStorage.getItem("account"),
                    food:this.food,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.commonproc("mon",response.data.moncens);
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getyearall(){
                this.axios.post('/dc/getallyearcen', {
                    account:window.sessionStorage.getItem("account"),
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.commonproc("year",response.data.yearcens);
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getyear(){
                this.axios.post('/dc/getyearcen', {
                    account:window.sessionStorage.getItem("account"),
                    food:this.food,
                }).then(response => {
                    if (response.status === 200){
                        if (response.data.status === 0){
                            this.commonproc("year",response.data.yearcens);
                        }else{
                            this.$notify.error({message: response.data.msg});
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted:function () {
            this.foods= JSON.parse(window.sessionStorage.getItem("fdnames"))
        }
    }
</script>

<style lang="scss">
    .echarts {
        width: 800px;
        height: 650px;
    }
</style>
<style scoped>

</style>
