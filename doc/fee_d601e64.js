define(function(require) {
	var stc = require('stcutil');
	var stclog = require('stclog');
	var billInfo = new Array();
	var datailBillInfo = [];
	var detailInfo_key = new Array();
	var detailInfo_total = new Array();
	var detailInfo_data = new Array();
	var detailInfo_max = 20;
	var detail_step = 100;
	var dtlTotal = new Array();
	var dtlStart = new Array();
	var dtlEnd = new Array();
	var dtlTime = new Array();
	var pageTemp;
	var billCodePara = {
		"inx": "billqry",
		"flag": "true"
	}; //插码
	var detailBillCodePara = {
		"inx": "billdetailqry",
		"flag": "true"
	}; //插码
	//功能权限接口
	var getBillInfoHome = function(req, succ, fail) {
		require(["commonutil","uri"], function(ajaxUtil, uri) {
			ajaxUtil.GET('/v1/fee/billinfo/' + req[0], {
				bgnMonth: req[2],
				endMonth: req[1]
			}, succ, fail, function() {}, billCodePara);
		});
	};
	var getBillInfo = function(req, succ, fail, error) {
		var user = req[0];
		var qryMon = req[1];
		if (typeof(billInfo[user + "_" + qryMon]) != 'undefined' && billInfo[user + "_" + qryMon] != null) {
			stc.getSysDate(function(sysdata) {
				var nowd = sysdata.getTime();
				var times = nowd - billInfo[user + "_" + qryMon][0];
				if (req[1] == req[3] && times > 900000) { //如果是查询当前月，判断当时时间戳如果与缓存的时间戳相隔大于15分钟则重新查询
					//req[2] = req[3];//只查询当月
					ajaxGetBillInfo(req, function(data,page) {
						var monthBillInfo = cacheBillInfo(data, nowd, qryMon, user);
						if (typeof succ == 'function' && null != monthBillInfo) {
							if(page.paging.sOperTime!=null){
								succ(monthBillInfo,page.paging.sOperTime);
							}else{
								succ(monthBillInfo);
							}
							
						} else {
							fail("", "");
						}
					}, function(code, msg,sOperTime) {
						if (typeof fail == 'function')
							fail(code, msg,sOperTime);
					}, function(code, msg,sOperTime) {
						if (typeof error == 'function')
							error(code, msg,sOperTime);
					});
				} else {
					succ(billInfo[user + "_" + qryMon][1],pageTemp);
				}
			});
		} else {
			stc.getSysDate(function(sysdata) {
				ajaxGetBillInfo(req, function(data,page) {
					pageTemp = page.paging.sOperTime;
					var nowd = sysdata.getTime();
					var monthBillInfo = cacheBillInfo(data, nowd, qryMon, user);
					console.log("121221121212");
					console.log(monthBillInfo);
					if (typeof succ == 'function' && null != monthBillInfo) {
						if(page.paging.sOperTime!=null){
							succ(monthBillInfo,page.paging.sOperTime);
						}else{
							succ(monthBillInfo);
						}
					} else {
						fail("", "");
					}
				}, function(code, msg) {
					if (typeof fail == 'function')
						fail(code, msg);
				}, function(code, msg) {
					if (typeof error == 'function')
						error(code, msg);
				});
			});
		}
	};
	var getDetailInfo = function(req, succ, fail, error) {
		var r = req[1]; //当前页
		var n = req[2]; //每页记录数
		req[1] = (r - 1) * n + 1; //根据要查询的页计算从多少条开始查询
		req[2] = detail_step;
		var user = req[0]; //用户id
		var mon = req[3]; //月份
		var type = req[4]; //详单类型
		var show_index = 0; //本次要查询的页数在缓存的的位置index
		var show_key = user + "_" + mon + "_" + type + "_" + r; //本次要查询显示的缓存中的key值
		var cur_totalkey = mon + "_" + type;
		//如果当前
		var now_index = isEixstKeyInDtl(show_key);

		if (now_index != -1) { //如果缓存中有直接从缓存里取,取完后将这条放入顶部
			var k = getDtlKeyByIndex(now_index);
			var num = getDtlLenByIndex(now_index);
			var dd = getDtlDataByIndex(now_index);
			pushDtlData(k, num, dd);
			deleteDtlDataByIndex(now_index);
			succ(dd, dtlTotal[cur_totalkey], dtlStart[cur_totalkey], dtlEnd[cur_totalkey],dtlTime[cur_totalkey]);
		} else { //否则调接口
			ajaxGetDetailInfo(req, function(data, page) {
				if (typeof succ == 'function') {
					var _total = page.paging.totalNum;
					if (typeof _total == "undefined" || _total <= 0) {
						succ(null, 0);
					} else {
						var _data = data;
						dtlTotal[cur_totalkey] = _total;
						dtlStart[cur_totalkey] = page.paging.startDate;
						dtlEnd[cur_totalkey] = page.paging.endDate;
						dtlTime[cur_totalkey] = page.paging.sOperTime;
						var num = _data.length;
						var user = req[0];
						var oo = num % n
						var pages = num / n;
						var n_total = (r - 1) * n + num;
						if (n_total == _total) {
							pages += 1;
						}
						pages = (r - 1) + pages;
						for (i = r; i < pages; i++) {
							var cc = i - r;
							var arry = _data.slice(cc * n, (cc + 1) * n);
							var key = user + "_" + mon + "_" + type + "_" + i;
							var curror_len = detailInfo_key.length;
							if (curror_len == detailInfo_max) { //如果当前数组数量已经是最大限制数量则先删除最前面的一个（即最不常用的）
								deleteDtlDataByIndex(0);
							} else {
								var curror_index = isEixstKeyInDtl(key);
								if (curror_index != -1) { //如果当前要存储的key在缓存中已存在则先删除，再将新查回的数据放入缓存
									deleteDtlDataByIndex(curror_index);
								}
							}
							pushDtlData(key, arry.length, arry);
						}
						for (var i = detailInfo_key.length - 1; i >= 0; i--) {
							if (detailInfo_key[i] == show_key) {
								show_index = i;
								break;
							}
						}
						succ(detailInfo_data[show_index], dtlTotal[cur_totalkey], dtlStart[cur_totalkey], dtlEnd[cur_totalkey],dtlTime[cur_totalkey]);
					}
				}
			}, function(code, msg,sOperTime) {
				if (typeof fail == 'function')
					fail(code, msg,sOperTime);
			}, function(code, msg,sOperTime) {
				if (typeof error == 'function')
					error(code, msg,sOperTime);
			});
		}
	};
	//modify by fenghy@20170221    详单弹出框短信验证码
	var sendSmsVec = function(req, succ, fail,error) {
		ajaxSendSmsVec(req, function() {
			if (typeof succ == 'function') {
				succ();
			}
		}, function(code, msg) {
			if (typeof fail == 'function')
				fail(code, msg);
		},function (code,msg) {
			if(typeof error == 'function'){
				error(code,msg);
			}
		});
	};
	var submitDetailVec = function(req, succ, fail) {
		var myDate = new Date();
		ajaxSubmitSmsVec(req, function(data) {
			var item={"funCode":"010","userAccountID":req.user_id,"operDesc":"/v1/fee/detailbilltempidentjsonp/"+req.user_id,'param':JSON.stringify(data),"startTime":myDate};
			stclog.info(null,item);
			if (typeof succ == 'function') {

				succ(data);
			}
		}, function(code, msg) {
			var item={"funCode":"010","userAccountID":req.user_id,"operDesc":"/v1/fee/detailbilltempidentjsonp/"+req.user_id,'param':JSON.stringify(msg),"startTime":myDate};
			stclog.info(null,item);
			if (typeof fail == 'function')
				fail(code, msg);
		},function (request,status) {
			var item={"funCode":"010","userAccountID":req.user_id,"operDesc":"/v1/fee/detailbilltempidentjsonp/"+req.user_id,'param':JSON.stringify(status),"startTime":myDate};
			stclog.info(null,item);
			if (typeof fail == 'function')
				fail("999999", '系统异常,请稍后再试');
		});
	};
	var cacheBillInfo = function(data, nowd, qryMon, user) {
		console.log("2131232131");
		console.log(qryMon);
		for (var i in data) {
			var d = data[i];
			var mon = d.billMonth;
			billInfo[user + "_" + mon] = [];
			billInfo[user + "_" + mon][0] = nowd;
			billInfo[user + "_" + mon][1] = d;
		}
		if (typeof billInfo[user + "_" + qryMon] != "undefined" && typeof billInfo[user + "_" + qryMon][1] != "undefined") {
			return billInfo[user + "_" + qryMon][1];
		} else {
			return null;
		}
	};
	//判断详单当前缓存中是否已有该key的数据,如有则返回该key的index，否则返回 -1 
	var isEixstKeyInDtl = function(key) {
		var show_index = -1;
		if (detailInfo_key.length > 0) {
			for (var i = detailInfo_key.length - 1; i >= 0; i--) {
				if (detailInfo_key[i] == key) {
					show_index = i;
					break;
				}
			}
			return show_index;
		} else {
			return show_index;
		}
	};
	//删除详单当前缓存数组中index索引的数据
	var deleteDtlDataByIndex = function(index) {
		detailInfo_key.splice(index, 1);
		detailInfo_total.splice(index, 1);
		detailInfo_data.splice(index, 1);
	};
	//将新的数据加到数组最后
	var pushDtlData = function(key, total, data) {
		detailInfo_key.push(key);
		detailInfo_total.push(total);
		detailInfo_data.push(data);
	};
	var getDtlKeyByIndex = function(index) {
		return detailInfo_key[index];
	};
	var getDtlLenByIndex = function(index) {
		return detailInfo_total[index];
	};
	var getDtlDataByIndex = function(index) {
		return detailInfo_data[index];
	};
	//add by zhouhong 20130922
	var ajaxGetBillInfo = function(req, succ, fail, error) {
		require(["commonutil"], function(ajaxUtil) {
			var url = "/v1/fee/billinfo/" + req[0];
			ajaxUtil.GET(url, {
				bgnMonth: req[2],
				endMonth: req[3]
			}, succ, fail, error, billCodePara);
		})
	};
	var ajaxGetDetailInfo = function(req, succ, fail, error) {
			require(["commonutil"], function(ajaxUtil) {
				// var url = "/v1/fee/detailbillinfojsonp/15901263942";
				var url = "/v1/fee/detailbillinfojsonp/" + req[0];
				ajaxUtil.HTTPSGET(url, {
				//ajaxUtil.GET(url, {
					curCuror: req[1],
					step: req[2],
					qryMonth: req[3],
					billType: req[4]
				}, succ, fail, error, detailBillCodePara);
			});
		};
		//发送短信随机码   modify by fenghy@20170221  接口变化
		var ajaxSendSmsVec = function(req, succ, fail,error) {
			require(["commonutil"], function(ajaxUtil) {
				var url = "/v1/fee/detbillrandomcodejsonp/" + req.userPhone;
				ajaxUtil.HTTPSGET(url,{}, succ, fail,error);
			})
		};
		var deleteOrderRecord = function(req,succ,fail,err){
		ajaxUtil.POST('v1/pay/deleteorder/'+req.user_id,{"orderId":req.order_id,"payDate":req.qry_date,"channel":req.channel},succ,fail,err);
	};
	//详单认证服务密码与短信验证码
	var ajaxSubmitSmsVec = function(req, succ, fail, error) {
		require(["commonutil"], function(ajaxUtil) {
			//var url = "v1/fee/detailbillinfo/"+req[0];
			var url = "/v1/fee/detailbilltempidentjsonp/" + req.user_id;
			ajaxUtil.HTTPSGET(url, {
//				ajaxUtil.GET(url, {
				pwdTempSerCode: base64encode(utf16to8(req.servcode)),
				pwdTempRandCode: base64encode(utf16to8(req.veccode)),
				captchaVal:req.imgcode
			}, succ, fail, error);
		});

	};
	//认证验证码
	/*  delete by zhouhong 20161229 改成调用后台接口进行认证
	var ajaxSubmitSmsVec = function(req, succ, fail) {
		require(["stclog"], function(stclog) {
			var myDate = new Date();
			var flag = false;
			var timer = window.setTimeout(function() {
				flag = true;
				fail("9999", "系统异常，请您稍后再试！");
			}, 10000);
			$.ajax({
				type: 'POST',
				url: req[0] + '/temporaryauthSMSandService.action',
				async: false,
				timeout: 100000,
				dataType: 'jsonp',
				jsonpCallback: "result",
				data: {
					account: req[1],
					servicePwd: req[2],
					smsPwd: req[3],
					accountType: req[4],
					backUrl: req[5],
					channelID: req[6],
					businessCode: req[7]
				},
				success: function(vecdata) {
					var item={"funCode":"010","userAccountID":req[1],"operDesc":req[0]+'/temporaryauthSMSandService.action','param':JSON.stringify(vecdata),"startTime":myDate};
					stclog.info(null,item);	
					if (!flag) {
						window.clearTimeout(timer);
						var code = vecdata.code;
						if ("0000" == vecdata.result) {
							succ(vecdata);
						} else {
							var msg = null;
							if ("8002" == code || "8001" == code) {
								msg = "用户名或者密码错误！";
							} else if ("2036" == code) {
								msg = "服务密码错误!";
							} else if ("3009" == code) {
								msg = "该平台尚未接入集团UAM,暂不能登录！";
							} else if ("3007" == code) {
								msg = "系统繁忙！";
							} else if ("3008" == code) {
								msg = "尊敬的用户，你的帐号存在异常情况，请联系客服！";
							} else if ("6001" == code || "6002" == code) {
								msg = "随机密码错误!";
							} else if ("8009" == code) {
								msg = "该帐号已被锁定，24小时后自动解锁！";
							} else {
								msg = "系统繁忙！";
							}
							fail(code, msg);
						}
					}
				},
				error: function(request, strStatus, thrown) {
					var item={"funCode":"010","userAccountID":req[1],"operDesc":req[0]+'/temporaryauthSMSandService.action','param':JSON.stringify(strStatus),"startTime":myDate};
					stclog.info(null,item);	
					alert("系统异常！");
					return;
				}
			});
		})
	}*/
	//暴露出去的接口，可在此js对象被按需加载后，调用此对象的接口
	return {
		getBillInfoHome: function(req, succ, fail) {
			getBillInfoHome(req, succ, fail);
		},
		getBillInfo: function(req, succ, fail, error) {
			getBillInfo(req, succ, fail, error);
		},
		getDetailInfo: function(req, succ, fail, error) {
			getDetailInfo(req, succ, fail, error);
		},
		sendSmsVec: function(req, succ, fail) {
			sendSmsVec(req, succ, fail);
		},
		submitDetailVec: function(req, succ, fail) {
			submitDetailVec(req, succ, fail);
		},
		deleteOrderRecord: function(req, succ, fail, err) {
			deleteOrderRecord(req, succ, fail, err);
		}
	}
})