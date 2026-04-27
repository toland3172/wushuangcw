import type { Metadata } from "next";
import FinanceNavbar from "@/components/finance/Navbar";
import FinanceFooter from "@/components/finance/Footer";
import ContactForm from "@/components/finance/ContactForm";

export const metadata: Metadata = {
  title: "联系我们 - 株洲若水财税服务公司",
  description: "联系我们获取专业的财税咨询服务，电话：13517401680，微信：W13517401680",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FinanceNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">联系我们</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              专业的财税顾问团队，随时为您解答各类财税问题
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">联系方式</h2>

                <div className="space-y-6">
                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md">
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">联系电话</h3>
                      <a
                        href="tel:13517401680"
                        className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                      >
                        13517401680
                      </a>
                      <p className="text-gray-500 text-sm mt-1">工作时间：周一至周六 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md">
                    <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">微信咨询</h3>
                      <p className="text-xl font-bold text-gray-900">W13517401680</p>
                      <a
                        href="https://wa.me/8613517401680"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center mt-1"
                      >
                        点击添加微信
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md">
                    <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">公司地址</h3>
                      <p className="text-gray-700">
                        湖南省株洲市石峰区田心街道
                        <br />
                        新明路169号田心公馆8栋111号
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md">
                    <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-2xl">⏰</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">服务时间</h3>
                      <p className="text-gray-700">
                        周一至周六：9:00 - 18:00
                        <br />
                        周日：预约服务
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <span className="text-4xl block mb-2">🗺️</span>
                    <p>地图位置</p>
                    <p className="text-sm">株洲市石峰区田心街道</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">在线咨询</h2>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact Banner */}
        <section className="py-16 bg-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">快捷联系</h2>
            <p className="text-blue-100 mb-8">扫描下方二维码或直接拨打电话，快速获取专业咨询</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:13517401680"
                className="flex items-center bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <span className="text-2xl mr-3">📞</span>
                13517401680
              </a>
              <a
                href="https://wa.me/8613517401680"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <span className="text-2xl mr-3">💬</span>
                添加微信
              </a>
            </div>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
