import type { Metadata } from "next";
import FinanceNavbar from "@/components/finance/Navbar";
import FinanceFooter from "@/components/finance/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "株洲若水财税服务公司 - 专业财务咨询/代理记账/税务筹划",
  description:
    "株洲若水财税专注为中小企业提供代理记账、税务筹划、公司注册、财务咨询等专业服务，助力企业稳健发展。联系电话：13517401680",
  keywords: [
    "株洲财税",
    "代理记账",
    "税务筹划",
    "公司注册",
    "财务咨询",
    "株洲会计",
    "石峰区财税",
  ],
};

const serviceCategories = [
  {
    icon: "📋",
    title: "财务外包",
    items: ["日常账务处理", "财务报表编制", "凭证整理与装订", "财务档案管理"],
    suitable: "中小企业、初创公司、不想自聘会计的企业",
  },
  {
    icon: "💰",
    title: "税务服务",
    items: ["税务健康检查", "纳税申报协助", "汇算清缴辅导", "税收优惠政策申请", "税务筹划", "个人所得税筹划", "研发费用加计扣除"],
    suitable: "有专项需求的企业和高收入人群",
  },
  {
    icon: "📊",
    title: "财务咨询",
    items: ["财务制度建设", "财务分析", "成本核算优化", "内控体系建设", "财务人员培训", "投资决策支持", "上市财务顾问"],
    suitable: "需要规范化、拟上市或融资的企业",
  },
  {
    icon: "🌐",
    title: "香港公司服务",
    items: ["香港公司账务处理", "香港公司审计协助", "跨境税务咨询"],
    suitable: "已注册香港公司的内地企业、跨境电商",
  },
  {
    icon: "🚀",
    title: "高新与IPO服务",
    items: ["高新技术企业认定辅导", "研发费用归集辅导", "IPO前期合规辅导"],
    suitable: "有核心技术、融资或上市需求的企业",
  },
  {
    icon: "📚",
    title: "培训与赋能",
    items: ["会计实操培训", "财税政策解读", "金蝶/用友软件培训", "税务筹划培训", "企业内训定制", "老板财税通识课"],
    suitable: "财务人员、企业主、创业者",
  },
  {
    icon: "🎁",
    title: "增值服务",
    items: ["公司注册/变更（合作代办）", "资质代办（合作代办）", "银行开户协助", "税务登记协助"],
    suitable: "初创企业、需要变更或资质的企业",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FinanceNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              专业财税服务
              <br />
              <span className="text-blue-200">助力企业腾飞</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              株洲若水财税，为企业提供财务外包、税务服务、财务咨询、香港公司服务、高新与IPO服务等一站式专业解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:13517401680" className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-50">
                📞 立即致电：13517401680
              </a>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">我们的服务</h2>
            <p className="text-lg text-gray-500 text-center mb-12">全方位财税解决方案，满足企业不同阶段需求</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((category) => (
                <Link key={category.title} href="/services" className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 group">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700">{category.title}</h3>
                  <ul className="space-y-1 mb-4">
                    {category.items.map((item) => (
                      <li key={item} className="text-base text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-blue-600 font-medium">适用：{category.suitable}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services" className="text-blue-600 hover:text-blue-700 text-xl font-medium">
                查看全部服务详情 →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">为什么选择我们</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🏆", title: "专业资质", desc: "正规代理记账资质" },
                { icon: "🤝", title: "贴心服务", desc: "一对一专属服务" },
                { icon: "💡", title: "合理收费", desc: "透明定价无隐形费用" },
                { icon: "🔒", title: "数据安全", desc: "严格保密财务信息" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="text-xl font-bold text-gray-900">{item.title}</div>
                  <div className="text-base text-gray-600 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">需要财税服务？</h2>
            <p className="text-xl text-blue-100 mb-8">专业团队为您解答各类财税问题</p>
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
