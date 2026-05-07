import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// 预设的FAQ回答作为fallback
const FAQ_ANSWERS = {
  "服务": `株洲若水财税主要有以下7大服务：

1. **财务外包**：日常账务处理、财务报表编制、凭证整理装订、财务档案管理
2. **税务服务**：税务健康检查、纳税申报、汇算清缴、税收优惠申请、税务筹划、研发费用加计扣除
3. **财务咨询**：财务制度建设、财务分析、成本核算、内控建设、上市财务顾问
4. **香港公司服务**：香港公司账务处理、审计协助、跨境税务咨询
5. **高新与IPO服务**：高新认定辅导、研发费用归集、IPO合规
6. **培训与赋能**：会计实操、财税政策解读、企业内训定制
7. **增值服务**：公司注册变更代办、资质代办、银行开户

有12年行业经验，一对一专属服务，价格透明，全程跟踪保障~ 如需了解更多，欢迎拨打13517401680咨询哦！`,

  "价格": `您好！关于服务费用，我们会根据您的企业类型、业务规模和服务需求来定制方案，确保性价比最高。

小规模纳税人和一般纳税人代理记账费用会有所不同，具体需要了解您的企业情况后才能给出准确报价。

建议您直接拨打13517401680（微信同号），我们的顾问会根据您的实际情况给出专业建议，全程价格透明，无隐形收费！`,

  "代理记账": `您好！我们提供专业的代理记账服务：

- **小规模纳税人**：日常账务处理、税务申报
- **一般纳税人**：全流程账务处理、发票管理、税务申报

服务内容包括：
• 凭证整理与装订
• 财务报表编制
• 税务申报（增值税、企业所得税、个人所得税等）
• 年度汇算清缴

12年专业经验，一对一专属服务！具体费用请拨打13517401680咨询~`,

  "注册": `您好！公司注册我们可以协助办理哦：

服务内容：
• 公司名称核准
• 工商登记注册
• 营业执照办理
• 银行开户协助
• 税务登记

我们是合作代办模式，专业高效！有需要请拨打13517401680咨询具体流程和费用~`,

  "税务": `您好！我们提供全面的税务服务：

• 税务健康检查
• 纳税申报协助
• 汇算清缴辅导
• 税收优惠政策申请
• 税务筹划
• 个人所得税筹划
• 研发费用加计扣除

无论是日常税务问题还是专项筹划，我们都能帮到您！欢迎拨打13517401680咨询~`,

  "联系": `您好！联系我们有以下方式：

1. **电话**：13517401680（微信同号）
2. **微信**：W13517401680
3. **邮箱**：wang@wushuangcw.top

人工客服更贴心，能根据您的具体情况给出专业建议，欢迎随时联系！`,

  "default": `您好！我是若水财税的智能客服小若~ 😊

我们可以帮您解决：
• 财务外包、代理记账
• 税务服务、税务筹划
• 公司注册、资质代办
• 财务咨询、上市辅导

有12年行业经验，专业可靠！

如需详细咨询，欢迎：
📞 拨打13517401680（微信同号）
💬 添加微信W13517401680

人工客服随时为您服务！`
};

function findBestAnswer(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes("服务") || q.includes("有哪些")) return FAQ_ANSWERS["服务"];
  if (q.includes("价格") || q.includes("费用") || q.includes("多少钱")) return FAQ_ANSWERS["价格"];
  if (q.includes("代理记账") || q.includes("记账")) return FAQ_ANSWERS["代理记账"];
  if (q.includes("注册") || q.includes("公司")) return FAQ_ANSWERS["注册"];
  if (q.includes("税务") || q.includes("税")) return FAQ_ANSWERS["税务"];
  if (q.includes("联系") || q.includes("人工") || q.includes("微信") || q.includes("电话")) return FAQ_ANSWERS["联系"];
  
  return FAQ_ANSWERS["default"];
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const lastMessage = messages[messages.length - 1]?.content || "";
    
    // 尝试使用SDK
    try {
      const { LLMClient, Config } = await import("coze-coding-dev-sdk");
      const config = new Config();
      const client = new LLMClient(config);
      
      const fullMessages = [
        { role: "system" as const, content: "你是若水财税的客服小若，专业热情地回答用户问题。" },
        ...messages
      ];
      
      const stream = client.stream(fullMessages, {
        model: "doubao-seed-2-0-lite-260215",
        temperature: 0.7
      });
      
      const encoder = new TextEncoder();
      const streamResult = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk.content) {
                controller.enqueue(encoder.encode(chunk.content.toString()));
              }
            }
            controller.close();
          } catch (error) {
            console.error('Stream error:', error);
            controller.error(error);
          }
        }
      });
      
      return new Response(streamResult, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache',
        },
      });
    } catch (sdkError) {
      console.error('SDK error, using fallback:', sdkError);
      
      // 使用FAQ fallback，逐字输出模拟打字效果
      const answer = findBestAnswer(lastMessage);
      const encoder = new TextEncoder();
      
      const streamResult = new ReadableStream({
        async start(controller) {
          // 模拟打字效果，每50ms输出一个字
          for (let i = 0; i < answer.length; i++) {
            controller.enqueue(encoder.encode(answer[i]));
            await new Promise(resolve => setTimeout(resolve, 30));
          }
          controller.close();
        }
      });
      
      return new Response(streamResult, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache',
        },
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: '服务暂时繁忙，请拨打13517401680联系我们' },
      { status: 500 }
    );
  }
}
