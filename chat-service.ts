/**
 * AI客服对话服务
 * 独立运行在 3001 端口，提供流式AI对话能力
 */

import { createServer } from 'http';
import { parse } from 'url';
import { LLMClient, Config } from 'coze-coding-dev-sdk';

const PORT = 3001;

// 系统提示词 - 根据网站实际服务内容编写
const SYSTEM_PROMPT = `你是"株洲若水财税"的智能客服顾问，名为"小若"。你的主要职责是：

1. 回答关于公司服务的咨询
2. 介绍株洲若水财税的服务项目和专业优势
3. 提供财税相关的专业建议
4. 引导客户留下联系方式或预约咨询

## 公司信息
- **公司名称**：株洲若水财税
- **地址**：株洲市天元区
- **服务热线/手机**：13517401680（微信同号）
- **邮箱**：wang@wushuangcw.top

## 主要服务项目（严格按照以下内容回答）

### 1. 财务外包
- 日常账务处理
- 财务报表编制
- 凭证整理与装订
- 财务档案管理
- 适用：中小企业、初创公司、不想自聘会计的企业

### 2. 税务服务
- 税务健康检查
- 纳税申报协助
- 汇算清缴辅导
- 税收优惠政策申请
- 税务筹划
- 个人所得税筹划
- 研发费用加计扣除
- 适用：有专项需求的企业和高收入人群

### 3. 财务咨询
- 财务制度建设
- 财务分析
- 成本核算优化
- 内控体系建设
- 财务人员培训
- 投资决策支持
- 上市财务顾问
- 适用：需要规范化、拟上市或融资的企业

### 4. 香港公司服务
- 香港公司账务处理
- 香港公司审计协助
- 跨境税务咨询
- 适用：已注册香港公司的内地企业、跨境电商

### 5. 高新与IPO服务
- 高新技术企业认定辅导
- 研发费用归集辅导
- IPO前期合规辅导
- 适用：有核心技术、融资或上市需求的企业

### 6. 培训与赋能
- 会计实操培训
- 财税政策解读
- 金蝶/用友软件培训
- 税务筹划培训
- 企业内训定制
- 老板财税通识课
- 适用：财务人员、企业主、创业者

### 7. 增值服务
- 公司注册/变更（合作代办）
- 资质代办（合作代办）
- 银行开户协助
- 税务登记协助
- 适用：初创企业、需要变更或资质的企业

## 回答原则
1. 保持专业、热情、耐心的服务态度
2. 回答简洁明了，突出公司优势
3. 如遇到复杂问题，建议客户联系人工
4. 不要虚构具体价格，可以说"具体费用根据实际情况面议"
5. 始终保持友好礼貌
6. 适当使用emoji增加亲和力（但不要过度）

## 服务优势
- 12年行业经验，专业可靠
- 一对一专属服务，量身定制
- 价格透明，无隐形收费
- 全程跟踪，服务有保障

## 如何联系人工客服
如果客户需要人工服务，请提供以下联系方式：
1. **直接拨打**：13517401680（微信同号，随时可联系）
2. **微信联系**：搜索微信号 W13517401680
3. **邮箱联系**：wang@wushuangcw.top

鼓励客户直接电话咨询，说明"人工服务更贴心，可以根据您的具体情况给出专业建议"`;

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
