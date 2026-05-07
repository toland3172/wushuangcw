/**
 * AI客服对话服务
 * 独立运行在 3001 端口，提供流式AI对话能力
 */

import { createServer } from 'http';
import { parse } from 'url';
import { LLMClient, Config } from 'coze-coding-dev-sdk';

const PORT = 3001;

// 系统提示词
const SYSTEM_PROMPT = `你是"株洲若水财税"的智能客服顾问，名为"小若"。你的主要职责是：

1. 回答关于公司服务的咨询
2. 介绍株洲若水财税的服务项目和专业优势
3. 提供财税相关的专业建议
4. 引导客户留下联系方式或预约咨询

## 公司信息
- **公司名称**：株洲若水财税
- **地址**：株洲市天元区
- **服务热线**：0731-2253-2031（仅供展示）
- **邮箱**：wang@wushuangcw.top

## 主要服务项目
1. **工商注册**：公司注册、个体户注册、变更登记、注销服务
2. **代理记账**：小规模纳税人、一般纳税人代理记账，税务申报
3. **税务服务**：税务咨询、税务筹划、税务申报、发票管理
4. **资质许可**：食品经营许可证、医疗器械许可证、建筑资质等
5. **财务外包**：财务咨询、内部控制设计、税务代理
6. **审计服务**：年度审计、专项审计、内部审计
7. **知识产权**：商标注册、专利申请、版权登记

## 回答原则
1. 保持专业、热情、耐心的服务态度
2. 回答简洁明了，突出公司优势
3. 如遇到复杂问题，建议客户致电或到访咨询
4. 不要虚构具体价格，可以说"具体费用根据实际情况面议"
5. 始终保持友好礼貌
6. 适当使用emoji增加亲和力（但不要过度）

## 服务优势
- 12年行业经验，专业可靠
- 一对一专属服务，量身定制
- 价格透明，无隐形收费
- 全程跟踪，服务有保障`;

// 创建HTTP服务器
const server = createServer(async (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  const parsedUrl = parse(req.url || '', true);
  
  if (req.method === 'POST' && parsedUrl.pathname === '/chat') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { messages } = JSON.parse(body);
        
        // 构建完整消息列表
        const fullMessages = [
          { role: 'system' as const, content: SYSTEM_PROMPT },
          ...messages
        ];
        
        // 初始化LLM客户端
        const config = new Config();
        const client = new LLMClient(config);
        
        // 设置流式响应头
        res.writeHead(200, {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });
        
        // 流式输出
        const stream = client.stream(fullMessages, {
          model: 'doubao-seed-2-0-lite-260215',
          temperature: 0.7
        });
        
        for await (const chunk of stream) {
          if (chunk.content) {
            res.write(chunk.content.toString());
          }
        }
        
        res.end();
      } catch (error) {
        console.error('Chat error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '服务暂时不可用，请稍后再试' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`AI Chat service running on http://localhost:${PORT}`);
});

export default server;
