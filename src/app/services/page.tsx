import type { Metadata } from "next";
import FinanceNavbar from "@/components/finance/Navbar";
import FinanceFooter from "@/components/finance/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务项目 - 株洲若水财税服务公司",
  description: "专业提供财务外包、税务服务、财务咨询、香港公司服务、高新与IPO服务、培训与赋能、增值服务等财税服务",
};

const services = [
  {
    icon: "📋",
    title: "财务外包",
    features: [
      "日常账务处理",
      "财务报表编制",
      "凭证整理与装订",
      "财务档案管理",
    ],
    suitable: "中小企业、初创公司、不想自聘会计的企业",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "💰",
    title: "税务服务",
    features: [
      "税务健康检查",
      "纳税申报协助",
      "汇算清缴辅导",
      "税收优惠政策申请",
      "税务筹划",
      "个人所得税筹划",
      "研发费用加计扣除",
    ],
    suitable: "有专项需求的企业和高收入人群",
    color: "from-green-500 to-green-600",
  },
  {
    icon: "📊",
    title: "财务咨询",
    features: [
      "财务制度建设",
      "财务分析",
      "成本核算优化",
      "内控体系建设",
      "财务人员培训",
      "投资决策支持",
      "上市财务顾问",
    ],
    suitable: "需要规范化、拟上市或融资的企业",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: "🌐",
    title: "香港公司服务",
    features: [
      "香港公司账务处理",
      "香港公司审计协助",
      "跨境税务咨询",
    ],
    suitable: "已注册香港公司的内地企业、跨境电商",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: "🚀",
    title: "高新与IPO服务",
    features: [
      "高新技术企业认定辅导",
      "研发费用归集辅导",
      "IPO前期合规辅导",
    ],
    suitable: "有核心技术、融资或上市需求的企业",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: "📚",
    title: "培训与赋能",
    features: [
      "会计实操培训",
      "财税政策解读",
      "金蝶/用友软件培训",
      "税务筹划培训",
      "企业内训定制",
      "老板财税通识课",
    ],
    suitable: "财务人员、企业主、创业者",
    color: "from-red-500 to-red-600",
  },
  {
    icon: "🎁",
    title: "增值服务",
    features: [
      "公司注册/变更（合作代办）",
      "资质代办（合作代办）",
      "银行开户协助",
      "税务登记协助",
    ],
    suitable: "初创企业、需要变更或资质的企业",
    color: "from-teal-500 to-teal-600",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FinanceNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">服务项目</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              全方位财税解决方案，从基础记账到上市辅导，满足企业不同阶段需求
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {services.map((service, index) => (
              <div key={service.title} id={service.title} className={`flex flex-col lg:flex-row gap-8 items-stretch ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Icon Card */}
                <div className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 lg:w-1/3 flex flex-col justify-center text-white`}>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h2 className="text-3xl font-bold mb-3">{service.title}</h2>
                  <p className="text-lg opacity-90">适用：{service.suitable}</p>
                </div>

                {/* Features */}
                <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">服务内容</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <span className="text-blue-500 mr-3 text-lg">✓</span>
                        <span className="text-lg text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href="/contact" className="inline-flex items-center text-lg text-blue-600 hover:text-blue-700 font-medium">
                      咨询该服务 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">找不到您需要的服务？</h2>
            <p className="text-xl text-blue-100 mb-8">我们提供定制化财税解决方案，欢迎来电咨询</p>
            <a href="tel:13517401680" className="inline-flex items-center bg-white text-blue-700 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-50">
              📞 拨打热线：13517401680
            </a>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
