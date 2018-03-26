
// document.querySelector("#stcnavmenu > ul:nth-child(2) > li > ul > li:nth-child(3) > a").onclick();
// document.querySelector("#month1").onclick();
//
// // 拦截请求到二次登录
// var PRE_SECOND_LOGIN = "https://shop.10086.cn/i/v1/fee/detailbillinfojsonp/18819477283?" +
//     "curCuror=1&step=100&qryMonth=201802&billType=01&_=1518082148245";
//
// var LOGIN_01 = "https://login.10086.cn/login.html";
// var HOME_PAGE = "http://shop.10086.cn/i/?welcome=1518160223569";
// // 个人信息接口
// var HOME_PAGE_FINASH = "http://shop.10086.cn/i/v1/cust/mergecust/18819477283?_=1518160228928";
// // 账户余额接口
// var LEFT = "http://shop.10086.cn/i/v1/fee/real/18819477283?_=1518160229008";
// // 消费积分
// var POINT = "http://shop.10086.cn/i/v1/point/sum/18819477283?_=1518160229010";
// // 剩余流量
// var PLANBAL = "http://shop.10086.cn/i/v1/fee/planbal/18819477283?_=1518160229013";
// // 归属地
// var NUBAREA = "http://shop.10086.cn/i/v1/res/numarea/18819477283?_=1518160229080";
// // 首页展示月消费情况
// var HOME_BILLINFO = "http://shop.10086.cn/i/v1/fee/billinfo/18819477283?bgnMonth=201709&endMonth=201802&_=1518160229238";
//
// // 详单主页
// var BILL_DETAIL_INDEX = "http://shop.10086.cn/i/apps/serviceapps/billdetail/index.html";
// // 详单查询接口，没有二次登登录的时候不能查询
// var BILL_DETAIL = "https://shop.10086.cn/i/v1/fee/detailbillinfojsonp/18819477283?callback=jQuery18304982998747051701_1518171802367&curCuror=1&step=100&qryMonth=201802&billType=01&_=1518171901022";
// // 二次登录的主页面
// var LOGIN_02 = "http://shop.10086.cn/i/apps/serviceapps/billdetail/showvec.html";
//
// // 交费记录查询
// var FEE_HISTORY = "http://shop.10086.cn/i/v1/cust/his/15876167653?startTime=20171001&endTime=20180324&_=1521882476492";
//
// // 账单查询
// var fee_real = 'http://shop.10086.cn/i/v1/fee/real/%s?_=%s' % (self.mobile, nowTimestamp())
// var point_sum = 'http://shop.10086.cn/i/v1/point/sum/%s?_=%s' % (self.mobile, nowTimestamp())
// var bill_info = 'http://shop.10086.cn/i/v1/fee/billinfo/%s?_=%s' % (self.mobile, nowTimestamp())


// 增加时间对象的功能
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
// Date.prototype.Format = function(formatStr) {
//     var str = formatStr;
//     var Week = ['日','一','二','三','四','五','六'];
//     var Month = this.getMonth() + 1; // getMonth()方法是从0计数的，也就是0表示一月份
//
//     str=str.replace(/yyyy|YYYY/,this.getFullYear());
//     str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
//
//     str=str.replace(/MM/,Month>9?Month.toString():'0' + Month);
//     str=str.replace(/M/g,Month);
//
//     str=str.replace(/w|W/g,Week[this.getDay()]);
//
//     str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
//     str=str.replace(/d|D/g,this.getDate());
//
//     str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
//     str=str.replace(/h|H/g,this.getHours());
//     str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
//     str=str.replace(/m/g,this.getMinutes());
//
//     str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
//     str=str.replace(/s|S/g,this.getSeconds());
//
//     return str;
// };
//
// // 增加时间计算
// Date.prototype.DateAdd = function(strInterval, Number) {
//     // 这里只是计算，没有格式化返回，所以不需要对getMonth()做额外的处理
//     var dtTmp = this;
//     switch (strInterval) { // strInterval表示Number的类型
//         case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
//         case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
//         case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
//         case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
//         case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
//         case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
//         case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
//         case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
//     }
// };

var MOBIL_NUMBER = "18819477283"; //手机号 todo 需要传递手机号进来



function feeHistory() {//交费记录查询
    var end_time = TODAY.Format("yyyyMMdd");
    var start_time = TODAY.DateAdd("y", -1).Format("yyyyMMdd");
    var fee_history = "http://shop.10086.cn/i/v1/cust/his/"+MOBIL_NUMBER+"?startTime="+start_time+
        "&endTime="+end_time;

    res = $.ajax({
        type: "GET",
        url: fee_history,
        async: false
    });
    resJson = eval('('+res.responseText+')');
    if (resJson.retMsg == "成功"){
        items = resJson.data;
        datas = [];
        for (i=0; i<items.length; i++){
            item = items[i];
            data = {
                'pay_querytime': end_time,
                 'paychannel': item.payChannel,
                 'paydate': item.payDate,
                 'payment': item.payTypeName,
                 'paytotal': item.payFee};
            datas.push(data);
        }
        DATAS['fee_history'] = datas;
    }else { // 该段时间没有交费记录
        DATAS["fee_history"] = resJson.retCode + resJson.retMsg;
    }
}

