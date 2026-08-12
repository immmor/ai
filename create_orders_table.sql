-- 在 Supabase SQL Editor 中执行，重建 orders 表
-- 仅当表不存在时创建；若已存在请先 DROP TABLE orders; 再执行

CREATE TABLE IF NOT EXISTS public.orders (
    id            BIGINT,
    order_no      TEXT,
    username      TEXT,
    amount        INTEGER,
    payment_type  TEXT,
    status        TEXT,
    description   TEXT,
    trade_no      TEXT,
    created_at    TIMESTAMPTZ,
    paid_at       TIMESTAMPTZ
);

-- 设 id 为主键（保留现有数据中的 id）
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conrelid = 'public.orders'::regclass AND contype = 'p'
    ) THEN
        ALTER TABLE public.orders ADD PRIMARY KEY (id);
    END IF;
END $$;

-- 索引：按用户名和订单号查询
CREATE INDEX IF NOT EXISTS idx_orders_username ON public.orders (username);
CREATE INDEX IF NOT EXISTS idx_orders_order_no ON public.orders (order_no);

-- 确认
SELECT count(*) AS total FROM public.orders;
