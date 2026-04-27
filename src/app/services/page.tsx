import type { Metadata } from "next";
import FinanceNavbar from "@/components/finance/Navbar";
import FinanceFooter from "@/components/finance/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务项目 - 株洲若水财税服务公司",
  description: "专业提供代理记账、税务筹划、公司注册、财务咨询等财税服务",
};

const services = [
  {
    id: "agency-accounting",
    icon: "📋",
    title: "代理记账",
    price: "面议",
    features: [
      "日常账务处理",
      "月度/季度纳税申报",
      "年度企业所得税汇算清缴",
      "财务报表编制",
      "凭证装订整理",
      "税务异常处理",
    ],
    suitable: "适用于各类中小企业、新成立公司",
  },
  {
    id: "tax-planning",
    icon: "💰",
    title: "税务筹划",
    price: "面议",
    features: [
      "企业税务健康检查",
      "合法节税方案设计",
      "最新税收优惠政策申请",
      "税务风险评估与防控",
      "个人所得税筹划",
      "专项税务咨询服务",
    ],
    suitable: "适用于有节税需求的企业和高收入人群",
  },
  {
    id: "company-registration",
    icon: "🏢",
    title: "公司注册/变更",
    price: "面议",
    features: [
      "公司注册登记",
      "工商变更（股权、经营范围等）",
      "公司注销",
      "营业执照办理",
      "银行开户协助",
      "税务登记",
    ],
    suitable: "适用于新创业者和需要变更的企业",
  },
  {
    id: "financial-consulting",
    icon: "📊",
    title: "财务咨询",
    price: "面议",
    features: [
      "财务制度建立",
      "成本核算优化",
      "内控体系建设",
      "财务人员培训",
      "投资决策支持",
      "上市财务顾问",
    ],
    suitable: "适用于需要规范化管理的企业",
  },
  {
    id: "qualification",
    icon: "🎓",
    title: "资质代办",
    price: "面议",
    features: [
      "建筑资质代办",
      "食品经营许可证",
      "医疗器械许可证",
      "进出口经营权",
      "各类许可证照办理",
      "资质升级咨询",
    ],
    suitable: "适用于需要特殊经营资质的企业",
  },
  {
    id: "training",
    icon: "📚",
    title: "业务培训",
    price: "面议",
    features: [
      "会计实操培训",
      "最新财税政策解读",
      "金蝶/用友软件培训",
      "税务筹划培训",
      "企业内训定制",
      "在线学习平台",
    ],
    suitable: "适用于需要提升财务能力的企业和个人",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">服务项目</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              为企业提供全方位的财税服务解决方案，总有一款适合您
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-5xl">{service.icon}</span>
                      <div className="text-right">
                        <p className="text-blue-200 text-sm">参考价格</p>
                        <p className="text-2xl font-bold">{service.price}</p>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mt-4">{service.title}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-semibold">适用场景：</span>
                        {service.suitable}
                      </p>
                      <Link
                        href="/contact"
                        className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        立即咨询
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">服务流程</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "需求沟通", desc: "了解您的具体需求" },
                { step: "2", title: "方案制定", desc: "量身定制服务方案" },
                { step: "3", title: "签订合同", desc: "明确双方权利义务" },
                { step: "4", title: "服务执行", desc: "专业团队高效服务" },
                { step: "5", title: "定期回访", desc: "持续跟踪服务效果" },
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 -z-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">需要定制服务？</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              我们会根据您的实际需求，量身定制最适合您的财税服务方案
            </p>
            <a
              href="tel:13517401680"
              className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              📞 拨打热线：13517401680
            </a>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
