    # -*- encoding: utf-8 -*-
"""
@Author:   ZhangXieChuan
@Time:     2017/9/18 9:59
@Contact:  1247375074@qq.com 
@Software: PyCharm
"""
import os

BASE_JSON_PATH = './JSON/'

class Parser:
    def __init__(self, mobile):
        self.json_path = BASE_JSON_PATH + str(mobile) + '/'
        self.package_files = []  # 套餐及固定费用
        self.communit_files = []  # 通话详单
        self.network_files = []  # 上网详单
        self.shortmsg_files = []  # 短信和彩信详单

        self.userinfo_files = []
        self.billqry_files = []  # 账单查询
        self.feehsty_files = []

        for f in os.listdir(self.json_path):
            f = self.json_path + f
            if 'billtype01' in f:
                self.package_files.append(f)
            elif 'billtype02' in f:
                self.communit_files.append(f)
            elif 'billtype03' in f:
                self.network_files.append(f)
            elif 'billtype04' in f:
                self.shortmsg_files.append(f)
            elif 'personinfo' in f:
                self.userinfo_files.append(f)
            elif 'billqry' in f:
                self.billqry_files.append(f)
            elif 'feehistory' in f:
                self.feehsty_files.append(f)


    def userInfo(self):
        """
         "data": {
        "status": "00",
        "remark": null,
        "starLevel": "3",
        "name": "**川",
        "level": "100",
        "netAge": "5年2个月",
        "brand": "03",
        "inNetDate": "20120730235959",
        "zipCode": null,
        "contactNum": "",
        "realNameInfo": "2",
        "address": "",
        "vipInfo": null,
        "starTime": "20180731",
        "email": "",
        "starScore": "143"
    },
        """

        data = {
            'phone_location',
            'username',
            'userstatus',
            'userlv',
            'phone_brand',
            'phone_package',
            'phone_starttime',
            'phone_surfingtime',
            'identitystatus',
            'phone_starlv',
            'phone_starscore',
            'phone_star_validity',
            'phone_num',
            'useremail',
            'userpostcode',
            'useradd'
        }

    def startParser(self):
        pass