function personInfo() {
    var brand_url = 'http://shop.10086.cn/i/v1/busi/plan/' + MOBIL_NUMBER; // item2
    var info_url = 'http://shop.10086.cn/i/v1/cust/info/' + MOBIL_NUMBER; // item1
    // var info_merge = "http://shop.10086.cn/i/v1/cust/mergecust/" + MOBIL_NUMBER;
    var num_area = "http://shop.10086.cn/i/v1/res/numarea/" + MOBIL_NUMBER; // 归属地查询url
    
    var datas = {};
    
    var res1 = $.ajax({
        type: "GET",
        url: info_url,
        async: false
    });
    var resJson1 = JSON.parse(res1.responseText);
    if (resJson1.retMsg == "成功"){
        var item = resJson1.data;
        var temp_data1 = {
            'identitystatus': item.realNameInfo,
            'phone_star_validity': item.starTime,
            'phone_starlv': item.starLevel,
            'phone_starscore': item.starScore,
            'phone_starttime': item.inNetDate,
            'phone_surfingtime': item.netAge,
            'phone_num': item.contactNum,
            'useradd': item.address,
            'useremail': item.email,
            'userlv': item.level, // TODO 用户级别 100表示普通用户 ，需要找出字典
            'username': item.name,
            'userpostcode': item.zipCode,
            'userstatus': item.status, // todo 状态00表示正常，需要找出状态的字典}
        };
        datas = $.extend(datas, temp_data1);
    }
    
    var res2 = $.ajax({
        type: "GET",
        url: brand_url,
        async: false
    });
    var resJson2 = JSON.parse(res2.responseText);
    if (resJson2.retMsg == "成功"){
        var item2 = resJson2.data;
        var temp_data2 = {
            'phone_brand': item2.brandName, // 采用info链接的话 需要找出品牌的代码字典 02表示神州行
            'phone_package': item2.curPlanName,}
        datas = $.extend(datas, temp_data2);
    }
    
    var res3 = $.ajax({
        type: "GET",
        url: num_area,
        async: false
    });
    var resJson3 = JSON.parse(res3.responseText);
    if (resJson3.retCode == "000000"){
        datas['phone_location'] = resJson3.data.id_name_cd;
    }
    
    DATAS['person_info'] = datas;
}
    
function billInfo() {
    var bill_info_url = 'http://shop.10086.cn/i/v1/fee/billinfo/' + MOBIL_NUMBER;
    var fee_real = 'http://shop.10086.cn/i/v1/fee/real/' + MOBIL_NUMBER;
    var point_sum = 'http://shop.10086.cn/i/v1/point/sum/' + MOBIL_NUMBER;
    // 查询完整的接口
    // bill_info_qry = "http://shop.10086.cn/i/v1/fee/billinfo/18819477283?bgnMonth=201803&endMonth=201710&_=1522035428155";
    var bill_datas = {};

    var res1 = $.ajax({
        type: "GET",
        url:bill_info_url,
        async: false
    });
    var resJson1 = JSON.parse(res1.responseText);
    if (resJson1.retCode == "000000"){
        var items = resJson1.data;
        var datas = []; // 每月账单费用基本信息
        var fees = 0; // 累计每月账单费用，用来计算平均费用
        for (i=0; i<items.length; i++){
            var item = items[i];
            // 费用累加
            fees += parseFloat(item.billFee);
            // 账单内容
            var bill = {
                'bill_month': item.billStartDate + '-' + item.billEndDate,
                'month_consume': item.billFee,
            };
            // 处理当月费用所包含的项目
            bill_contents = item.billMaterials;
            for (j=0; j<bill_contents.length; j++){
                content = bill_contents[j];
                var content_type_DICT = {
                    "01": "buding_fee", // 固定费用
                    "02": "yuyin_fee", // 语音通信费用
                    "03": "net_fee", // 上网费用
                    "04": "msg_fee", // 短彩信费用
                    "05": "zengzhi_fee", // 增值业务费用
                    "06": "daishou_fee", // 代收费
                    "09": "other_fee", // 其他费用
                    "11": "fee_desc", // 业务费用减免
                    "12": "comm_free", // 本月通讯费优惠
                    "13": "danwei_daifu", // 单位代付
                };
                bill[content_type_DICT[content.billEntriy]] = content.billEntriyValue;
            }
            // 完成处理，加到数组中
            datas.push(bill);
        }

        bill_datas['average_consume'] = fees / items.length; // 平均账单费用
        bill_datas['bill_content'] = datas;
    }
    res2 = $.ajax({
        type: "GET",
        url: fee_real,
        async: false
    });
    resJson2 = JSON.parse(res2.responseText);
    if (resJson2.retCode == "000000"){
        bill_datas['phone_balance'] = resJson2.data.curFeeTotal;
    }

    res3 = $.ajax({
        type: "GET",
        url: point_sum,
        async: false
    });
    resJson3 = JSON.parse(res3.responseText);
    if (resJson3.retCode == "000000") {
        bill_datas['phone_integral'] = resJson3.data.pointValue;
    }
    //添加到全局变量
    DATAS["bill_query"] = bill_datas;
}

function extractHTTP() {
    // 本js脚本不需要二次验证，全部为同域请求
    console.debug("开始查询交费记录...");
    feeHistory();
    console.debug("开始查询个人信息...");
    personInfo();
    console.debug("开始查询账单信息...");
    billInfo();
    console.debug("HTTP同域请求爬取完毕");
    console.debug("数据爬取结束，结果为：", DATAS)
}