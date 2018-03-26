// 增加时间对象的功能
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];
    var Month = this.getMonth() + 1; // getMonth()方法是从0计数的，也就是0表示一月份

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,Month>9?Month.toString():'0' + Month);
    str=str.replace(/M/g,Month);

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
};

// 增加时间计算
Date.prototype.DateAdd = function(strInterval, Number) {
    // 这里只是计算，没有格式化返回，所以不需要对getMonth()做额外的处理
    var dtTmp = this;
    switch (strInterval) { // strInterval表示Number的类型
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
};

var MOBIL_NUMBER = "15876167653"; //手机号
var TODAY = new Date();

/*
* itypes详单类型
* 01： 套餐及固定费
* 02： 通话详情
* 03： 上网详单
* 04： 短信/彩信详单
* 05： 增值业务详单
* 06： 代收业务详单
* 07： 其他扣费记录
* 根据需求目前只需要前4种类型的详单
* */
var itypes = ['01', '02', '03', '04'];
var DICT = {
    "01": "bill_detail",
    "02": "call_detail",
    "03": "msg_detail",
    "04": "net_detail"
};
var DATAS = {
    "phone_operator": "cmcc中国移动", //运营商类型
    "bill_detail":[], // 结构是 [{month: "2018xxx", data: xxxx}, ...]
    "call_detail": [],
    "net_detail": [],
    "msg_detail": []

};


function parseBill(dataObj) {
    var type = dataObj.itype;
    var month = dataObj.month;
    var data = dataObj.data;
    var len = dataObj.len;
    if (len == 0){
        // 当前没有详细账单
        DATAS[DICT[type]].push({
            "bill_month": month,
            "data": data})
    }
    else{
        if (type=="01") {
            // 当月账单的所有内容
            var month_datas = [];
            for (i = 0; i < data.length; i++) {
                var item = data[i];
                var one = {
                    "bill_month": month,
                    "chargingtime": item.buckleFeTime,
                    "lifetime": item.disposable,
                    "phone_package": item.mealName,
                    "month_consume": item.fee
                };
                month_datas.push(one);
            }
            // 放入全局变量中
            DATAS[DICT[type]].push({
                "month": month,
                "data": month_datas
            });
        }

        if (type == "02") {
            var month_datas = [];
            for (i = 0; i < data.length; i++) {
                item = data[i];
                one = {
                    'call_add': item.commPlac,
                    'call_bill_month': month,
                    'call_duration': item.commTime,
                    'call_mode': item.commMode,
                    'call_operatormode': item.commType,
                    'call_othernum': item.anotherNm,
                    'call_package_bene': item.mealFavorable,
                    'call_time': item.startTime,
                    'call_cost': item.commFee
                };
                month_datas.push(one);
            }
            // 放入全局变量中
            DATAS[DICT[type]].push({
                "month": month,
                "data": month_datas
            });
        }

        if (type == "04") {
            var month_datas = [];
            for (i = 0; i < data.length; i++) {
                item = data[i];
                one = {
                    'net_add': item.commPlac,
                    'net_bill_month': month,
                    'net_cost': item.commFee,
                    'net_duration': item.commTime,
                    'net_flow': item.sumFlow,
                    'net_mode': item.netType,
                    'net_operatormode': item.netPlayType,
                    'net_operatornetwork': "cmcc中国移动", // 感觉这个字段多余
                    'net_package_bene': item.meal,
                    'net_time': item.startTime
                };
                month_datas.push(one);
            }
            // 放入全局变量中
            console.debug(type, DICT[type]);
            DATAS[DICT[type]].push({
                "month": month,
                "data": month_datas
            });
        }

        if (type == "03") {
            var month_datas = [];
            for (i = 0; i < data.length; i++) {
                item = data[i];
                one = {
                    'msg_add': item.commPlac,
                    'msg_bill_month': month,
                    'msg_cost': item.commFee,
                    'msg_infomode': item.infoType,
                    'msg_mode': item.commMode,
                    'msg_othernum': item.anotherNm,
                    'msg_package_bene': item.meal,
                    'msg_sendtime': item.startTime
                };
                month_datas.push(one);
            }
            // 放入全局变量中
            DATAS[DICT[type]].push({
                "month": month,
                "data": month_datas
            });
        }
    }
}



// 以下是从中国移动的js文件中截取的两个函数，自定义跨越请求后的处理逻辑
var loadBusiData = function(page_count, month, itype) {
        require(["/i/service/model/fee_d601e64.js","/i/apps/serviceapps/billdetail/billdetailone_288e057.js","/i/nresource/js/page/pages.js","btncommit","/i/apps/serviceapps/billdetail/billdetailtwo_4e3f7bc.js"], function(fee, billdetailone, page, btn, billdetailtwo) {
            var req = [];
            req[0] = MOBIL_NUMBER;
            req[1] = page_count; //第几页
            req[2] = 50; //多少条数据
            req[3] = month; //选中月份
            req[4] = itype; //详单类型
            var type; //默认展示的费用类型
            var colum = 0;
            var nodataline = null;
            console.log(req);

            var callParam = {};
                callParam.itype = itype;
                callParam.month = req[3]; //月份
            console.debug("开始发送详单查询请求:"+ type + month);
            fee.getDetailInfo(req, function(data, total, start, end, time) {
                callParam.len = total;
                callParam.data = data;
                console.debug("本次请求得到的数据为"+JSON.stringify(data));
                if (total != 0) {
                    parseBill(callParam);
                }else{
                    callParam.data = "该时间段内没有详单记录";
                    parseBill(callParam)

                }
                while(total>50){
                    loadBusiData(page_count+1, month, itype);
                }
            }, function(code, msg,sOperTime) {
                //跨域请求失败的处理逻辑
                callParam.data = "跨域请求失败"+code+msg;
                parseBill(callParam)

            }, function(code, msg,sOperTime) {
                //跨越请求错误的处理逻辑
                callParam.data = "跨越请求错误"+code+msg;
                parseBill(callParam)
            });
        });
    };


function mainQueryBillDetail() {// 主函数
    function get_qry_month(num_desc) { //当前时间往后的月份
        return TODAY.DateAdd('m', num_desc).Format("yyyyMM")
    }

    for (var ti=0; ti<itypes.length; ti++){
        // 遍历每一种详单类型
        var type = itypes[ti];
        // 设置查询的月份数
//        var month_num = [-1, -2, -3, -4, -5]; // -1表示前一个月，-2表示前两个月
        var month_num = [-1] // 先测试2个月的
        console.debug("跨越请求开始...")
        for (var m=0; m<month_num.length; m++){
            month = get_qry_month(month_num[m]);
            loadBusiData(1, month, type);
        }
    }

    console.debug("跨域请求完成...数据为： \n" + JSON.stringify(DATAS))
}