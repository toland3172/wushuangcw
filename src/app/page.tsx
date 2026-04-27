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
  {
    icon: "📋",
    title: "代理记账",
    desc: "专业团队提供全流程记账报税服务，规范财务核算，降低企业运营成本",
  },
  {
    icon: "💰",
    title: "税务筹划",
    desc: "合法合规的税务筹划方案，合理节税避税，让企业轻装上阵",
  },
  {
    icon: "🏢",
    title: "公司注册",
    desc: "快速办理公司注册、变更、注销等手续，一站式企业服务",
  },
  {
    icon: "📊",
    title: "财务咨询",
    desc: "资深会计师提供专业财务顾问服务，助力企业科学决策",
  },
];

const advantages = [
  { number: "10+", label: "年行业经验" },
  { number: "500+", label: "服务客户" },
  { number: "99%", label: "客户满意度" },
  { number: "24h", label: "响应时效" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FinanceNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-700 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                专业财税服务
                <br />
                <span className="text-blue-200">助力企业腾飞</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                株洲若水财税服务公司，为企业提供代理记账、税务筹划、公司注册等一站式专业服务
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:13517401680"
                  className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  立即致电咨询
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
                >
                  了解更多服务
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12 shadow-lg -mt-8 relative z-10 mx-4 md:mx-auto max-w-6xl rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
            {advantages.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{item.number}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">我们的服务项目</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                为企业提供全方位的财税服务解决方案，让您的财务更规范、更高效
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                查看全部服务
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">为什么选择若水财税？</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">专业资质</h3>
                      <p className="text-gray-600">拥有财政局颁发的代理记账许可证，专业团队持证上岗</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">信息安全</h3>
                      <p className="text-gray-600">严格遵守财务保密制度，保障客户数据安全</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">高效响应</h3>
                      <p className="text-gray-600">24小时响应机制，及时解决您的财税问题</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">透明收费</h3>
                      <p className="text-gray-600">明码标价，无隐形收费，让您消费清清楚楚</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">免费咨询</h3>
                <p className="mb-6 text-blue-100">
                  立即拨打热线或添加微信，获取免费财税咨询服务
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:13517401680"
                    className="flex items-center text-xl font-semibold hover:text-blue-200"
                  >
                    📞 13517401680
                  </a>
                  <a
                    href="https://wa.me/8613517401680"
                    className="flex items-center text-xl font-semibold hover:text-blue-200"
                  >
                    💬 W13517401680
                  </a>
                </div>
                <div className="mt-8 pt-6 border-t border-blue-500">
                  <p className="text-blue-100 text-sm">
                    📍 地址：湖南省株洲市石峰区田心街道新明路169号田心公馆8栋111号
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">准备好开始了吗？</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              无论是新公司注册还是代理记账需求，我们都能为您提供专业的解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:13517401680"
                className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                📞 立即拨打热线
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
              >
                填写咨询表单
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
