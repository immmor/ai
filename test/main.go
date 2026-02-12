package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"sync"
	"sync/atomic"
	"time"
)

type OrderResponse struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
	Data struct {
		Orders     []Order `json:"orders"`
		Pagination struct {
			Page  int `json:"page"`
			Limit int `json:"limit"`
			Total int `json:"total"`
			Pages int `json:"pages"`
		} `json:"pagination"`
	} `json:"data"`
}

type Order struct {
	ID          string  `json:"id"`
	Username    string  `json:"username"`
	Amount      float64 `json:"amount"`
	Status      string  `json:"status"`
	Type        string  `json:"type"`
	OrderNo     string  `json:"order_no"`
	Description string  `json:"description"`
	CreatedAt   string  `json:"created_at"` // 改为字符串，手动解析
}

type TestResult struct {
	TotalRequests      int64
	SuccessfulRequests int64
	FailedRequests     int64
	TotalTime          time.Duration
	MinResponseTime    time.Duration
	MaxResponseTime    time.Duration
	AvgResponseTime    time.Duration
}

func main() {
	// 配置测试参数
	supabaseURL := "https://mgjaoelskdtdfigaxsxn.supabase.co"
	apiKey := "sb_publishable_jw2wivV-Jn4dy90qoYErZw_Ddr-dlfW" // 替换为实际的anon key
	username := "immmor"                                       // 替换为实际的用户名
	concurrentUsers := 2000                                    // 并发用户数
	requestsPerUser := 1                                       // 每个用户的请求数

	fmt.Printf("开始并发测试...\n")
	fmt.Printf("目标接口: Supabase REST API (/rest/v1/orders)\n")
	fmt.Printf("Supabase URL: %s\n", supabaseURL)
	fmt.Printf("并发用户数: %d\n", concurrentUsers)
	fmt.Printf("每个用户请求数: %d\n", requestsPerUser)
	fmt.Printf("总请求数: %d\n", concurrentUsers*requestsPerUser)
	fmt.Println("========================================")
	fmt.Println("开始发送请求...")
	fmt.Println()

	var wg sync.WaitGroup
	var totalRequests int64
	var successfulRequests int64
	var failedRequests int64
	var responseTimes []time.Duration
	var mu sync.Mutex

	startTime := time.Now()

	// 创建并发测试
	for i := 0; i < concurrentUsers; i++ {
		wg.Add(1)
		go func(userID int) {
			defer wg.Done()

			for j := 0; j < requestsPerUser; j++ {
				atomic.AddInt64(&totalRequests, 1)

				// 为每个请求添加一些随机性
				page := (j % 10) + 1 // 循环使用1-10页

				requestStart := time.Now()

				// 构建Supabase REST API请求URL
				url := fmt.Sprintf("%s/rest/v1/orders?username=eq.%s&select=*&order=created_at.desc&limit=10&offset=%d",
					supabaseURL, username, (page-1)*10)

				// 显示请求信息
				fmt.Printf("[用户%d] 请求%d: %s\n", userID, j+1, url)

				req, err := http.NewRequest("GET", url, nil)
				if err != nil {
					atomic.AddInt64(&failedRequests, 1)
					log.Printf("用户%d请求%d创建请求失败: %v", userID, j+1, err)
					continue
				}

				// 添加认证头
				req.Header.Set("apikey", apiKey)
				req.Header.Set("Authorization", "Bearer "+apiKey)
				req.Header.Set("Content-Type", "application/json")

				resp, err := http.DefaultClient.Do(req)
				if err != nil {
					atomic.AddInt64(&failedRequests, 1)
					log.Printf("用户%d请求%d失败: %v", userID, j+1, err)
					continue
				}

				responseTime := time.Since(requestStart)

				// 读取响应
				body, err := io.ReadAll(resp.Body)
				resp.Body.Close()

				if err != nil {
					atomic.AddInt64(&failedRequests, 1)
					log.Printf("用户%d请求%d读取响应失败: %v", userID, j+1, err)
					continue
				}

				// 检查HTTP状态码
				if resp.StatusCode != 200 {
					atomic.AddInt64(&failedRequests, 1)
					fmt.Printf("[用户%d] 请求%d失败: HTTP %s\n", userID, j+1, resp.Status)
					continue
				}

				// 显示成功响应信息
				fmt.Printf("[用户%d] 请求%d成功: 响应时间 %v\n", userID, j+1, responseTime)

				// 解析响应（Supabase直接返回订单数组）
				var orders []Order
				if err := json.Unmarshal(body, &orders); err != nil {
					// 尝试使用自定义时间格式解析
					var ordersRaw []map[string]interface{}
					if err2 := json.Unmarshal(body, &ordersRaw); err2 != nil {
						atomic.AddInt64(&failedRequests, 1)
						log.Printf("用户%d请求%d解析JSON失败: %v", userID, j+1, err)
						continue
					}

					// 手动转换，忽略时间解析错误
					orders = make([]Order, len(ordersRaw))
					for i, raw := range ordersRaw {
						if id, ok := raw["id"].(string); ok {
							orders[i].ID = id
						}
						if username, ok := raw["username"].(string); ok {
							orders[i].Username = username
						}
						if amount, ok := raw["amount"].(float64); ok {
							orders[i].Amount = amount
						}
						if status, ok := raw["status"].(string); ok {
							orders[i].Status = status
						}
						if typ, ok := raw["type"].(string); ok {
							orders[i].Type = typ
						}
						if orderNo, ok := raw["order_no"].(string); ok {
							orders[i].OrderNo = orderNo
						}
						if description, ok := raw["description"].(string); ok {
							orders[i].Description = description
						}
						if createdAt, ok := raw["created_at"].(string); ok {
							orders[i].CreatedAt = createdAt
						}
					}
				}

				// 检查是否返回了有效数据
				if orders == nil {
					atomic.AddInt64(&failedRequests, 1)
					log.Printf("用户%d请求%d返回空数据", userID, j+1)
					continue
				}

				// 记录成功的请求
				atomic.AddInt64(&successfulRequests, 1)

				// 记录响应时间
				mu.Lock()
				responseTimes = append(responseTimes, responseTime)
				mu.Unlock()

				// 实时显示进度
				currentProgress := atomic.LoadInt64(&totalRequests)
				totalExpected := int64(concurrentUsers * requestsPerUser)
				progress := float64(currentProgress) / float64(totalExpected) * 100

				// 每10个请求或进度有显著变化时显示进度
				if currentProgress%10 == 0 || int(progress)%10 == 0 {
					fmt.Printf("=== 进度: %d/%d (%.1f%%) ===\n", currentProgress, totalExpected, progress)
				}
			}
		}(i)
	}

	wg.Wait()

	totalTime := time.Since(startTime)

	// 计算统计信息
	var minTime, maxTime, totalResponseTime time.Duration
	if len(responseTimes) > 0 {
		minTime = responseTimes[0]
		maxTime = responseTimes[0]
		for _, rt := range responseTimes {
			if rt < minTime {
				minTime = rt
			}
			if rt > maxTime {
				maxTime = rt
			}
			totalResponseTime += rt
		}
	}

	avgTime := time.Duration(0)
	if len(responseTimes) > 0 {
		avgTime = totalResponseTime / time.Duration(len(responseTimes))
	}

	// 输出测试结果
	fmt.Println("========================================")
	fmt.Printf("测试完成!\n")
	fmt.Printf("总耗时: %v\n", totalTime)
	fmt.Printf("总请求数: %d\n", totalRequests)
	fmt.Printf("成功请求: %d (%.1f%%)\n", successfulRequests, float64(successfulRequests)/float64(totalRequests)*100)
	fmt.Printf("失败请求: %d (%.1f%%)\n", failedRequests, float64(failedRequests)/float64(totalRequests)*100)
	fmt.Printf("QPS (每秒请求数): %.2f\n", float64(totalRequests)/totalTime.Seconds())
	fmt.Printf("最小响应时间: %v\n", minTime)
	fmt.Printf("最大响应时间: %v\n", maxTime)
	fmt.Printf("平均响应时间: %v\n", avgTime)

	// 输出响应时间分布
	fmt.Println("\n响应时间分布:")
	printResponseTimeDistribution(responseTimes)
}

func printResponseTimeDistribution(times []time.Duration) {
	if len(times) == 0 {
		fmt.Println("无响应时间数据")
		return
	}

	buckets := []struct {
		name string
		max  time.Duration
	}{
		{"< 100ms", 100 * time.Millisecond},
		{"100-500ms", 500 * time.Millisecond},
		{"500ms-1s", 1 * time.Second},
		{"1-3s", 3 * time.Second},
		{"3-5s", 5 * time.Second},
		{"> 5s", 10 * time.Second},
	}

	counts := make([]int, len(buckets))

	for _, t := range times {
		for i, bucket := range buckets {
			if t <= bucket.max {
				counts[i]++
				break
			}
		}
	}

	for i, bucket := range buckets {
		percentage := float64(counts[i]) / float64(len(times)) * 100
		fmt.Printf("  %-10s: %3d (%.1f%%)\n", bucket.name, counts[i], percentage)
	}
}
