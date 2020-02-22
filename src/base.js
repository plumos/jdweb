exports.install = function (Vue, options) {
    Vue.prototype.checkstate = function (state){
        if(state.hidden===true){
            return "隐藏"
        }
        if(state.soldout===true){
            return "售罄"
        }
        if(state.remain!==0){
            return "限量"+" "+state.remain
        }
        return "正常"
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
