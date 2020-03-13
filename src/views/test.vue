<template>
    <div>
        <v-chart ref="chart1" :options="option" :auto-resize="true"/>
    </div>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                option:{
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'line',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                }
            }
        },
        methods: {
        },
        mounted(){
        }
    }
</script>

<style scoped>

</style>
