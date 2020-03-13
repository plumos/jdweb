module.exports = {
    devServer: {
        proxy: 'http://localhost:8080'   //182.61.48.183:
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}
