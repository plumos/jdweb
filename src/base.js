exports.install = function (Vue, options) {
    Vue.prototype.checkstate = function (off,soldout){
        if(off===true){
            return "隐藏"
        }
        if(soldout===true){
            return "下架"
        }
        return "正常"
    };

    Vue.prototype.getsort=function(){
        this.axios.post('/dc/getsort', {
            account:window.sessionStorage.getItem("account"),
            shopid:parseInt(window.sessionStorage.getItem("shopid")),
        }).then(response => {
            if (response.status === 200){
                if (response.data.status === 0){
                    window.sessionStorage.setItem("sorts",JSON.stringify(response.data.data))
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    Vue.prototype.getfdname=function(){
        this.axios.post('/dc/getfdname', {
            account:window.sessionStorage.getItem("account"),
        }).then(response => {
            if (response.status === 200){
                if (response.data.status === 0){
                    window.sessionStorage.setItem("fdnames",JSON.stringify(response.data.fdnames))
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    Vue.prototype.adds=function(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.muls(a, e) + this.muls(b, e)) / e;
    }
    Vue.prototype.sub=function(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.muls(a, e) - this.muls(b, e)) / e;
    }
    Vue.prototype.muls=function(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }
};
