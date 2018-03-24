# -*- encoding: utf-8 -*-
"""
@Author:   ZhangXieChuan
@Time:     2017/8/9 16:30
@Contact:  1247375074@qq.com 
@Software: PyCharm
"""
import time
import json
import requests

def write2html(filepath, html):
    with open(filepath, 'w') as f:
        f.write(html)

def dump2json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, encoding='utf-8')
def load4json(filename):
    with open(filename, 'r') as f:
        json.load(f)

session = requests.session()


class CMCC:
    def __init__(self, session, mobile):
        # self.s = requests.session()
        self.s = session
        self.mobile = str(mobile)

    def getSmsPwd(self):
        header = {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, br',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            #'Cookie':'_gscu_1502255179=02270670suxdiz63; JSESSIONID=0000lZj-F3mwDN_qLfoehPmMuOd:1b413u40e; BIGipServerng3dmz_sso=213515274.14596.0000',
            'Host':'gd.ac.10086.cn',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
        }

        url = "https://gd.ac.10086.cn/ucs/ucs/weblogin.jsps?backURL=http://gd.10086.cn/my/REALTIME_LIST_SEARCH.shtml"

        response = self.s.get(url, headers=header)
        print '[x] home page: ',response.status_code, response.ok
        # assert response.ok == True
        # write2html('doc/index.html', response.content)

        get_sms_code_url = "https://gd.ac.10086.cn/ucs/ucs/getSmsCode.jsps"
        post_header = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding':'gzip, deflate, br',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Connection':'keep-alive',
            'Content-Length':'18',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            #'Cookie':'_gscu_1502255179=02270670suxdiz63; JSESSIONID=0000lZj-F3mwDN_qLfoehPmMuOd:1b413u40e; BIGipServerng3dmz_sso=213515274.14596.0000',
            'Host':'gd.ac.10086.cn',
            'Origin':'https://gd.ac.10086.cn',
            'Referer':'https://gd.ac.10086.cn/ucs/ucs/weblogin.jsps?backURL=http://gd.10086.cn/my/REALTIME_LIST_SEARCH.shtml',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'X-Requested-With':'XMLHttpRequest'
        }
        self.s.post(get_sms_code_url, data={'mobile': self.mobile}, headers=post_header)
        print '[x] have get sms pwd'

    def postSmsPwd(self):
        smspwd = raw_input('please input smspwd:')
        post_smscode_url = "https://gd.ac.10086.cn/ucs/ucs/webForm.jsps"
        post_smscode_header = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding':'gzip, deflate, br',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Connection':'keep-alive',
            'Content-Length':'127',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            #'Cookie':'_gscu_1502255179=02270670suxdiz63; JSESSIONID=0000lZj-F3mwDN_qLfoehPmMuOd:1b413u40e; BIGipServerng3dmz_sso=213515274.14596.0000',
            'Host':'gd.ac.10086.cn',
            'Origin':'https://gd.ac.10086.cn',
            'Referer':'https://gd.ac.10086.cn/ucs/ucs/weblogin.jsps?backURL=http://gd.10086.cn/my/REALTIME_LIST_SEARCH.shtml',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            'X-Requested-With':'XMLHttpRequest',
        }
        post_smscode_data = {
            'mobile': self.mobile,
            'smsPwd': smspwd,
            'loginType': '1',
            'cookieMobile': 'on',
            'backURL': 'http://gd.10086.cn/my/REALTIME_LIST_SEARCH.shtml'
        }
        self.s.post(post_smscode_url, data=post_smscode_data, headers=post_smscode_header)

    def queryIndex(self):
        header = {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Connection':'keep-alive',
            #'Cookie':'CmLocationB=; _gscu_1502255179=02270670suxdiz63; WT_FPC=id=2bd587c58419acd68fc1502270670406:lv=1502272208448:ss=1502270670406; _t_y_t_b_ip=218.17.206.98; _a_h_b_c=GD; appId=501143; token=5011430810110338dhgIhREFBirerL2Q; ST=20170810110338GOKkI4NL2aeCb0JtmT; _st=20170810110338GOKkI4NL2aeCb0JtmT; _a_m_b_b=18819477283~GZ~3; UC=20170810110338GOKkI4NL2aeCb0JtmT&1&&18819477283&BrandMzone&200',
            'Host':'gd.10086.cn',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
        }
        self.s.get('http://gd.10086.cn/my/REALTIME_LIST_SEARCH.shtml', headers=header)

    def queryMonth(self, month):
        """
        :param month: 格式为 201703 这种
        :return:
        """
        get_tag_header = {
            'Host':'gd.10086.cn',
            'Connection':'keep-alive',
            'Accept':'*/*',
            'Origin':'http://gd.10086.cn',
            'X-Requested-With':'XMLHttpRequest',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
            'Referer':'http://gd.10086.cn/my/REALTIME_LIST_SEARCH.shtml',
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'zh-CN,zh;q=0.8',
            #'Cookie':'appId=501143; token=5011430809180442uQTHtiuDsHzIcPl9; ST=20170809180442MHGNfNNSuVc6knSdzE; UC=20170809180442MHGNfNNSuVc6knSdzE&2&&18819477283&BrandMzone&200; CmLocationB=; _gscu_1502255179=02272989pvn1b226; _gscs_1502255179=02272989tar08d26|pv:3; _gscbrs_1502255179=1; WT_FPC=id=29e755b39c7ac4593e21502272989740:lv=1502273082049:ss=1502272989740; _t_y_t_b_ip=218.17.206.98; JSESSIONID=0000CiGvigTaLce8b_HU0LOomQx:1b48hmide; _st=20170809180442MHGNfNNSuVc6knSdzE; CmWebtokenid=18819477283,gd; _a_m_b_b=18819477283~GZ~3; _a_h_b_c=GZ; BIGipServerng3dmz_web=79297546.14596.0000',
            'Content-Length':'12'
        }
        get_tag_url = 'http://gd.10086.cn/commodity/servicio/nostandardserv/realtimeListSearch/query.jsps'
        response = self.s.post(get_tag_url, data={'month': month}, headers=get_tag_header)
        data = response.json()
        # TODO: how to handle exception
        tmpdata = {}
        for item in data['attachment']:
            tmpdata[item['name']] = item['value']

        uniqueTag = tmpdata['rand']

        query_url = 'http://gd.10086.cn' + tmpdata['uri'] + '?uniqueTag=' + uniqueTag

        def postQuery():
            url = 'http://gd.10086.cn/commodity/servicio/nostandardserv/realtimeListSearch/ajaxRealQuery.jsps'
            data = {
                'startTimeReal': '',
                'endTimeReal': '',
                'uniqueTag': uniqueTag,
                'month':'',
                'monthListType': '0',
                'isChange':''
            }
            header = {
                'Host':'gd.10086.cn',
                'Connection':'keep-alive',
                'Accept':'*/*',
                'Origin':'http://gd.10086.cn',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Referer': query_url,
                'Accept-Encoding':'gzip, deflate',
                'Accept-Language':'zh-CN,zh;q=0.8',
                # 'Cookie':'appId=501143; token=5011430809180442uQTHtiuDsHzIcPl9; ST=20170809180442MHGNfNNSuVc6knSdzE; UC=20170809180442MHGNfNNSuVc6knSdzE&2&&18819477283&BrandMzone&200; CmLocationB=; _gscu_1502255179=02272989pvn1b226; _gscs_1502255179=02272989tar08d26|pv:3; _gscbrs_1502255179=1; WT_FPC=id=29e755b39c7ac4593e21502272989740:lv=1502273082049:ss=1502272989740; _t_y_t_b_ip=218.17.206.98; JSESSIONID=0000CiGvigTaLce8b_HU0LOomQx:1b48hmide; BIGipServerng3dmz_web=79297546.14596.0000; WT_FPC=id=29e755b39c7ac4593e21502272989740:lv=1502273428485:ss=1502272989740; _st=20170809180442MHGNfNNSuVc6knSdzE; CmWebtokenid=18819477283,gd; _a_m_b_b=18819477283~GZ~3; _a_h_b_c=GZ',
                'Content-Length':'88'
            }
            result = self.s.post(url, data=data, headers=header).json()
            return result

        result = postQuery()
        dump2json('./data/+' + month+'.json', result)


    def extractCall(self, month):
        """
        提取通话记录
        :param month: eg: '201707'
        :return:  [[xx, xx, xx], [xx, xx, xx], ...]
        """
        data = load4json('./data/+' + month + '.json')
        call = eval(data['content']['evalDataMapStr'].split(';')[1][19:-1])['data']
        return call

if __name__ == "__main__":
    my = CMCC(18819477283)
    my.getSmsPwd()
    time.sleep(5) # 这个
    my.postSmsPwd()
    #my.queryIndex()
    time.sleep(5)
    my.queryMonth('201707')