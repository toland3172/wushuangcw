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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">联系我们</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              专业的财税顾问团队，随时为您解答各类财税问题
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14">
              {/* Contact Info */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-10">联系方式</h2>

                <div className="space-y-8">
                  <div className="flex items-start p-8 bg-white rounded-xl shadow-md">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                      <span className="text-3xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">联系电话</h3>
                      <a
                        href="tel:13517401680"
                        className="text-3xl font-bold text-blue-600 hover:text-blue-700"
                      >
                        13517401680
                      </a>
                      <p className="text-lg text-gray-500 mt-2">工作时间：周一至周六 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start p-8 bg-white rounded-xl shadow-md">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                      <span className="text-3xl">💬</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">微信咨询</h3>
                      <p className="text-2xl font-bold text-gray-900">W13517401680</p>
                      <a
                        href="https://wa.me/8613517401680"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-blue-600 hover:text-blue-700 inline-flex items-center mt-2"
                      >
                        点击添加微信
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start p-8 bg-white rounded-xl shadow-md">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                      <span className="text-3xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">公司地址</h3>
                      <p className="text-xl text-gray-700">
                        湖南省株洲市石峰区田心街道
                        <br />
                        新明路169号田心公馆8栋111号
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-8 bg-white rounded-xl shadow-md">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                      <span className="text-3xl">⏰</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">服务时间</h3>
                      <p className="text-xl text-gray-700">
                        周一至周六：9:00 - 18:00
                        <br />
                        周日：预约服务
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-10">在线留言</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <FinanceFooter />
    </div>
  );
}
