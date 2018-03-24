# -*- encoding: utf-8 -*-
"""
@Author:   ZhangXieChuan
@Time:     2017/8/28 15:29
@Contact:  1247375074@qq.com 
@Software: PyCharm
"""

import requests
import time
import json
import random
import execjs
import datetime as dt
from PIL import Image

from tools import *
from handle_response import HandleResponse

JS_PATH = './doc/encrypt.js'
JS_COMPILED = compile_js(JS_PATH)
def run_jsfunc(func_name, data):
    return JS_COMPILED.call(func_name, data)

CAPTCHA_PATH = './captcha/'
QUERY_JSON_PATH = './jSON/'

s = requests.session()

class CmccShop:
    def __init__(self, session, mobile, servercode):
        self.s = session
        self.mobile = str(mobile)
        self.server_code = str(servercode)
        self.main_url = ''

        self.baseheader = {
            # 'Host': 'shop.10086.cn',
            # 'Accept-Language': 'zh-CN,zh;q=0.8',
            # 'Connection': 'keep-alive',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
        }
        try:
            os.mkdir(QUERY_JSON_PATH+self.mobile)
        except:
            pass
        self.downpath = QUERY_JSON_PATH + self.mobile + '/'

    def _getArtifact(self, artifact='-1', back_url=None):
        # res0 = self.s.get("http://login.10086.cn:443", headers={
        #     'Host': 'login.10086.cn:443',
        #     'Connection': 'keep-alive',
        #     'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
        # })
        if not back_url:
            back_url = 'http://shop.10086.cn/i/?f=home'
        url = 'http://shop.10086.cn/i/v1/auth/getArtifact?artifact=%s&backUrl=%s' % (artifact, back_url)
        header = {
            'Upgrade-Insecure-Requests': '1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': back_url,
        }
        header.update(self.baseheader)
        res = self.s.get(url, headers=header)
        # 因为返回的时302，会自动跳转到新地址。所以下面的代码没什么意义
        artifact_url = res.headers.get('Location', '')
        if artifact_url:
            return artifact_url
        # TODO: else ?
        else: # 自动跳转到验证页面，不需要处理
            return res.url

    def _getSomeCookie(self):
        """
        获取必要的cookies字段，比如：  captchaCode, rdmdmd5
        """
        url = 'https://login.10086.cn/captchazh.htm?type=12&timestamp=' + nowTimestamp()
        header = {
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'Host': 'login.10086.cn',
            'Referer': 'https://login.10086.cn/login.html',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
        }
        self.s.get(url, headers=header)
        print 'have get some cookies need.'

    def _getJsessionid(self):
        """
        获取cookies中jsessionid-echd-cpt-cmcc-jt的值
        :return:
        """
        url = 'http://shop.10086.cn/i/v1/auth/loginfo?_=' + nowTimestamp()
        header = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cache-Control': 'no-store, must-revalidate',
            'Content-Type': '*',
            'expires': '0',
            'Host': 'shop.10086.cn',
            'If-Modified-Since': '0',
            'pragma': 'no-cache',
            'Proxy-Connection': 'keep-alive',
            'Referer': 'http://shop.10086.cn/i/?f=home',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        }
        self.s.get(url, headers=header)
        print 'have get jsecssionid ..'

    def _sendSmsPwd(self):
        url = 'https://login.10086.cn/sendRandomCodeAction.action'
        data = {
            'userName': self.mobile,
            'type': '01',
            'channelID': '12003'
        }
        header = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding':'gzip, deflate, br',
            'Content-Length':'44',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'Host':'login.10086.cn',
            'Origin':'https://login.10086.cn',
            'Referer':'https://login.10086.cn/login.html',
            'X-Requested-With':'XMLHttpRequest'
        }
        header.update(self.baseheader)
        self.s.post(url, data=data, headers=header)
        print "[*] have sent sms password."

    def login(self, cookies=None, save_cookie=True):
        """
        1. 登录失败，就同时需要服务密码和短信验证码来完成登录
        2. cookies中没有verifyCode等字段时，需要短信验证码才能登录
        """
        # login_home = self.getArtifact('http://shop.10086.cn/i/?f=billdetailqry')
        # login_home = 'https://login.10086.cn/login.html?channelID=12003&backUrl=http://shop.10086.cn/i/?f=billdetailqry'
        # login_home = 'http://shop.10086.cn/i/?f=home'
        # login_page = 'https://login.10086.cn/login.html'
        # res0 = self.s.get(login_page, headers=self.baseheader)
        # write2html('./doc/login_page.html', res0.text)
        # start try to login
        URL = '  '
        query_string = {
            'accountType': '01',
            'account': self.mobile,
            'password': self.server_code,
            'pwdType': '01',
            'smsPwd': '',
            'inputCode': '',
            'backUrl': 'http://shop.10086.cn/i/?f=home',
            'rememberMe': '0',
            'channelID': '12003',
            'protocol': 'https:',
            'timestamp': nowTimestamp()
        }
        header = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'login.10086.cn',
            'Referer': 'https://login.10086.cn/login.html',
            'X-Requested-With': 'XMLHttpRequest'
        }
        header.update(self.baseheader)

        if cookies and self.mobile in cookies.get('userinfokey', ''):
            response = self.s.get(URL, params=query_string, headers=header, cookies=cookies)
        # elif s.cookies.get('verifyCode', ''):
        #     response = self.s.get(URL, params=query_string, headers=header)
        else: # 有cookies直接用服务密码登录，否则要加上短信验证码.关键需要有 userinfoKey, verifyCode两个字段
            self._sendSmsPwd()
            smsPwd = raw_input('please input sms password:')
            query_string['smsPwd'] = smsPwd
            response = self.s.get(URL, params=query_string, headers=header)

        if response.json()['code'] == "0000":
            # 需要短信验证码 u'{"code":"6002","desc":"短信随机码不正确或已过期，请重新获取","islocal":false,"result":"8"}'
            # 验证码错误{"assertAcceptURL":"http://shop.10086.cn/i/v1/auth/getArtifact","code":"2036","desc":"您的账户名与密码不匹配，请重新输入","islocal":false,"result":"2"}
            # 认证成功 {"artifact":"d76ca51ae1434d5fa657984a5c3661c8","assertAcceptURL":"http://shop.10086.cn/i/v1/auth/getArtifact","code":"0000","desc":"认证成功","islocal":false,"provinceCode":"200","result":"0","uid":"0757dd8bc55e40268167193e183b7b8d"}
            print '[*] login successful!'

            # get some cookies need
            location = self._getArtifact(artifact=response.json()['artifact'])
            self._getSomeCookie()
            self.main_url = location
            self._getJsessionid()

            if save_cookie:
                saveCookies('data/login_cookies.json', self.s)

        else:
            print '[!!] faied to login..'

    def _loginSecondIndex(self):
        url = 'http://shop.10086.cn/i/apps/serviceapps/billdetail/showvec.html'
        header = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'Host': 'shop.10086.cn',
            'Referer': self.main_url,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
        }
        self.s.get(url, headers=header)

    def _getAuthImg(self):
        """
        获取图片验证码
        """
        url = 'http://shop.10086.cn/i/authImg?t=' + str(random.random())
        header = {
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            'Host': 'shop.10086.cn',
            'Proxy-Connection': 'keep-alive',
            'Referer': 'http://shop.10086.cn/i/?f=home'
        }
        header.update(self.baseheader)
        res = self.s.get(url, headers=header)
        if res.ok:
            print '[*] successful got auth img.'

            captcha_path = CAPTCHA_PATH + nowTimestamp() + '.png'
            # download picture .注意'wb'，并且要使用 res.content， res.text时unicode编码的不能用
            with open(captcha_path, 'wb') as f:
                f.write(res.content)

            return captcha_path
        else:
            print '[!!] faied to get auth img.'
            return ''

    def _checkAuthImg(self, file_path):
        # open image
        img = Image.open(file_path)
        img.show()

        captcha = raw_input('please input captcha code >>')
        url = 'http://shop.10086.cn/i/v1/res/precheck/%s?captchaVal=%s&_=%s' % (self.mobile, captcha, nowTimestamp())
        header = {
            'Host': 'shop.10086.cn',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-store, must-revalidate',
            'pragma': 'no-cache',
            'Content-Type': '*',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'If-Modified-Since': '0',
            'expires': '0',
            'Referer': 'http://shop.10086.cn/i/?f=home',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            # Cookie: ssologinprovince=200; jsessionid-echd-cpt-cmcc-jt=DBDE04A7FE46B794C068D03306A6DFA3; CaptchaCode=BprMWB; is_login=true; userinfokey=%7b%22loginType%22%3a%2201%22%2c%22provinceName%22%3a%22200%22%2c%22pwdType%22%3a%2201%22%2c%22userName%22%3a%2218819477283%22%7d; loginName=18819477283; c=0757dd8bc55e40268167193e183b7b8d; verifyCode=74f2c3e3dd08ccc27a8698fec4a76727fb6cafdc; WT_FPC=id=20d722d6e635d2f69f91504088871246:lv=1504089056295:ss=1504088871246; CmLocation=200|200; CmProvid=bj
        }
        header.update(self.baseheader)

        res = self.s.get(url, headers=header)
        if res.json()['retCode'] == '000000':
            print res.json()['retMsg']
            os.rename(file_path, CAPTCHA_PATH+captcha+'.png')
            return captcha
        else:
            print res.json()
            self._getAuthImg()
            self._checkAuthImg()

    def _handleJsonp(self, retdata, func_name=None):
        """
        处理跨域请求返回的数据.首先应该先判断一下是否是json格式。一般来说，访问异常时，没有构造jsonp，也就是直接返回json，
        访问成功，才需要做下面的处理
        :param retdata: response.content,字符串
        :param func_name: callback函数名
        :return:
        """
        func_name_len = len(func_name)+1 if func_name else len('null(')
        return json.loads(retdata[func_name_len: -1])

    def _getSmsCodeSecondTime(self):
        """
        二次验证的时候发验证码
        """
        url = 'https://shop.10086.cn/i/v1/fee/detbillrandomcodejsonp/%s?_=%s' % (self.mobile, nowTimestamp())
              # 'callback=jQuery183031269133559487927_1504089056211&_=1504089285141'

        header = {
            'Host': 'shop.10086.cn',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36,',
            'Accept': '*/*',
            'Referer': 'http://shop.10086.cn/i/?f=home',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8'
            # Cookie: ssologinprovince=200; jsessionid-echd-cpt-cmcc-jt=DBDE04A7FE46B794C068D03306A6DFA3; CaptchaCode=BprMWB; cmccssotoken=0757dd8bc55e40268167193e183b7b8d@.10086.cn; is_login=true; userinfokey=%7b%22loginType%22%3a%2201%22%2c%22provinceName%22%3a%22200%22%2c%22pwdType%22%3a%2201%22%2c%22userName%22%3a%2218819477283%22%7d; loginName=18819477283; c=0757dd8bc55e40268167193e183b7b8d; verifyCode=74f2c3e3dd08ccc27a8698fec4a76727fb6cafdc; WT_FPC=id=20d722d6e635d2f69f91504088871246:lv=1504089056295:ss=1504088871246; CmLocation=200|200; CmProvid=bj
        }
        # jQuery183031269133559487927_1504089056211({"data":null,"retCode":"000000","retMsg":"success","sOperTime":null})
        # print 'have sendSmsForSecondLogin, result:', res.json()
        # null({"data":null,"retCode":"500003","retMsg":"session信息为空，请先登录!","sOperTime":null})
        res = HandleResponse(self.s.get(url, headers=header))
        resjson = res.getJson()
        if resjson['retCode'] == '000000':
            print 'success send sms code 2nd time!'
            smscode = raw_input('please input sms code>>')
            return smscode
        else:
            print 'faied to send sms code:', resjson
            return ''

    def loginSecondTime(self):
        auth_path = self._getAuthImg()
        captcha = self._checkAuthImg(auth_path)
        sms_code = self._getSmsCodeSecondTime()
        # 加密服务密码和短信验证码
        sercode2 = run_jsfunc('base64encode', run_jsfunc('utf16to8', self.server_code))
        smscode2 = run_jsfunc('base64encode', run_jsfunc('utf16to8', sms_code))

        url = 'https://shop.10086.cn/i/v1/fee/detailbilltempidentjsonp/%s?pwdTempSerCode=%s&' \
              'pwdTempRandCode=%s&captchaVal=%s&_=%s' % (self.mobile, sercode2, smscode2, captcha, nowTimestamp())

        header = {
            'Host': 'shop.10086.cn',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'Accept': '*/*',
            'Referer': 'http://shop.10086.cn/i/?f=home',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            #Cookie: ssologinprovince=200; jsessionid-echd-cpt-cmcc-jt=DBDE04A7FE46B794C068D03306A6DFA3; CaptchaCode=BprMWB; cmccssotoken=0757dd8bc55e40268167193e183b7b8d@.10086.cn; is_login=true; userinfokey=%7b%22loginType%22%3a%2201%22%2c%22provinceName%22%3a%22200%22%2c%22pwdType%22%3a%2201%22%2c%22userName%22%3a%2218819477283%22%7d; loginName=18819477283; c=0757dd8bc55e40268167193e183b7b8d; verifyCode=74f2c3e3dd08ccc27a8698fec4a76727fb6cafdc; WT_FPC=id=20d722d6e635d2f69f91504088871246:lv=1504089056295:ss=1504088871246; CmLocation=200|200; CmProvid=bj
        }

        res = HandleResponse(self.s.get(url, headers=header))
        resjson = res.getJson()
        if resjson['retCode'] == '000000':
            print 'login second time successful!'
        else:
            print resjson


    def qryMonthDetail(self, month, bill_type):
        url = 'https://shop.10086.cn/i/v1/fee/detailbillinfojsonp/' + self.mobile
              #'curCuror=1&step=100&qryMonth=201707&billType=02&_=1504089276318'
        parsms = {
            'curCuror': '1',
            'step': '100',
            'qryMonth': month,
            'billType': bill_type,
            '_': nowTimestamp()
        }
        header = {
            'Host': 'shop.10086.cn',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'Accept': '*/*',
            'Referer': 'http://shop.10086.cn/i/?f=home',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            #Cookie: ssologinprovince=200; jsessionid-echd-cpt-cmcc-jt=DBDE04A7FE46B794C068D03306A6DFA3; CaptchaCode=BprMWB; cmccssotoken=0757dd8bc55e40268167193e183b7b8d@.10086.cn; is_login=true; userinfokey=%7b%22loginType%22%3a%2201%22%2c%22provinceName%22%3a%22200%22%2c%22pwdType%22%3a%2201%22%2c%22userName%22%3a%2218819477283%22%7d; loginName=18819477283; c=0757dd8bc55e40268167193e183b7b8d; verifyCode=74f2c3e3dd08ccc27a8698fec4a76727fb6cafdc; WT_FPC=id=20d722d6e635d2f69f91504088871246:lv=1504089056295:ss=1504088871246; CmLocation=200|200; CmProvid=bj
        }
        res = HandleResponse(self.s.get(url, params=parsms, headers=header))
        resjson = res.getJson()
        # {"retCode":"500003","retMsg":"not login.but must login.sso flag."}
        # {"retCode":"000000","retMsg":"get data from cache success","sOperTime":"20170830183602"}
        # {u'sOperTime': None, u'data': None, u'retCode': u'520001', u'retMsg': }
        # {u'sOperTime': u'20170914154206', u'data': [], u'retCode': u'2039', u'retMsg': u'您选择时间段没有详单记录哦'}
        if resjson['retCode'] == '000000':
            print 'query bill %s %s successful !' % (bill_type, month)
            path = '%sm%s_billdetail%s_billtype%s.json' % (self.downpath, self.mobile, month, bill_type)
            dumpJson(path, resjson)
        else:
            print 'query bill error:', month, bill_type, resjson

    def queryAllBillDetail(self):
        """
        查询所有详单
        :return:
        """
        # bill_types = ['01', '02', '03', '04', '05', '06', '07']
        bill_types = ['01', '02', '03', '04']
        today = dt.datetime.today()
        # 待查询的月份（半年）
        months = [today.strftime('%Y%m')]
        next = today
        for i in range(5):
            if today.day == 31:
                delta = 31
            elif today.month == 3 and today.day <= 2:
                delta = 28
            else:
                delta = 30
            next = next - dt.timedelta(delta)
            months.append(next.strftime("%Y%m"))

        for billtype in bill_types:
            for month in months:
                self.qryMonthDetail(month, billtype)
                time.sleep(3)

        print '[x] all bill detail query done!'

    def qryCustInfo(self):
        """
        查询个人信息
        在直接从登录页登录进来以后，个人信息的url为：
        http://shop.10086.cn/i/v1/cust/mergecust/18819477283?_=1518160228928

        其实是，三种方式都可以用
        """
        brand_url = 'http://shop.10086.cn/i/v1/busi/plan/%s?_=%s' % (self.mobile, nowTimestamp())
        info_url = 'http://shop.10086.cn/i/v1/cust/info/%s?_=%s' % (self.mobile, nowTimestamp())
        header = {
            'Host': 'shop.10086.cn',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-store, must-revalidate',
            'pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'Content-Type': '*',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'If-Modified-Since': '0',
            'expires': '0',
            'Referer': self.main_url,
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            # Cookie: ssologinprovince=200; PHPSESSID=m701v9u7698ko99c6qv414soa4; jsessionid-echd-cpt-cmcc-jt=12D0889FE8FE2E53E85B82C6C05E1EB6; CaptchaCode=SGJyOE; is_login=true; userinfokey=%7b%22loginType%22%3a%2201%22%2c%22provinceName%22%3a%22200%22%2c%22pwdType%22%3a%2201%22%2c%22userName%22%3a%2218819477283%22%7d; loginName=18819477283; c=bf823e9d2ac74992aac7ee15db2cdf48; verifyCode=74f2c3e3dd08ccc27a8698fec4a76727fb6cafdc; WT_FPC=id=215a69228ded33b1c4d1504593164640:lv=1504603714438:ss=1504603700654; CmLocation=200|200; CmProvid=bj
        }
        # {"data":{"remark":null,"brandId":"03","brandName":"动感地带","curPlanId":"prod.10086000004473","curPlanName":"18元4G飞享套餐青春版","nextPlanId":"prod.10086000004473","nextPlanName":"18元4G飞享套餐青春版","startTime":null,"endTime":null},"retCode":"000000","retMsg":"成功","sOperTime":"20170905173544"}
        # {"data":{"remark":null,"name":"**川","brand":"03","level":"100","status":"00","inNetDate":"20120730235959","netAge":"5年2个月","email":"","address":"","zipCode":null,"contactNum":"","starLevel":"3","starScore":"143","starTime":"20180731","realNameInfo":"2","vipInfo":null},"retCode":"000000","retMsg":"成功","sOperTime":"20170905173546"}

        res1 = HandleResponse(self.s.get(brand_url, headers=header))
        res2 = HandleResponse(self.s.get(info_url, headers=header))

        res1.download( '%sm%s_personinfo_busiplan.json' % (self.downpath, self.mobile))
        res2.download( '%sm%s_personinfo_custinfo.json' % (self.downpath, self.mobile))
        print '[x] all user personal info query done!'

    def feeHistory(self):
        """
        交费记录查询
        :return:
        """
        starttime = (dt.date.today() - dt.timedelta(365)).strftime('%Y%m%d')
        endtime = dt.date.today().strftime('%Y%m%d')
        url = 'http://shop.10086.cn/i/v1/cust/his/%s?startTime=%s&endTime=%s&_=%s' % (self.mobile, starttime, endtime, nowTimestamp())
        header = {
            'Host': 'shop.10086.cn',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-store, must-revalidate',
            'pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'Content-Type': '*',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'If-Modified-Since': '0',
            'expires': '0',
            'Referer': self.main_url,
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8'
        }
        res = HandleResponse(self.s.get(url, headers=header))
        res.download('%sm%s_feehistory.json' % (self.downpath, self.mobile))
        print '[x] fee history query done!'

    def billQuery(self):
        """
        账单查询
        :return:
        """
        fee_real = 'http://shop.10086.cn/i/v1/fee/real/%s?_=%s' % (self.mobile, nowTimestamp())
        point_sum = 'http://shop.10086.cn/i/v1/point/sum/%s?_=%s' % (self.mobile, nowTimestamp())
        bill_info = 'http://shop.10086.cn/i/v1/fee/billinfo/%s?_=%s' % (self.mobile, nowTimestamp())
        header = {
            'Host': 'shop.10086.cn',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-store, must-revalidate',
            'pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'Content-Type': '*',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'If-Modified-Since': '0',
            'expires': '0',
            'Referer': self.main_url,
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8'
        }
        res1 = HandleResponse(self.s.get(fee_real, headers=header))
        res2 = HandleResponse(self.s.get(point_sum, headers=header))
        res3 = HandleResponse(self.s.get(bill_info, headers=header))

        res1.download('%sm%s_billqry_feereal.json' % (self.downpath, self.mobile))
        res2.download('%sm%s_billqry_pointsum.json' % (self.downpath, self.mobile))
        res3.download('%sm%s_billqry_billinfo.json' % (self.downpath, self.mobile))
        print '[x] bill query done!'

    def testUrl(self, url):
        return self.s.get(url, headers=self.baseheader)

    def getSession(self):
        return self.s
    def _qryNumArea(self):
        url = 'http://shop.10086.cn/i/v1/res/numarea/15876167653?_=1504254271347'

def main(mobile, server_code):
    cookies = loadCookies('data/login_cookies1.json')
    my = CmccShop(s, mobile, server_code)
    # my = CmccShop(s, 15876167653, 21841123)
    # my.getArtifact()
    my.login(cookies=cookies, save_cookie=False)
    # my._getJsessionid()
    # my._loginSecondIndex()
    # my._getSmsCodeSecondTime()
    my.loginSecondTime()
    print '======== start parser =========='
    my.queryAllBillDetail()
    my.qryCustInfo()
    my.billQuery()
    my.feeHistory()

if __name__ == '__main__':
    main(18819477283, 407083)