define(function(require) {
    var app = require('appmanage');
    var util = require('stcutil');
    var stcDic = require('stcDic');
    var recharge = require('/i/service/model/recharge_97e0c0a.js');
    var complDate = [];
    var complDate2 = [];
    var itype;
    var status;
    var status1;
    var dtlmon;
    var req = [];
    var config = {
        vec_prompt:['请输入验证码','验证码位数不足','验证码错误，请重新输入',null],
        authImg:'/i/authImg'
    };
    var send_sms;
    var sms_count
    var vecstatus;
    var channelID = "12003";
    var len = 0;
    var isWaiting = false; //正在查询为true,为true时类型和时间tab查询条件不可点
    req[0] = app.data[0].mobile; //手机号码
    var interStat = false;//接口是否被调用
    var vec_text;//文本框输入的内容
    var vec_pre;//上一次输入的验证码

    var _initPage = function() {
        getMonths();
        require(["appmanage"],function(app){
            if(app.data[0].data.userType == 2){//0:手机号,1:互联网账号,2未登录
                renderUnlogin();
            }
        });
        //			$("#tmpl-data").html("<tr><td colspan='6' style='text-align:center;'>点击月份按钮进行查询!</td></tr></thead>");
        $("#switch-data li").siblings().css("cursor","default").children().css("cursor","default");
        $("#switch-data li").on("click", function() {
            if(!isWaiting){ //正在查询中则点击无效 add by zhouhong 20161223
                $(this).addClass("active").siblings().removeClass("active");
                itype = $(this).attr("itype");
                status1 = $(this).attr("status1");
                var eventCode = $(this).attr('eventCode');
                //未登录表格展示
                require(["appmanage"],function(app){
                    if(app.data[0].data.userType == 2){//0:手机号,1:互联网账号,2未登录
                        renderUnlogin();
                    }else{
                        stcEcode.commTrack(eventCode, false); //插事件码-点击详单类型
                        if ($("#month-data li").hasClass("active")) {
                            dtlmon = $("#month-data .active").attr("v");
                            loadBusiData();
                        }else{
                            reloadTableHead();
                        }
                    }
                });
            }
        });
        $("#switch-data").children().eq(0).trigger("click");
        $("#month-data li").siblings().css("cursor","default");
        $("#month-data li").on('click', function() {
            if(!isWaiting) { //正在查询中则点击无效 add by zhouhong 20161223
                $(this).addClass("active").css("border","1px solid").siblings().removeClass("active");
                var eventCode = $(this).attr('eventCode');
                stcEcode.commTrack(eventCode, false); //插事件码-点击详单月份
                dtlmon = $(this).attr("v");
                status = $(this).attr("status");
                // 未登录表格展示
                require(["appmanage"], function (app) {
                    if (app.data[0].data.userType == 2) {//0:手机号,1:互联网账号,2未登录
                        renderUnlogin();
                    } else {
                        loadBusiData();
                    }
                });
            }
        });
    };
    var complementHistoryDate = function(y, m) {
        //第一次装入当前月(格式yyyy-mm)
        complDate[0] = y + "年" + (m.toString().length == 1 ? "0" + m + "月" : m + "月");
        m--;
        //第一次已经装入,numMonth少计算一次
        for (var i = 1; i < 6; i++, m--) {
            if (m == 0) {
                //到1月后,后推一年
                y--;
                m = 12; //再从12月往后推
            }
            complDate[i] = y + "年" + (m.toString().length == 1 ? "0" + m + "月" : m + "月");
        }
        return complDate;
    };
    var complementHistoryDate2 = function(y, m) {
        //第一次装入当前月(格式yyyy-mm)
        complDate2[0] = y + "" + (m.toString().length == 1 ? "0" + m : m);
        m--;
        //第一次已经装入,numMonth少计算一次
        for (var i = 1; i < 6; i++, m--) {
            if (m == 0) {
                //到1月后,后推一年
                y--;
                m = 12; //再从12月往后推
            }
            complDate2[i] = y + "" + (m.toString().length == 1 ? "0" + m : m);
        }
        return complDate2;
    };
    var loadBusiData = function() {
        require(["/i/service/model/fee_d601e64.js","/i/apps/serviceapps/billdetail/billdetailone_288e057.js","/i/nresource/js/page/pages.js","btncommit","/i/apps/serviceapps/billdetail/billdetailtwo_6717790.js"], function(fee, billdetailone, page, btn, billdetailtwo) {
            isWaiting = true;
            req[1] = 1; //第几页
            req[2] = 50; //多少条数据
            req[3] = dtlmon; //选中月份
            req[4] = itype; //详单类型
            var type; //默认展示的费用类型
            var colum = 0;
            var nodataline = null;
            console.log(req);
            $('.ued-loading').html("<tr><td class='bd-4' colspan='7' style=height:150px><img src='/i/nresource/image/loading.gif'></td></tr>");
            fee.getDetailInfo(req, function(data, total, start, end,time) {
                var callParam = {};
                callParam.data = data;
                if (total != 0) {
                    len = total;
                    callParam.itype = itype;
                    $("#tmpl-data").html(billdetailone(callParam));
                    $('#billdetail-block').css('display','block');
                    $('#billdetail-time').html(util.formatStrDate(time));
                }else{
                    $('.ued-loading tbody').addClass("err");
                    btn.getTabErr({img:"busideal",info:{text:"您选择的时间段内没有详单记录哦",remark1:""},imgHeight:"70"});
                    $('#billdetail-block').css('display','block');
                    $('#billdetail-time').html(util.formatStrDate(time));
                }
                var tmpl_id = $("#tbody");
                if (len > 0) {
                    page.pages(len, tmpl_id, 50, function(curpage) {
                        getDetail(curpage);
                    });
                }
                isWaiting = false;
            }, function(code, msg,sOperTime) {
                msg = util.getErrMsg(msg);
                if(code == "500003"){
                    renderUnlogin();
                    return;
                }
                var callParam = {};
                callParam.itype = itype;
                $("#tmpl-data").html(billdetailtwo(callParam));
                console.log("fail");
                if (code == "520001" || code == "3018") { //需要短信二次认证
                    //取消掉表格的等待加载状态
                    showVec()
                } else {
                    $('.ued-loading tbody').addClass("err");
                    btn.getTabErr({
                        img: "busideal",
                        info: {
                            text: msg,
                            remark1: ""
                        },
                        imgHeight:"70"
                    });
                }
                $('#billdetail-block').css('display','block');
                $('#billdetail-time').html(util.formatStrDate(sOperTime));
                isWaiting = false;
            }, function(code, msg,sOperTime) {
                $('.ued-loading tbody').addClass("err");
                msg = util.getErrMsg(msg);
                btn.getTabErr({
                    img: "busideal",
                    info: {
                        text: msg,
                        remark1: ""
                    },
                    imgHeight:"70"
                });
                $('#billdetail-block').css('display','block');
                $('#billdetail-time').html(util.formatStrDate(sOperTime));
                isWaiting = false;
            });
        });
    };
    var getDetail = function(curpage) {
        require(["/i/service/model/fee_d601e64.js","/i/apps/serviceapps/billdetail/billdetailone_288e057.js","/i/nresource/js/page/pages.js","btncommit","/i/apps/serviceapps/billdetail/billdetailtwo_6717790.js"], function(fee, billdetailone, page, btn, billdetailtwo) {
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
            $('.ued-loading').html("<tr><td class='bd-4' colspan='7' style=height:150px><img src='/i/nresource/image/loading.gif'></td></tr>");
            fee.getDetailInfo(req, function(data, total, start, end,time) {
                callParam.data = data;
                if (total != 0) {
                    //							len = total;
                    $("#tmpl-data").html(billdetailone(callParam));
                    $('#billdetail-block').css('display','block');
                    $('#billdetail-time').html(util.formatStrDate(time));
                } else {
                    $('.ued-loading tbody').addClass("err");
                    btn.getTabErr({img:"busideal",info:{text:"您选择的时间段内没有详单记录哦",remark1:""},imgHeight:"70"});
                }
                isWaiting = false;
            }, function(code, msg) {
                msg = util.getErrMsg(msg);
                console.log("fail");
                var callParam = {};
                callParam.itype = itype;
                $("#tmpl-data").html(billdetailtwo(callParam));
                if (code == "520001" || code == "3018") { //需要短信二次认证
                    //取消掉表格的等待加载状态
                    showVec()
                } else {
                    $('.ued-loading tbody').addClass("err");
                    btn.getTabErr({
                        img: "busideal",
                        info: {
                            text: msg,
                            remark1: ""
                        },
                        imgHeight:"70"
                    });
                }
                isWaiting = false;
            }, function(code, msg) {
                msg = util.getErrMsg(msg);
                $('.ued-loading tbody').addClass("err");
                btn.getTabErr({
                    img: "busideal",
                    info: {
                        text: msg,
                        remark1: ""
                    },
                    imgHeight:"70"
                });
                isWaiting = false;
            });
        });
    };
    var reloadTableHead = function(){
        require(["/i/apps/serviceapps/billdetail/billdetailtwo_6717790.js"], function(billdetailtwo) {
            var callParam = {};
            callParam.itype = itype;
            $("#tmpl-data").html(billdetailtwo(callParam));
        })
    };


    //发送短信验证码     modify by fenghy@20170221   接口调整
    var sendSms = function(_phone) {
        require(["/i/service/model/fee_d601e64.js","pluspop"], function(fee, poptool) {
            var req = {};
            req.userPhone = _phone;
            fee.sendSmsVec(req, function(data) {
                alert("短信发送成功！");
            }, function(code, msg) {//场景提示语优化
                if(code == "555001"){
                    alert("尊敬的用户，单位时间内下发短信次数过多，请稍后再使用！");
                }else if(code == "555002"){
                    alert("尊敬的用户，今天下发短信次数过多，请明天再使用！");
                }else if(code == "550011"){
                    alert("请勿在一分钟内重复下发短信！");
                }
            },function (code,msg) {
                alert("短信发送失败！");
            });
        });
    };
    //modify by fenghy@20170227   图片验证码的添加
    var showVec = function() {
        if(typeof vecstatus !="undefined")
            clearTimeout(vecstatus);
        require(["/i/service/model/fee_d601e64.js","pluspop"], function(fee, poptool) {
            stcEcode.commTrack("UCenter_billdetailqry_YZ", false); //插事件码-身份验证(弹框)
            poptool.remotehtml("/i/apps/serviceapps/billdetail/showvec.html", {}, function() {

                //console.log("sdsffffffffffffff"+$(".dialog-header-r").attr('class'));
                $(".dialog-header-r").parent().parent().parent().attr("style","padding:0px;");
                $("#phone").html(app.data[0].mobile);
                send_sms = $("#stc-send-sms");
                sms_count = $("#stc-jf-sms-count");
                //add by zhouhong 20170216 start 详单验证码图片
                var imgVec = $('#imageVec'); //验证码图片
                var imgVecInput = $("#vec_imgcode");//验证码输入框
                vec_text = null; //验证码输入框的值
                vec_pre = null; //上一次输入的验证码
                interStat = false; //验证是否通过,true-通过,false-不通过
                $(imgVec).attr('src',config.authImg+'?t='+Math.random());
                $(imgVecInput).attr('interStat',0); //表示没有调过接口
                $(imgVec).unbind();
                $(imgVec).click(function(){
                    $(imgVec).attr('src',config.authImg+'?t='+Math.random());
                    interStat = false; //验证是否通过,true-通过,false-不通过
                });
                //验证码输入框事件
                $(imgVecInput).unbind();
                $(imgVecInput).focus(function(){
                    verTipRemove();
                });
                $(imgVecInput).on('keyup',function(){
                    vec_text = $(this).val();
                    if(vec_text.length == 6){
                        $(this).trigger('blur');
                    }
                });
                $(imgVecInput).blur(function(){
                    checkImgVecInput();//验证码预校验
                });
                //modify  by fenghy 20170216 end
                $(send_sms).on("click", function() {
                    var count = 60;
                    $(send_sms).hide();
                    $(sms_count).html(count);
                    $(sms_count).parent().show();
                    vecstatus = setTimeout(function() {
                        _refreshTime(count);
                    }, 1000);
                    sendSms(app.data[0].mobile);
                });
                $("#vecbtn").on("click", function() {
                    stcEcode.commTrack("UCenter_billdetailqry_RZ", false); //插事件码-认证按钮
                    var servcode = $("#vec_servpasswd").val();
                    var veccode = $("#vec_smspasswd").val();
                    var vec_text = $(imgVecInput).val();
                    var prompt2 =  config.vec_prompt;
                    if ($.trim(servcode) == "" || $.trim(veccode) == "") {
                        $("#tip").html("服务密码和随机密码不能为空");
                        return false;
                    } else if (servcode.length != 6 && servcode.length != 8) {
                        $("#tip").html("请输入6位或8位服务密码");
                        return false;
                    } else if (veccode.length != 6) {
                        $("#tip").html("随机密码不能多于或少于6位");
                        return false;
                    } else if (!/^[0-9]*$/.test(servcode) || !/^[0-9]*$/.test(veccode)) {
                        $("#tip").html("服务密码和随机密码只能是数字");
                        return false;
                    } else {
                        $("#tip").html("");
                    }
                    var str2 = checkVec(vec_text,prompt2,true);
                    if(str2 !=null ){
                        $("#detailerrmsg").html(str2);
                        $("#failremind").show();
                        vecTipErro();
                        return false;
                    }
                    //						vecButns.disabled(true,"认证中...");
                    vecSubmit(app.data[0].mobile);
                })
                $("#vecClose").on("click", function() {
                    stcEcode.commTrack("UCenter_billdetailqry_YZClose", false);
                });
            });
        });
    };
    //modify by zhouhong 20170216 start
    var checkVec = function(vec_text,prompt,_vecTxt){
        if(vec_text == null || vec_text == ''){
            return prompt[0];
        }else if(vec_text != null && vec_text != '' && vec_text.length < 6){
            return prompt[1];
        }else if(vec_text.length == 6){
            if(_vecTxt){
                var interStat = $("#vec_imgcode").attr('interStat');
                if(interStat == 1){
                    return null;
                }else{
                    return prompt[2];
                }
            }
            return null;
        }
    };
    //验证码预校验
    var checkImgVecInput = function () {
        var imgVecInput = $("#vec_imgcode");//验证码输入框
        var vec_text = $(imgVecInput).val();//验证码输入框的值
        var prompt = config.vec_prompt;//验证码下方提示语
        var str = checkVec(vec_text,prompt);//根据验证码输入框的值展示提示语
        var req = {};
        req.captchaVal = vec_text;
        req.user = app.data[0].mobile;
        var vinterStat = $(imgVecInput).attr('interStat');//判断是否通过验证,1表示通过,0表示未通过
        if(str != null){//验证码输入有问题
            $("#detailerrmsg").html(str);//展示对应的提示语
            $("#failremind").show();
            vecTipErro();
        }else{//验证码输入没有问题
            if(vec_pre != vec_text && vec_pre != null){ //非第一次输入且与上一次输入不同
                interStat = false;//验证未通过
            }else if(vec_pre == null){ //第一次输入
                interStat = false;//验证码未通过
            }else{//如果当前输入与上一次输入相同，判断上一次是否成功，若成功interStats=1，否则interStats=0
                if(vinterStat == 1){
                    interStat = true;
                    verTipCorre();
                }else{
                    interStat = false;
                }
            }
            //判断是否调过接口,防止接口被多次调用
            if(!interStat){
                recharge.identifyCode(req,function(data){
                    // ajaxUtil.GET('/v1/res/precheck/'+_phonenum+"?captchaVal="+req.captchaVal,{},function(data){
                    verTipCorre();
                    interStat = true;
                    $(imgVecInput).attr('interStat',1);
                },function(code,msg){
                    //add by fenghy@@0170207
                    $("#detailerrmsg").html("验证码错误，请重新输入");
                    $("#failremind").show();
                    vecTipErro();
                    interStat = false;
                    $(imgVecInput).attr('interStat',0);
                },function(code,msg){
                    //add by fenghy@@0170207
                    $("#detailerrmsg").html("验证码错误，请重新输入");
                    $("#failremind").show();
                    vecTipErro();
                    interStat = false;
                    $(imgVecInput).attr('interStat',0);
                });
            }
        }
        if(vec_pre != vec_text){
            vec_pre = vec_text;//记录此次验证码输入框的值
        }
    };
    //提示图标：对号，错号
    var vecTipErro = function(){
        $('#vec_imgcode').removeClass('yzm-true1');
    };
    var verTipCorre = function(){
        $('#vec_imgcode').removeClass('yzm-true1').addClass('yzm-true1');
        $("#detailerrmsg").html("");
        $("#failremind").hide();
    };
    var verTipRemove = function(){
        $('#vec_imgcode').removeClass('yzm-true1');
    };
    var refreshImg = function(){
        $('#vec_imgcode').attr('src',config.authImg+'?t='+Math.random());
        $('#vec_imgcode').val(null);
        $('#vec_imgcode').removeClass('yzm-true1');
    };
    //add by fenghy 20170216 end
    var _refreshTime = function(count) {
        var cc = count;
        cc--;
        if (cc > 0) {
            $(sms_count).html(cc);
            vecstatus = setTimeout(function() {
                _refreshTime(cc);
            }, 1000);
        } else {
            //	   	   own.sms_des.html("");
            $(send_sms).show();
            $(sms_count).parent().hide();
            clearTimeout(vecstatus);
        }
    };
    var vecSubmit = function(_phone, but) {
        require(["/i/service/model/fee_d601e64.js","pluspop","btncommit"], function(fee, poptool, btnCommit) {
            var servcode = $("#vec_servpasswd").val();
            var veccode = $("#vec_smspasswd").val();
            var imgcode =  $("#vec_imgcode").val();
            if ($.trim(servcode) == "" || $.trim(veccode) == "") {
                $("#tip").html("服务密码和随机密码不能为空");
                return false;
            } else if (servcode.length != 6 && servcode.length != 8) {
                $("#tip").html("请输入6位或8位服务密码");
                return false;
            } else if (veccode.length != 6) {
                $("#tip").html("随机密码不能多于或少于6位");
                return false;
            } else if (!/^[0-9]*$/.test(servcode) || !/^[0-9]*$/.test(veccode)) {
                $("#tip").html("服务密码和随机密码只能是数字");
                return false;
            } else {
                $("#tip").html("");
            }
            btnCommit.afterCommit({btn:$("#vecbtn"),afterText:"认证中"});
            $("#vecbtn").removeClass('ued-btn-small');
            $("#vecbtn").addClass('ued-small-gey');

            var req = {};
            req.user_id = _phone;
            req.servcode = servcode;
            req.veccode = veccode;
            req.imgcode = imgcode;
            fee.submitDetailVec(req, function(data) {
                $("#vecbtn").removeClass('ued-small-gey');
                $("#vecbtn").addClass('ued-btn-small');
                btnCommit.revertCommit({btn:$("#vecbtn"),beforeText:"认证"});
                $(".diacancle").trigger("click");
                $("#month-data").children().eq(parseInt(status)).trigger("click"); //认证成功后，默认加载选中月份和类型的第一页数据
                //					initPage();
                stcEcode.commTrack("UCenter_billdetailqry_RZSuccess", false); //插事件码-验证成功,add by guoqx_bj@20151223
            }, function(code, msg) {
            	//20170608认证失败重新刷新验证码
				$('#imageVec').trigger('click');
                $("#vecbtn").removeClass('ued-small-gey');
                $("#vecbtn").addClass('ued-btn-small');
                btnCommit.revertCommit({btn:$("#vecbtn"),beforeText:"认证"});
                if(typeof msg !="undefined" && msg != null && $.trim(msg)!=""){
                    $("#detailerrmsg").html(msg);
                }
                $("#failremind").show();
                refreshImg();
                reloadTableHead();
                stcEcode.commTrack("UCenter_billdetailqry_RZFail", false); //插事件码-验证失败,add by guoqx_bj@20151223
            });
        });
    };

    var getMonths = function() {
        require(["stcutil"], function(stc) {
            stc.getSysDate(function(now_time) {
                var months = [];
                var months2 = [];
                var y = now_time.getFullYear();
                var m = now_time.getMonth() + 1;
                months = complementHistoryDate(y, m);
                $("#month1").html(months[0]);
                $("#month2").html(months[1]);
                $("#month3").html(months[2]);
                $("#month4").html(months[3]);
                $("#month5").html(months[4]);
                $("#month6").html(months[5]);
                $("#month1").attr("v", complementHistoryDate2(y, m)[0]);
                $("#month2").attr("v", complementHistoryDate2(y, m)[1]);
                $("#month3").attr("v", complementHistoryDate2(y, m)[2]);
                $("#month4").attr("v", complementHistoryDate2(y, m)[3]);
                $("#month5").attr("v", complementHistoryDate2(y, m)[4]);
                $("#month6").attr("v", complementHistoryDate2(y, m)[5]);
            });
        });
    };
    window.closePop = function(){
        window.location.href=stcDic.getWebAddress()+"?f=billdetailqry";
        if ($.cookie("stc_517_star_click") == '1') {// 如果是通过点击星星入口后弹出登录的在进行标识。
            $.cookie("stc_517_star",'1',{domain:'.10086.cn',path: '/' });
        }
    };
    var renderUnlogin = function () {
        require(["/i/apps/serviceapps/unlogincomm/unlogin_1bb8ebf.js","/i/apps/serviceapps/unlogincomm/unlogin_3c1451b.js"], function(unlogin,unloginjs){
            $("#tmpl-data").html(unlogin({leftText:'请',rightText:'后查看详情'}));
            $('#login-btn').unbind();
            $('#login-btn').on('click', function() {
                unloginjs.openLoginPop();
            })
        });
    };
    return {
        initPage:function () {
            _initPage();
        }
    }

})