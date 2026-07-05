"""
ikuuu.win 自动签到脚本
思路：
1. 优先复用本地保存的 cookie（session.json），直接调用签到接口。
2. 如果 cookie 失效（未登录），才走登录流程。
3. 登录需要「实时」通过的极验验证码结果（lot_number / captcha_output /
   pass_token / gen_time），这几个值不能硬编码复用 —— 必须是当次触发验证码
   后拿到的新鲜数据（比如你手动过一次验证码后从浏览器网络面板复制，或接入
   打码平台的返回值）。脚本把它们作为函数参数传入，而不是写死在文件里。
4. 登录成功后自动把新的 cookie 落盘，后续大概率不用再次过验证码
   （session 一般能撑较久，具体看站点 session 有效期）。
"""

import json
import time
from pathlib import Path

import requests

BASE_URL = "https://ikuuu.win"
SESSION_FILE = Path(__file__).parent / "session.json"

COMMON_HEADERS = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "user-agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
    ),
    "x-requested-with": "XMLHttpRequest",
}


def load_cookies() -> dict:
    """读取本地保存的 cookie，没有则返回空字典。"""
    if SESSION_FILE.exists():
        try:
            return json.loads(SESSION_FILE.read_text())
        except json.JSONDecodeError:
            return {}
    return {}


def save_cookies(cookies: dict) -> None:
    SESSION_FILE.write_text(json.dumps(cookies, ensure_ascii=False, indent=2))


def is_logged_in(session: requests.Session) -> bool:
    """用签到接口本身来判断登录态是否还有效。"""
    resp = session.post(
        f"{BASE_URL}/user/checkin",
        headers={**COMMON_HEADERS, "referer": f"{BASE_URL}/user"},
    )
    try:
        data = resp.json()
    except ValueError:
        return False

    # ret == -1 或 msg 里提示未登录/请先登录 时，说明 session 失效
    msg = data.get("msg", "")
    if "登录" in msg and data.get("ret") in (0, -1):
        # 有些站点签到成功当天已签也是 ret=0，用更精确的关键字判断未登录
        if "请先登录" in msg or "登录已过期" in msg or "login" in msg.lower():
            return False
    print("[checkin] 接口返回:", data)
    return True


def login(
    session: requests.Session,
    email: str,
    passwd: str,
    lot_number: str,
    captcha_output: str,
    pass_token: str,
    gen_time: str,
) -> bool:
    """
    使用「当次新鲜生成」的极验验证码结果登录。
    这几个 captcha 参数必须现取现用，不能复用旧脚本里的值。
    """
    data = {
        "host": "ikuuu.win",
        "email": email,
        "passwd": passwd,
        "code": "",
        "twofa_step": "0",
        "captcha_result[lot_number]": lot_number,
        "captcha_result[captcha_output]": captcha_output,
        "captcha_result[pass_token]": pass_token,
        "captcha_result[gen_time]": gen_time,
        "remember_me": "on",
        "pageLoadedAt": str(int(time.time() * 1000)),
    }
    headers = {
        **COMMON_HEADERS,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "origin": BASE_URL,
        "referer": f"{BASE_URL}/auth/login",
    }
    resp = session.post(f"{BASE_URL}/auth/login", headers=headers, data=data)
    result = resp.json()
    print("[login] 接口返回:", result)

    if result.get("ret") == 1:
        # 登录成功，落盘 cookie 供下次直接复用
        save_cookies(session.cookies.get_dict())
        return True
    return False


def main():
    session = requests.Session()
    cookies = load_cookies()
    if cookies:
        session.cookies.update(cookies)

    if cookies and is_logged_in(session):
        print("[main] 复用已有 session，签到完成。")
        return

    print("[main] session 无效或不存在，需要重新登录。")
    print(
        "[main] 请提供当次触发验证码后拿到的新鲜参数"
        "（lot_number / captcha_output / pass_token / gen_time），"
        "旧的验证码结果无法复用。"
    )

    # 示例：把下面四个值换成你「刚刚」过验证码得到的新鲜数据再运行
    ok = login(
        session,
        email="ninenine000099@gmail.com",
        passwd="Wang123.",
        lot_number="换成新的",
        captcha_output="换成新的",
        pass_token="换成新的",
        gen_time="换成新的",
    )

    if ok and is_logged_in(session):
        print("[main] 登录并签到完成。")
    else:
        print("[main] 登录失败，请检查账号密码或验证码是否有效。")


if __name__ == "__main__":
    main()