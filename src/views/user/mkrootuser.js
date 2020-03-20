var MongoClient = require("mongodb").MongoClient;
var md5 = require('md5')
var url = "mongodb://47.106.114.251:27017/dc";
MongoClient.connect(url, function (err, client) {
    //client参数就是连接成功之后的mongoclient(个人理解为数据库客户端)
    if (err) {
        console.log("数据库连接失败");
        return;
    }
    console.log("数据库连接成功");
    //3.0新写法
    var db = client.db("dc");
    db.collection("user").insertOne({"account" : "cris","name":"管理员","pwd":md5("shouji"),"level":1}, function (err, result) {
        if (err) {
            return;
        }else{
            console.log("success")
        }
    })

});