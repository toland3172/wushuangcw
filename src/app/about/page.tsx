import type { Metadata } from "next";
import FinanceNavbar from "@/components/finance/Navbar";
import FinanceFooter from "@/components/finance/Footer";

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              专注财税服务多年，以专业、高效、诚信的服务理念，助力企业稳健发展
            </p>
          </div>
        </section>

        {/* Company Intro */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">公司简介</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong>株洲若水财税服务公司</strong>是一家专业的财税服务机构，位于湖南省株洲市石峰区。公司致力于为中小企业提供全方位的财务咨询、税务筹划和代理记账服务。
                  </p>
                  <p>
                    "若水"出自老子《道德经》"上善若水"，寓意我们追求像水一样柔顺而有力的服务品质，以专业知识和真诚态度为客户排忧解难。
                  </p>
                  <p>
                    公司拥有一支经验丰富的专业团队，团队成员均具备会计从业资格证和丰富的实战经验，能够为客户提供高质量的财税服务。
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">我们的价值观</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">🎯</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">专业</h4>
                      <p className="text-gray-600 text-sm">深耕财税领域，持续学习提升</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">🤝</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">诚信</h4>
                      <p className="text-gray-600 text-sm">诚实守信，保护客户信息安全</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">⚡</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">高效</h4>
                      <p className="text-gray-600 text-sm">快速响应，及时解决问题</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">💡</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">创新</h4>
                      <p className="text-gray-600 text-sm">与时俱进，提供智能化服务</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">经营范围</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">一般项目</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-gray-600 mb-8">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  财务咨询
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  税务服务
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  企业管理咨询
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  信息咨询服务
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  商务代理代办服务
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  互联网销售
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  业务培训
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  软件开发与技术服务
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">许可项目</h3>
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-700">
                  <strong>代理记账</strong>（依法须经批准的项目，经相关部门批准后方可开展经营活动）
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">我们的团队</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-5xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">专业团队</h3>
                <p className="text-gray-600">多名资深会计师，平均10年以上行业经验</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-5xl">📜</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">持证上岗</h3>
                <p className="text-gray-600">全员持有会计从业资格证等专业资质</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-5xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">持续学习</h3>
                <p className="text-gray-600">定期培训，紧跟财税政策变化</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
