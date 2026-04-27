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

const services = [
  { icon: "📋", title: "代理记账" },
  { icon: "💰", title: "税务筹划" },
  { icon: "🏢", title: "公司注册" },
  { icon: "📊", title: "财务咨询" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FinanceNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              专业财税服务
              <br />
              <span className="text-blue-200">助力企业腾飞</span>
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              株洲若水财税，为企业提供代理记账、税务筹划、公司注册等一站式专业服务
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:13517401680" className="inline-flex items-center justify-center bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
                📞 立即致电：13517401680
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10">
                💬 在线咨询
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Services */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">我们的服务</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => (
                <Link key={service.title} href="/services" className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="font-semibold text-gray-900">{service.title}</div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/services" className="text-blue-600 hover:text-blue-700 font-medium">
                查看全部服务 →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">为什么选择我们</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🏆", title: "专业资质", desc: "正规代理记账资质" },
                { icon: "🤝", title: "贴心服务", desc: "一对一专属服务" },
                { icon: "💡", title: "合理收费", desc: "透明定价无隐形费用" },
                { icon: "🔒", title: "数据安全", desc: "严格保密财务信息" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">需要财税服务？</h2>
            <p className="text-blue-100 mb-6">专业团队为您解答各类财税问题</p>
            <a href="tel:13517401680" className="inline-flex items-center bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
              📞 拨打热线：13517401680
            </a>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
