import re
import html
import requests
from urllib.parse import unquote


URL = "https://91porn.com/view_video.php?viewkey=963326232&c=qitex&viewtype=&category="


def decode_js_string(s: str) -> str:
    """
    解码类似：
        document.write(strencode2("..."))
    的内容。

    91porn 一类页面常见的是：
        strencode2(f) -> unescape(f)
    """

    # JS 中常见的 %XX 编码
    s = unquote(s)

    # HTML 实体
    s = html.unescape(s)

    # 处理常见 JS 转义
    try:
        s = bytes(s, "utf-8").decode("unicode_escape")
    except UnicodeDecodeError:
        pass

    return s


def extract_video_url(page_url: str) -> str | None:

    session = requests.Session()

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/151.0.0.0 Safari/537.36"
        ),
        "Accept": (
            "text/html,application/xhtml+xml,"
            "application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        ),
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Referer": "https://91porn.com/",
        "Connection": "keep-alive",
    }

    r = session.get(
        page_url,
        headers=headers,
        timeout=20,
    )

    r.raise_for_status()

    page = r.text

    # ---------------------------------------------------------
    # 方法 1：
    # 直接寻找 <source src="...">
    # ---------------------------------------------------------

    patterns = [
        r"<source[^>]+src=['\"]([^'\"]+)['\"]",
        r'<source[^>]+src\s*=\s*([^ >]+)',
        r'player_one_html5_api[^>]*>.*?<source[^>]+src=[\'"]([^\'"]+)',
    ]

    for pattern in patterns:
        m = re.search(pattern, page, re.I | re.S)

        if m:
            video_url = html.unescape(m.group(1))

            if video_url.startswith("//"):
                video_url = "https:" + video_url

            return video_url

    # ---------------------------------------------------------
    # 方法 2：
    # 页面使用：
    #
    # document.write(strencode2("......"))
    #
    # 先把字符串取出来，再解码
    # ---------------------------------------------------------

    patterns = [
        r'document\.write\s*\(\s*strencode2\s*\(\s*"((?:\\.|[^"])*)"\s*\)\s*\)',
        r"document\.write\s*\(\s*strencode2\s*\(\s*'((?:\\.|[^'])*)'\s*\)\s*\)",
    ]

    for pattern in patterns:

        m = re.search(pattern, page, re.I | re.S)

        if not m:
            continue

        encoded = m.group(1)

        decoded = decode_js_string(encoded)

        # 解码之后再次寻找 source
        source_patterns = [
            r"<source[^>]+src=['\"]([^'\"]+)['\"]",
            r"<source[^>]+src\s*=\s*([^ >]+)",
        ]

        for source_pattern in source_patterns:

            sm = re.search(
                source_pattern,
                decoded,
                re.I | re.S
            )

            if sm:

                video_url = html.unescape(sm.group(1))

                if video_url.startswith("//"):
                    video_url = "https:" + video_url

                return video_url

    # ---------------------------------------------------------
    # 方法 3：
    # 有些版本直接把 m3u8/mp4 藏在 JS 中
    # ---------------------------------------------------------

    video_patterns = [
        r'https?://[^\'"\s<>]+\.m3u8(?:\?[^\'"\s<>]*)?',
        r'https?://[^\'"\s<>]+\.mp4(?:\?[^\'"\s<>]*)?',
        r'//[^\'"\s<>]+\.m3u8(?:\?[^\'"\s<>]*)?',
        r'//[^\'"\s<>]+\.mp4(?:\?[^\'"\s<>]*)?',
    ]

    for pattern in video_patterns:

        m = re.search(
            pattern,
            page,
            re.I
        )

        if m:

            video_url = m.group(0)

            if video_url.startswith("//"):
                video_url = "https:" + video_url

            return video_url

    return None


if __name__ == "__main__":

    try:

        video_url = extract_video_url(URL)

        if video_url:
            print("\n找到视频地址：")
            print(video_url)

        else:
            print("没有找到视频地址。")
            print("可能是页面需要登录、验证码，或者视频地址由后续接口动态返回。")

    except requests.RequestException as e:

        print("网页请求失败：")
        print(e)