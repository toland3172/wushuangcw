import Link from "next/link";

export default function FinanceFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">若</span>
              </div>
              <span className="text-xl font-bold text-white">株洲若水财税服务公司</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              专注为中小企业提供专业的财务咨询、税务筹划和代理记账服务，以专业、高效、诚信的服务理念，助力企业稳健发展。
            </p>
            <div className="flex space-x-4">
              <a href="tel:13517401680" className="hover:text-white transition-colors">
                📞 13517401680
              </a>
              <a href="https://wa.me/8613517401680" className="hover:text-white transition-colors">
                💬 W13517401680
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">首页</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">关于我们</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">服务项目</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">服务项目</h3>
            <ul className="space-y-2 text-gray-400">
              <li>代理记账</li>
              <li>税务筹划</li>
              <li>公司注册</li>
              <li>财务咨询</li>
            </ul>
          </div>
        </div>

        {/* Address */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-gray-500 text-sm text-center">
            📍 湖南省株洲市石峰区田心街道新明路169号田心公馆8栋111号
          </p>
          <p className="text-gray-600 text-xs text-center mt-2">
            © {new Date().getFullYear()} 株洲若水财税服务公司 版权所有
          </p>
        </div>
      </div>
    </footer>
  );
}
