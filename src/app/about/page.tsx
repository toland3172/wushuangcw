import type { Metadata } from "next";
import FinanceNavbar from "@/components/finance/Navbar";
import FinanceFooter from "@/components/finance/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于我们 - 株洲若水财税服务公司",
  description: "了解株洲若水财税服务公司的企业文化、发展历程和服务理念",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FinanceNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">关于我们</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              专注财税服务多年，以专业、高效、诚信的服务理念，助力企业稳健发展
            </p>
          </div>
        </section>

        {/* Company Intro */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">公司简介</h2>
                <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                  <p>
                    <strong>株洲若水财税服务公司</strong>是一家专业的财税服务机构，位于湖南省株洲市石峰区。公司致力于为中小企业提供全方位的财务外包、税务服务、财务咨询等专业服务。
                  </p>
                  <p>
                    "若水"出自老子《道德经》"上善若水"，寓意我们追求像水一样柔顺而有力的服务品质，以专业知识和真诚态度为客户排忧解难。
                  </p>
                  <p>
                    公司拥有一支经验丰富的专业团队，团队成员均具备中级会计职称证书和丰富的实战经验，能够为客户提供高质量的财税服务。
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">我们的价值观</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <span className="text-4xl mr-5">🎯</span>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">专业</h4>
                      <p className="text-lg text-gray-600">深耕财税领域，持续学习提升</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-4xl mr-5">🤝</span>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">诚信</h4>
                      <p className="text-lg text-gray-600">诚实守信，保护客户信息安全</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-4xl mr-5">⚡</span>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">高效</h4>
                      <p className="text-lg text-gray-600">快速响应，及时解决问题</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-4xl mr-5">💡</span>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">创新</h4>
                      <p className="text-lg text-gray-600">与时俱进，提供智能化服务</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Scope */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">经营范围</h2>
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">一般项目</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-xl text-gray-600 mb-10">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  财务咨询
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  税务服务
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  企业管理咨询
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  代理记账
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  商务代理代办服务
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  市场营销策划
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  信息咨询服务
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  教育咨询服务
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">许可项目</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-xl text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  代理记账许可
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Qualifications */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">资质荣誉</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🏅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">多年行业经验</h3>
                <p className="text-lg text-gray-600">深耕财税领域，服务众多中小企业</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">📜</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">专业团队认证</h3>
                <p className="text-lg text-gray-600">团队成员均持有中级会计职称证书</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">信息安全保障</h3>
                <p className="text-lg text-gray-600">严格的信息保密制度和数据安全措施</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">想了解更多？</h2>
            <p className="text-xl text-blue-100 mb-8">欢迎来电咨询或到公司实地考察</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:13517401680" className="inline-flex items-center bg-white text-blue-700 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-50">
                📞 拨打热线：13517401680
              </a>
            </div>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
