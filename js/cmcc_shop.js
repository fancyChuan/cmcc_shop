
// document.querySelector("#stcnavmenu > ul:nth-child(2) > li > ul > li:nth-child(3) > a").onclick();
// document.querySelector("#month1").onclick();

// 拦截请求到二次登录
var PRE_SECOND_LOGIN = "https://shop.10086.cn/i/v1/fee/detailbillinfojsonp/18819477283?" +
    "curCuror=1&step=100&qryMonth=201802&billType=01&_=1518082148245";

var LOGIN_01 = "https://login.10086.cn/login.html";
var HOME_PAGE = "http://shop.10086.cn/i/?welcome=1518160223569";
// 个人信息接口
var HOME_PAGE_FINASH = "http://shop.10086.cn/i/v1/cust/mergecust/18819477283?_=1518160228928";
// 账户余额接口
var LEFT = "http://shop.10086.cn/i/v1/fee/real/18819477283?_=1518160229008";
// 消费积分
var POINT = "http://shop.10086.cn/i/v1/point/sum/18819477283?_=1518160229010";
// 剩余流量
var PLANBAL = "http://shop.10086.cn/i/v1/fee/planbal/18819477283?_=1518160229013";
// 归属地
var NUBAREA = "http://shop.10086.cn/i/v1/res/numarea/18819477283?_=1518160229080";
// 首页展示月消费情况
var HOME_BILLINFO = "http://shop.10086.cn/i/v1/fee/billinfo/18819477283?bgnMonth=201709&endMonth=201802&_=1518160229238";

// 详单主页
var BILL_DETAIL_INDEX = "http://shop.10086.cn/i/apps/serviceapps/billdetail/index.html";
// 详单查询接口，没有二次登登录的时候不能查询
var BILL_DETAIL = "https://shop.10086.cn/i/v1/fee/detailbillinfojsonp/18819477283?callback=jQuery18304982998747051701_1518171802367&curCuror=1&step=100&qryMonth=201802&billType=01&_=1518171901022";
// 二次登录的主页面
var LOGIN_02 = "http://shop.10086.cn/i/apps/serviceapps/billdetail/showvec.html";

// 交费记录查询
var FEE_HISTORY = "http://shop.10086.cn/i/v1/cust/his/15876167653?startTime=20171001&endTime=20180324&_=1521882476492";

// 账单查询
var fee_real = 'http://shop.10086.cn/i/v1/fee/real/%s?_=%s' % (self.mobile, nowTimestamp())
var point_sum = 'http://shop.10086.cn/i/v1/point/sum/%s?_=%s' % (self.mobile, nowTimestamp())
var bill_info = 'http://shop.10086.cn/i/v1/fee/billinfo/%s?_=%s' % (self.mobile, nowTimestamp())


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

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
    str=str.replace(/M/g,this.getMonth());

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
}

// 增加时间计算
Date.prototype.DateAdd = function(strInterval, Number) {
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
}

var MOBIL_NUMBER = ""; //手机号
var DATAS = {};
var TODAY = new Date();
var NOW_MONTH = TODAY.Format("yyyyMM");
var NOW_DATE = TODAY.Format("yyyyMMdd");

function feeHistory() {//交费记录查询
    var start_time = TODAY.Format("yyyyMMdd");
    var end_time = TODAY.DateAdd("y", 1).Format("yyyyMMdd");
    fee_history = "http://shop.10086.cn/i/v1/cust/his/"+MOBIL_NUMBER+"?startTime="+start_time+
        "&endTime="+end_time+"4&_=1521882476492";

    res = $.get(fee_history);
    resJson = eval('('+res.responseText+')');
    if (resJson.retMsg == "成功"){
        items = resJson.data;
        datas = [];
        for (i=0; i<items.length; i++){
            item = items[i];
            data = {
                'pay_querytime': NOW_DATE,
                 'paychannel': item.payChannel,
                 'paydate': item.payDate,
                 'payment': item.payTypeName,
                 'paytotal': item.payFee}
            datas.push(data);
        }
        DATAS['fee_history'] = datas;
    }else{ // 该段时间没有交费记录
        DATAS["fee_history"] = "该段时间没有交费记录"
    }
}

function personInfo() {
    // var brand_url = 'http://shop.10086.cn/i/v1/busi/plan/' + MOBIL_NUMBER; // item2
    // var info_url = 'http://shop.10086.cn/i/v1/cust/info/' + MOBIL_NUMBER; // item
    var info_merge = "http://shop.10086.cn/i/v1/cust/mergecust/" + MOBIL_NUMBER;


    data = {
        'identitystatus': item.realNameInfo,
         'phone_brand': item2.brandName, // 采用info链接的话 需要找出品牌的代码字典 02表示神州行
         'phone_location': '', // todo 从另外的接口获得
         'phone_num': item.contactNum,
         'phone_package': item2.curPlanName,
         'phone_star_validity': item.starTime,
         'phone_starlv': item.starLevel,
         'phone_starscore': item.starScore,
         'phone_starttime': item.inNetDate,
         'phone_surfingtime': item.netAge,
         'useradd': item.address,
         'useremail': item.email,
         'userlv': item.level, // TODO 用户级别 100表示普通用户 ，需要找出字典
         'username': item.name,
         'userpostcode': item.zipCode,
         'userstatus': item.status, // todo 状态00表示正常，需要找出状态的字典}

}