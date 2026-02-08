import hashlib
import requests
import time

class EpayClient:
    def __init__(self, api_url, pid, key):
        """
        :param api_url: 接口地址，例如 https://epay.wxda.net/
        :param pid: 商户ID
        :param key: 商户密钥
        """
        self.api_url = api_url.rstrip('/') + '/submit.php'  # 页面跳转支付接口
        self.pid = str(pid)
        self.key = key

    def get_signature(self, params):
        """
        易支付签名算法：
        1. 筛选：所有发送参数（不包括sign、sign_type）
        2. 排序：按参数名ASCII码从小到大排序
        3. 拼接：key1=value1&key2=value2...（不包含空值）
        4. 签名：拼接好的字符串末尾加上商户密钥，进行MD5加密
        """
        # 排序并过滤掉 sign, sign_type 和空值
        sorted_params = sorted([(k, v) for k, v in params.items() if k not in ['sign', 'sign_type'] and v != ''])
        
        # 拼接待签名字符串
        query_string = "&".join([f"{k}={v}" for k, v in sorted_params])
        
        # 拼接密钥并计算MD5
        sign_str = query_string + self.key
        return hashlib.md5(sign_str.encode('utf-8')).hexdigest()

    def build_pay_url(self, out_trade_no, type, name, money, notify_url, return_url):
        """
        构造支付URL（用于浏览器跳转）
        """
        params = {
            "pid": self.pid,
            "type": type,             # 支付方式：alipay, wxpay, qqpay 等
            "out_trade_no": out_trade_no,
            "notify_url": notify_url, # 异步通知地址
            "return_url": return_url, # 跳转通知地址
            "name": name,             # 商品名称
            "money": str(money),      # 金额，单位元
            "sitename": "我的网站"     # 网站名称
        }
        
        # 生成签名
        params['sign'] = self.get_signature(params)
        params['sign_type'] = 'MD5'
        
        # 构造最终请求URL
        # 也可以使用 requests.Request 构造表单提交
        query_string = "&".join([f"{k}={requests.utils.quote(str(v))}" for k, v in params.items()])
        return f"{self.api_url}?{query_string}"

# === 使用示例 ===
if __name__ == "__main__":
    # 配置信息（请根据你在 epay.wxda.net 后台获取的修改）
    API_BASE = "https://epay.wxda.net/"
    MERCHANT_ID = "1235" 
    MERCHANT_KEY = "YHEPe1KO1Kg4o7gEOqgKmXkpGnPNNE2Y"

    client = EpayClient(API_BASE, MERCHANT_ID, MERCHANT_KEY)

    # 模拟订单数据
    order_id = str(int(time.time())) # 唯一订单号
    pay_url = client.build_pay_url(
        out_trade_no=order_id,
        type="alipay",               # 支付方式
        name="测试商品",
        money="0.01",
        notify_url="https://api.immmor.com/notify",
        return_url="https://api.immmor.com/return"
    )

    print("请在浏览器中打开以下链接进行支付：")
    print(pay_url)