"use client";

import { 
  GithubIcon, 
  MailIcon, 
  MessageSquareIcon,
  BookOpenIcon,
  GlobeIcon,
  ShieldIcon,
  HeartIcon,
  RssIcon
} from "lucide-react";

const navigation = {
  product: [
    { name: "功能特性", href: "#features" },
    { name: "应用下载", href: "#download" },
    { name: "更新日志", href: "#" },
    { name: "开发计划", href: "#" },
  ],
  community: [
    { name: "开发者社区", href: "#developer" },
    { name: "技术博客", href: "#" },
    { name: "问题反馈", href: "#" },
    { name: "加入我们", href: "#" },
  ],
  legal: [
    { name: "隐私政策", href: "#" },
    { name: "使用条款", href: "#" },
    { name: "免责声明", href: "#" },
  ],
  social: [
    {
      name: "微信社区",
      href: "#",
      icon: MessageSquareIcon,
      value: "1796060717",
    },
    {
      name: "GitHub",
      href: "https://github.com/langgptai",
      icon: GithubIcon,
    },
    {
      name: "邮箱",
      href: "mailto:ethereal_ai@hotmail.com",
      icon: MailIcon,
      value: "ethereal_ai@hotmail.com",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* 品牌区域 */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">🤖</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                口袋AI
              </span>
            </div>
            
            {/* 简介 */}
            <p className="text-sm leading-6 text-gray-600">
              让每个人都能轻松获取AI的力量，将世界知识装进口袋。
            </p>

            {/* 社交链接 */}
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* 导航区域 */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* 产品 */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">产品</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-blue-500 transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 社区 */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">社区</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.community.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-blue-500 transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* 联系方式和法律信息 */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* 联系方式 */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">联系我们</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.social.map((item) => (
                    <li key={item.name} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm leading-6 text-gray-600">
                        {item.value || item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 法律信息 */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">法律</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-blue-500 transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          {/* 特性标签 */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {[
              { text: "全平台支持", icon: GlobeIcon },
              { text: "安全加密", icon: ShieldIcon },
              { text: "持续更新", icon: RssIcon },
              { text: "用心服务", icon: HeartIcon },
              { text: "知识共享", icon: BookOpenIcon },
            ].map((tag) => (
              <span
                key={tag.text}
                className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700 ring-1 ring-inset ring-blue-700/10"
              >
                <tag.icon className="h-4 w-4 mr-2" />
                {tag.text}
              </span>
            ))}
          </div>

          {/* 版权信息 */}
          <div className="mt-8 border-t border-gray-900/10 pt-8 flex flex-col items-center">
            <p className="text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} 口袋AI. All rights reserved.
            </p>
            {/* ICP备案信息 */}
            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors duration-200"
              >
                京ICP备XXXXXXXX号-1
              </a>
              <span>|</span>
              <a
                href="http://www.beian.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors duration-200"
              >
                京公网安备 XXXXXXXXXXXXX号
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;