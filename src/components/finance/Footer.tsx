import Link from "next/link";

export default function FinanceFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <img 
                src="/logo.png" 
                alt="若水财税" 
                className="w-14 h-14 rounded-lg object-contain"
              />
              <span className="text-2xl font-bold text-white">株洲若水财税服务公司</span>
            </div>
            <p className="text-lg text-gray-400 mb-5 max-w-md">
              专注为中小企业提供专业的财务咨询、税务筹划和代理记账服务，以专业、高效、诚信的服务理念，助力企业稳健发展。
            </p>
            <div className="flex flex-col space-y-2">
              <a href="tel:13517401680" className="text-lg hover:text-white transition-colors">
                📞 13517401680
              </a>
              <a href="https://wa.me/8613517401680" className="text-lg hover:text-white transition-colors">
                💬 微信：W13517401680
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl text-white font-semibold mb-5">快速链接</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-lg hover:text-white transition-colors">首页</Link></li>
              <li><Link href="/about" className="text-lg hover:text-white transition-colors">关于我们</Link></li>
              <li><Link href="/services" className="text-lg hover:text-white transition-colors">服务项目</Link></li>
              <li><Link href="/contact" className="text-lg hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl text-white font-semibold mb-5">服务项目</h3>
            <ul className="space-y-3 text-lg text-gray-400">
              <li>财务外包</li>
              <li>税务服务</li>
              <li>财务咨询</li>
              <li>香港公司服务</li>
              <li>高新与IPO服务</li>
              <li>培训与赋能</li>
              <li>增值服务</li>
            </ul>
          </div>
        </div>

        {/* Address */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <p className="text-lg text-gray-500 text-center">
            📍 湖南省株洲市石峰区田心街道新明路169号田心公馆8栋111号
          </p>
          <p className="text-base text-gray-600 text-center mt-3">
            © {new Date().getFullYear()} 株洲若水财税服务公司 版权所有
          </p>
        </div>
      </div>
    </footer>
  );
}
