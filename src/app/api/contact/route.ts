import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, wechat, company, service, message } = body;

    // 验证必填字段
    if (!name || !phone) {
      return NextResponse.json(
        { error: '姓名和电话为必填项' },
        { status: 400 }
      );
    }

    // 发送邮件通知
    const result = await sendContactEmail({
      name,
      phone,
      wechat,
      company,
      service,
      message,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: '发送失败，请稍后重试' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '提交成功！我们会尽快联系您',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}
