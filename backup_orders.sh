#!/usr/bin/env bash
# 备份 orders 表：通过 /api/orders 接口翻页拉取全量数据，导出为 JSON 数组
# 用法：bash backup_orders.sh
# 可选环境变量：API_BASE（默认 https://funbua.uk）、LIMIT（每页条数，默认 1000）、OUT（输出文件）

set -euo pipefail

API_BASE="${API_BASE:-https://funbua.uk}"
LIMIT="${LIMIT:-1000}"
OUT="${OUT:-orders_backup.json}"
TMP="$(mktemp)"
ALL="[]"

page=1
while :; do
  echo "拉取第 ${page} 页..."
  # 拉一页，写到临时文件；用 python3 做 JSON 解析与合并
  if ! curl -s --fail "${API_BASE}/api/orders?page=${page}&limit=${LIMIT}" -o "$TMP"; then
    echo "第 ${page} 页请求失败，停止。" >&2
    break
  fi

  # 用 python3 检查 code 并取出本页 orders，合并进 ALL
  RESULT=$(python3 - "$TMP" "$ALL" <<'PY'
import json, sys
tmp, alljson = sys.argv[1], sys.argv[2]
try:
    data = json.load(open(tmp))
except Exception as e:
    print("PARSE_ERROR:" + str(e))
    sys.exit(0)
if data.get("code") != 200:
    print("API_ERROR:" + str(data.get("msg")))
    sys.exit(0)
orders = data.get("data", {}).get("orders", [])
all_list = json.loads(alljson)
all_list.extend(orders)
print(json.dumps(all_list, ensure_ascii=False))
PY
  )

  case "$RESULT" in
    PARSE_ERROR*)
      echo "解析失败：${RESULT}" >&2
      break
      ;;
    API_ERROR*)
      echo "接口错误：${RESULT}" >&2
      break
      ;;
  esac

  ALL="$RESULT"

  # 本页数量少于 LIMIT 说明已经到末页
  COUNT=$(python3 -c "import json,sys; print(len(json.loads(sys.argv[1])))" "$RESULT")
  THIS_PAGE=$(python3 -c "import json; print(len(json.load(open('$TMP')).get('data',{}).get('orders',[])))")
  echo "  本页 ${THIS_PAGE} 条，累计 ${COUNT} 条"
  if [ "$THIS_PAGE" -lt "$LIMIT" ]; then
    break
  fi
  page=$((page + 1))
done

rm -f "$TMP"
echo "$ALL" > "$OUT"
echo "备份完成，共 $(python3 -c "import json; print(len(json.load(open('$OUT'))))") 条，已写入 ${OUT}"
