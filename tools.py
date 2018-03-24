# -*- encoding: utf-8 -*-
"""
@Author:   ZhangXieChuan
@Time:     2017/9/4 18:18
@Contact:  1247375074@qq.com 
@Software: PyCharm
"""
import json
import execjs
import time
import os


PHANTOMJS_PATH = 'D:/phantomjs-2.1.1-windows/bin/phantomjs.exe'

def nowTimestamp():
    return str(int(time.time() * 1000))
def write2html(filepath, html):
    with open(filepath, 'w') as f:
        f.write(html)
def saveCookies(filename, session):
    with open(filename, 'w') as f:
        json.dump(dict(session.cookies.items()), f)
        print '[*] success save cookies'

def loadCookies(filename):
    with open(filename) as f:
        return json.load(f)

def dumpJson(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f)
        print 'dump successfully'

def loadJson(filename):
    with open(filename, 'r') as f:
        json.load(f)


def compile_js(js_path, phantomjs_path=None):
    """
    :param path: 加密js的路径,注意js中不要使用中文！估计是pyexecjs处理中文还有一些问题
    :return: 编译后的js环境，不清楚pyexecjs这个库的用法的请在github上查看相关文档
    """
    # os.environ["EXECJS_RUNTIME"] = "phantomjs"
    # os.environ["PHANTOMJS_PATH"] = PHANTOMJS_PATH
    # phantom = execjs.get()  # 这里必须为phantomjs设置环境变量，否则可以写phantomjs的具体路径
    with open(js_path, 'r') as f:
        source = f.read()
    # return phantom.compile(source)
    return execjs.compile(source)


if __name__ == '__main__':
    JS_PATH = './doc/encrypt.js'
    ccc = compile_js(JS_PATH)
    # base64encode(utf16to8(self.server_code)),
    t = ccc.call('utf16to8', '407083')
    print ccc.call('base64encode', t)