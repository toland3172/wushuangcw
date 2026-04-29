import { Resend } from 'resend';

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export async function sendContactEmail(data: {
  name: string;
  phone: string;
  wechat?: string;
  company?: string;
  service?: string;
  message?: string;
}) {
  const { name, phone, wechat, company, service, message } = data;
  const resend = getResendClient();

  // 如果没有配置 Resend，返回成功（开发模式）
  if (!resend) {
    console.log('Email service not configured. Contact data:', data);
    return { success: true };
  }

  try {
    const { data: result, error } = await resend.emails.send({
      from: 'contact@wushuangcw.top',
      to: process.env.CONTACT_EMAIL || 'w13517401680@163.com',
      subject: `新的咨询：${name} - ${phone}`,
      text: `
姓名: ${name}
电话: ${phone}
微信: ${wechat || '未填写'}
公司: ${company || '未填写'}
咨询类型: ${service || '未选择'}
留言内容: ${message || '无'}
      `,
      html: `
        <h2>收到新的咨询留言</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">姓名</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">电话</td>
            <td style="padding: 8px;">${phone}</td>
          </tr>
          ${wechat ? `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">微信</td>
            <td style="padding: 8px;">${wechat}</td>
          </tr>` : ''}
          ${company ? `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">公司</td>
            <td style="padding: 8px;">${company}</td>
          </tr>` : ''}
          ${service ? `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px; font-weight: bold;">咨询类型</td>
            <td style="padding: 8px;">${service}</td>
          </tr>` : ''}
          ${message ? `<tr>
            <td style="padding: 8px; font-weight: bold;">留言内容</td>
            <td style="padding: 8px;">${message}</td>
          </tr>` : ''}
        </table>
        <p style="margin-top: 20px; color: #666;">
          此邮件由若水财税官网自动发送
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Send email error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
