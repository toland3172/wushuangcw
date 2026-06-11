import { NextRequest, NextResponse } from "next/server";

// 代理到 Coze 部署的 AI 客服后端（已集成知识库 + LLM）
const COZE_CHAT_API = "https://173fa8f8-fa55-4277-9605-7b4a51030d8c.dev.coze.site/api/chat";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 兼容两种格式：{messages:[...]} 或 {message, history}
    let userMessage = "";
    let chatHistory: Array<{ role: string; content: string }> = [];

    if (body.messages) {
      chatHistory = body.messages;
      userMessage = chatHistory[chatHistory.length - 1]?.content || "";
    } else if (body.message) {
      userMessage = body.message;
      chatHistory = body.history || [];
    }

    if (!userMessage) {
      return NextResponse.json({ error: "请输入问题" }, { status: 400 });
    }

    // 代理到 Coze 部署的 chat API（流式转发）
    const proxyResponse = await fetch(COZE_CHAT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history: chatHistory }),
    });

    if (!proxyResponse.ok) {
      throw new Error(`Proxy error: ${proxyResponse.status}`);
    }

    // 流式透传
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = proxyResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch {
          // ignore
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": proxyResponse.headers.get("Content-Type") || "text/event-stream",
        "Access-Control-Allow-Origin": "*",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "服务暂时繁忙，请拨打 13517401680" },
      { status: 500 }
    );
  }
}
