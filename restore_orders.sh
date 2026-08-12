#!/usr/bin/env bash
# 通过 Supabase REST API 把 orders_backup.json 导入到 orders 表
#
# 前置条件：
#   1. 已先用 create_orders_table.sql 在目标 Supabase 建好表
#   2. 设置环境变量（重要：SUPABASE_KEY 用 service_role key，有写权限）
#
# 用法：
#   SUPABASE_URL=https://xxxx.supabase.co \
#   SUPABASE_KEY=eyJ...service_role... \
#   bash restore_orders.sh
#
# 可选：
#   BATCH   每批插入条数（默认 100）
#   SRC     备份文件路径（默认 orders_backup.json）

set -euo pipefail

: "${SUPABASE_URL:?请设置 SUPABASE_URL，例如 https://xxxx.supabase.co}"
: "${SUPABASE_KEY:?请设置 SUPABASE_KEY（service_role key，有写权限）}"

SRC="${SRC:-orders_backup.json}"
BATCH="${BATCH:-100}"

if [ ! -f "$SRC" ]; then
  echo "找不到备份文件: $SRC" >&2
  exit 1
fi

API="${SUPABASE_URL%/}/rest/v1/orders"

# 校验 JSON 合法性并取出总条数
TOTAL=$(python3 -c "import json; print(len(json.load(open('$SRC'))))")
echo "备份文件共 ${TOTAL} 条，开始导入（每批 ${BATCH} 条）..."

INSERTED=0
OFFSET=0

while [ "$OFFSET" -lt "$TOTAL" ]; do
  # 用 python3 切出本批，写到临时文件
  TMP="$(mktemp)"
  python3 - "$SRC" "$OFFSET" "$BATCH" "$TMP" <<'PY'
import json, sys
src, off, batch, tmp = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
data = json.load(open(src))
chunk = data[off:off+batch]
# 把 JSON 的 null 保留，确保字段名与表一致
json.dump(chunk, open(tmp, 'w'), ensure_ascii=False)
PY

  HTTP_CODE=$(curl -s -o /tmp/restore_resp.txt -w '%{http_code}' \
    -X POST "$API" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    --data-binary "@$TMP")

  rm -f "$TMP"

  if [ "$HTTP_CODE" != "201" ]; then
    echo "导入失败！批次 offset=${OFFSET} HTTP=${HTTP_CODE}" >&2
    echo "--- 响应内容 ---" >&2
    cat /tmp/restore_resp.txt >&2
    exit 1
  fi

  COUNT=$(python3 -c "import json; print(len(json.load(open('$SRC'))[$OFFSET:$OFFSET+$BATCH]))")
  INSERTED=$((INSERTED + COUNT))
  OFFSET=$((OFFSET + BATCH))
  echo "  已导入 ${INSERTED}/${TOTAL}"
done

echo "导入完成，共 ${INSERTED} 条。"
