import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `你是"若水财税"（株洲若水财税服务有限公司）的AI客服助手，名字叫小若。你只能基于以下知识库内容回答用户问题。

【公司基本信息】
- 公司全称：株洲若水财税服务有限公司
- 主营业务：代理记账、税务筹划、公司注册、财务咨询、审计协助等
- 联系电话：13517401680
- 公司地址：湖南省株洲市石峰区

【服务范围】
1. 财务外包：日常账务处理、财务报表编制、凭证整理与装订、财务档案管理
2. 税务服务：税务健康检查、纳税申报协助、汇算清缴辅导、税收优惠政策申请、税务筹划、个人所得税筹划、研发费用加计扣除
3. 财务咨询：财务制度建设、财务分析、成本核算优化、内控体系建设、财务人员培训、投资决策支持、上市财务顾问
4. 香港公司服务：香港公司账务处理、香港公司审计协助、跨境税务咨询
5. 高新与IPO服务：高新技术企业认定辅导、研发费用归集辅导、IPO前期合规辅导
6. 培训与赋能：会计实操培训、财税政策解读、金蝶/用友软件培训、税务筹划培训、企业内训定制、老板财税通识课
7. 增值服务：公司注册/变更、资质代办、银行开户协助、税务登记协助

【回答规则】
- 严格基于以上信息回答，不得编造
- 不提供具体避税方案
- 不评论同行
- 不暗示可代客户做账报税（公司无代理记账许可证）
- 当用户问及敏感问题（如"如何少交税"），引导至合法合规的税务筹划服务
- 触发转人工关键词时（如"人工""投诉""退款"），回复："如需人工服务，请拨打我们的服务热线：13517401680，工作时间为周一至周五 9:00-18:00。"
- 回答风格：专业、简洁、有温度`;

// 简易FAQ匹配
const FAQ: Record<string, string> = {
  "你们有哪些服务": "我们提供7大类服务：\n1. 财务外包（日常账务处理、报表编制等）\n2. 税务服务（纳税申报、税务筹划等）\n3. 财务咨询（制度建设、内控体系等）\n4. 香港公司服务\n5. 高新与IPO服务\n6. 培训与赋能\n7. 增值服务（公司注册等）\n\n您对哪项服务感兴趣？",
  "能帮我整理旧账乱账吗": "当然可以！我们的财务外包服务中包含账务梳理，可以协助您整理历史遗留的错账、乱账、单据不全等问题。请联系我们：13517401680",
  "税务筹划怎么做": "我们的税务服务包括税务健康检查、税收优惠政策申请、税务筹划等。具体方案需要根据您的企业情况量身定制。建议您拨打 13517401680 预约免费初步咨询。",
  "如何联系人工客服": "如需人工服务，请拨打我们的服务热线：13517401680，工作时间为周一至周五 9:00-18:00。",
  "收费多少": "费用根据服务类型、企业规模、票据数量等因素综合报价，无任何隐形收费。建议您拨打 13517401680 获取免费报价。",
  "联系电话": "我们的服务热线是：13517401680，工作时间为周一至周五 9:00-18:00。",
};

function matchFAQ(input: string): string | null {
  const normalized = input.trim().replace(/[？?！!。.，,]/g, "");
  for (const [key, value] of Object.entries(FAQ)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  return null;
}

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

    // 先尝试FAQ匹配
    const faqAnswer = matchFAQ(userMessage);
    if (faqAnswer) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(faqAnswer));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 构建对话消息
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    // 调用 Coze API
    const cozeApiToken = process.env.COZE_API_TOKEN || process.env.API_TOKEN || "";
    const cozeBotId = process.env.COZE_BOT_ID || process.env.BOT_ID || "";

    if (cozeApiToken && cozeBotId) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const response = await fetch("https://api.coze.cn/v3/chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cozeApiToken}`,
              },
              body: JSON.stringify({
                bot_id: cozeBotId,
                user_id: "web-user-" + Date.now(),
                stream: true,
                auto_save_history: true,
                additional_messages: apiMessages,
              }),
            });

            if (!response.ok) {
              throw new Error(`Coze API error: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
              let buffer = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  if (line.startsWith("data:")) {
                    const data = line.slice(5).trim();
                    if (data === "[DONE]" || data === '"[DONE]"') {
                      controller.close();
                      return;
                    }
                    try {
                      const parsed = JSON.parse(data);
                      if (parsed.type === "answer" && parsed.content) {
                        controller.enqueue(encoder.encode(parsed.content));
                      }
                    } catch {
                      // ignore parse errors
                    }
                  }
                }
              }
            }
            controller.close();
          } catch {
            // Fallback to default response
            controller.enqueue(
              encoder.encode("抱歉，AI服务暂时繁忙，请拨打我们的服务热线：13517401680")
            );
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Transfer-Encoding": "chunked",
        },
      });
    }

    // 无API配置时的兜底回复
    const fallbackReply = `感谢您的咨询！关于"${userMessage}"，建议您拨打我们的服务热线 13517401680 获取专业解答，我们的顾问会为您提供详细方案。`;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fallbackReply));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "服务暂时繁忙，请稍后重试" },
      { status: 500 }
    );
  }
}
