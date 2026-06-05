'use client';

import { useState } from 'react';

const SERVICES = [
  {
    icon: '📋',
    title: '财务外包',
    tagline: '适合中小企业、初创公司、不想自聘会计的企业',
    items: ['日常账务处理', '财务报表编制', '凭证整理与装订', '财务档案管理'],
  },
  {
    icon: '💰',
    title: '税务服务',
    tagline: '适合有专项需求的企业和高收入人群',
    items: ['税务健康检查', '纳税申报协助', '汇算清缴辅导', '税收优惠政策申请', '税务筹划', '个人所得税筹划', '研发费用加计扣除'],
  },
  {
    icon: '📊',
    title: '财务咨询',
    tagline: '适合需要规范化、拟上市或融资的企业',
    items: ['财务制度建设', '财务分析', '成本核算优化', '内控体系建设', '财务人员培训', '投资决策支持', '上市财务顾问'],
  },
  {
    icon: '🌐',
    title: '香港公司服务',
    tagline: '适合已注册香港公司的内地企业、跨境电商',
    items: ['香港公司账务处理', '香港公司审计协助', '跨境税务咨询'],
  },
  {
    icon: '🚀',
    title: '高新与IPO服务',
    tagline: '适合有核心技术、融资或上市需求的企业',
    items: ['高新技术企业认定辅导', '研发费用归集辅导', 'IPO前期合规辅导'],
  },
  {
    icon: '📚',
    title: '培训与赋能',
    tagline: '适合财务人员、企业主、创业者',
    items: ['会计实操培训', '财税政策解读', '金蝶/用友软件培训', '税务筹划培训', '企业内训定制', '老板财税通识课'],
  },
  {
    icon: '🎁',
    title: '增值服务',
    tagline: '适合初创企业、需要变更或资质的企业',
    items: ['公司注册/变更（合作代办）', '资质代办（合作代办）', '银行开户协助', '税务登记协助'],
  },
];

export default function ServiceGrid() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (i: number) => {
    setExpanded(prev => (prev === i ? null : i));
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((service, i) => {
        const isOpen = expanded === i;
        return (
          <div key={service.title} className="contents">
            <button
              onClick={() => toggle(i)}
              className={`group relative flex flex-col items-start gap-3 rounded-xl border bg-white p-5 text-left transition-all duration-200 hover:shadow-md ${isOpen ? 'border-blue-600 shadow-md ring-1 ring-blue-600/10' : 'border-gray-100 hover:border-blue-600/30'}`}
            >
              <div className="text-3xl">{service.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700">{service.title}</h3>
                  <svg
                    className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </div>
                <p className="mt-1 text-sm text-blue-600 font-medium">{service.tagline}</p>
              </div>
            </button>

            {isOpen && (
              <div className="col-span-1 rounded-xl border border-blue-600/10 bg-gray-50 p-5 sm:col-span-2 lg:col-span-3">
                <div className="mx-auto max-w-4xl">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-2xl">{service.icon}</span>
                    <h4 className="text-sm font-semibold text-blue-800">{service.title} — 服务内容</h4>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-lg bg-white px-4 py-3 text-sm text-gray-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20,6 9,17 4,12" />
                          </svg>
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
