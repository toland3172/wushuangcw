import type { Metadata } from "next";
import FinanceNavbar from "@/components/finance/Navbar";
import FinanceFooter from "@/components/finance/Footer";
import Link from "next/link";
import ServiceGrid from "@/components/finance/ServiceGrid";

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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FinanceNavbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              专业财税服务，<span className="text-blue-200">助力企业腾飞</span>
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              株洲若水财税，为企业提供财务外包、税务服务、财务咨询、香港公司服务、高新与IPO服务等一站式专业解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:13517401680" className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                📞 立即致电：13517401680
              </a>
              <a
                href="#"
                onClick="event.preventDefault(); document.dispatchEvent(new CustomEvent('open-chat'));"
                className="inline-flex items-center justify-center border-2 border-white/40 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                💬 AI客服小若在线咨询
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">我们的服务</h2>
            <p className="text-lg text-gray-500 text-center mb-8">全方位财税解决方案，满足企业不同阶段需求</p>
            <ServiceGrid />
            <div className="text-center mt-8">
              <Link href="/services" className="text-blue-600 hover:text-blue-700 text-lg font-medium">
                查看全部服务详情 →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">为什么选择我们</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🏆", title: "专业资质", desc: "专业财税服务资质" },
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

        <section className="py-12 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">需要财税服务？</h2>
            <p className="text-xl text-blue-100 mb-8">专业团队为您解答各类财税问题</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:13517401680" className="inline-flex items-center bg-white text-blue-700 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-50 transition-colors">
                📞 拨打热线：13517401680
              </a>
              <a
                href="#"
                onClick="event.preventDefault(); document.dispatchEvent(new CustomEvent('open-chat'));"
                className="inline-flex items-center bg-blue-500 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-400 transition-colors"
              >
                💬 AI客服在线咨询
              </a>
            </div>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
