

var itype;
var req=[];
req[0] = MOBIL_NUMBER;// 手机号码
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
    "bill_detail":[],
    "call_detail": [],
    "net_detail": [],
    "msg_detail": []

};


function parseBill(dataObj) {
    var type = dataObj.itype;
    var month = dataObj.month;
    var data = dataObj.daata;
    var len = dataObj.len;
    if (len == 0){
    }
    else{
        if (type=="01") {
            for (i = 0; i < data.length; i++) {
                var item = data[i];
                var one = {
                    "bill_month": month,
                    "chargingtime": item.buckleFeTime,
                    "lifetime": item.disposable,
                    "phone_package": item.mealName,
                    "month_consume": item.fee
                };
                DATAS[type].push(one);
            }
            if (type == "02") {
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
                    DATAS[type].push(one);
                }
            }
            if (type == "04") {
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
                    DATAS[type].push(one);


                }
            }
            if (type == "03") {
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
                    DATAS[type].push(one);
                }
            }



        }
    }
}



// 以下是从中国移动的js文件中截取的两个函数，自定义跨越请求后的处理逻辑
var loadBusiData = function(page_count, month, itype) {
        require(["/i/service/model/fee_d601e64.js","/i/apps/serviceapps/billdetail/billdetailone_288e057.js","/i/nresource/js/page/pages.js","btncommit","/i/apps/serviceapps/billdetail/billdetailtwo_4e3f7bc.js"], function(fee, billdetailone, page, btn, billdetailtwo) {

            req[1] = page_count; //第几页
            req[2] = 50; //多少条数据
            req[3] = month; //选中月份
            req[4] = itype; //详单类型
            var type; //默认展示的费用类型
            var colum = 0;
            var nodataline = null;
            console.log(req);

            fee.getDetailInfo(req, function(data, total, start, end, time) {
                var callParam = {};
                callParam.data = data;
                callParam.len = tatal;
                callParam.itype = itype;
                callParam.month = req[3]; //月份
                if (total != 0) {
                    parseBill(callParam);
                }else{
                    callParam.data = "该时间段内没有详单记录";
                    parseBill(callParam)

                }
                if (len/50 > page_count) {
                    loadBusiData(page_count+1, month, itype);
                    };
            }, function(code, msg,sOperTime) {
                //跨域请求失败的处理逻辑

            }, function(code, msg,sOperTime) {
                //跨越请求错误的处理逻辑
            });
        });
    };
    var getDetail = function(curpage) {
        require(["/i/service/model/fee_d601e64.js","/i/apps/serviceapps/billdetail/billdetailone_288e057.js","/i/nresource/js/page/pages.js","btncommit","/i/apps/serviceapps/billdetail/billdetailtwo_4e3f7bc.js"], function(fee, billdetailone, page, btn, billdetailtwo) {
            isWaiting = true;
            req[1] = curpage; //第几页
            req[2] = 50; //多少条数据
            req[3] = dtlmon; //选中月份
            req[4] = itype; //详单类型
            var type; //默认展示的费用类型
            var colum = 0;
            var nodataline = null;
            console.log(req);
            var callParam = {};
            callParam.itype = itype;
            $("#tmpl-data").html(billdetailone(callParam));
            fee.getDetailInfo(req, function(data, total, start, end,time) {

            }, function(code, msg) {

            }, function(code, msg) {

            });
        });
    };


function mainQueryBillDetail() {
    // 主函数

}