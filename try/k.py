from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import httpx
import json
import asyncio

app = FastAPI(title="Ollama Qwen2.5 Service")

# 添加CORS中间件配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源，生产环境应限制特定域名
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有HTTP方法
    allow_headers=["*"],  # 允许所有请求头
)

OLLAMA_HOST = "http://localhost:6399"
MODEL = "qwen2.5"


async def stream_chat(prompt: str):
    """Generate streaming response from Ollama."""
    url = f"{OLLAMA_HOST}/api/generate"
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": True
    }
    async with httpx.AsyncClient(timeout=60) as client:
        async with client.stream("POST", url, json=payload) as resp:
            async for line in resp.aiter_lines():
                if line:
                    data = json.loads(line)
                    chunk = data.get("response", "")
                    if chunk:
                        yield chunk


@app.post("/chat")
async def chat(
    prompt: str = Body(..., description="User input prompt"),
    stream: bool = Body(False, description="Enable streaming")
):
    """Chat endpoint supporting both streaming and non-streaming modes."""
    if stream:
        return StreamingResponse(
            stream_chat(prompt),
            media_type="text/plain"
        )
    else:
        url = f"{OLLAMA_HOST}/api/generate"
        payload = {
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return {"response": data.get("response", "")}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", ssl_keyfile="./key.pem", ssl_certfile="./cert.pem", port=443)
