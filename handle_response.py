# -*- encoding: utf-8 -*-
"""
@Author:   ZhangXieChuan
@Time:     2017/9/13 14:29
@Contact:  1247375074@qq.com 
@Software: PyCharm
"""

import json
from tools import dumpJson

class HandleResponse:
    def __init__(self, response):
        self.response = response

    def isJson(self):
        try:
            if isinstance(self.response.json(), dict):
                return True
            else:
                return False
        except:
            print 'try response.json error..'
            return False

    def isJsonp(self, callback_name=None):
        pass
        content = self.response.content
        if isinstance(content, str):
            func_name = callback_name if callback_name else 'null'
            if content[:len(func_name)] == func_name:
                return True
            else:
                print 'callback function name can not match, the content is: \n', content
                return False
        else:
            print 'response.content is not str. the content is: \n', content
            return False

    def jsonpToJson(self, callback_name=None):
        func_name = callback_name if callback_name else 'null'
        return json.loads(self.response.content[len(func_name)+1: -1])

    def getJson(self):
        if self.isJson():
            return self.response.json()
        elif self.isJsonp():
            data = self.jsonpToJson()
            return data
        else:
            print "get json error "

    def download(self, path):
        if self.isJson():
            dumpJson(path, self.response.json())
        elif self.isJsonp():
            data = self.jsonpToJson()
            dumpJson(path, data)
        else:
            print "can't download successfully"

    def parseUserInfo(self):
        pass