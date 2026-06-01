"use client";

import { motion } from "framer-motion";
import { 
  DevicePhoneMobileIcon,
  StarIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const downloadButtons = [
  {
    platform: "iOS",
    icon: DevicePhoneMobileIcon,
    href: "https://langgptai.feishu.cn/wiki/JsHtwVhszi302lk1BBZctJhWnvb",
    storeName: "App Store",
    rating: 4.8,
    ratingCount: "2.3k",
    size: "28.5 MB",
    version: "1.2.0",
    systemReq: "iOS 13.0 或更高版本"
  },
  {
    platform: "Android",
    icon: DevicePhoneMobileIcon,
    href: "https://langgptai.feishu.cn/wiki/JsHtwVhszi302lk1BBZctJhWnvb",
    storeName: "Google Play",
    rating: 4.7,
    ratingCount: "3.1k",
    size: "32.1 MB",
    version: "1.2.0",
    systemReq: "Android 8.0 或更高版本"
  }
];

const Download = () => {
  return (
    <section id="download" className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px]">
            <div className="absolute inset-0 rotate-12 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6">
              <SparklesIcon className="w-4 h-4 mr-1" />
              立即体验
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              让AI随身相伴，
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                知识随手可得
              </span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              扫描二维码或选择对应平台下载，开启您的AI助手之旅
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 左侧：下载按钮和评分 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {downloadButtons.map((button, index) => (
                <div
                  key={button.platform}
                  className="group relative rounded-2xl bg-white p-2 transition-all duration-300 hover:shadow-xl"
                >
                  {/* 按钮背景 */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur" />
                  
                  {/* 按钮内容 */}
                  <div className="relative rounded-xl bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                          <button.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {button.platform} 版本
                          </h3>
                          <p className="text-sm text-gray-500">{button.storeName}</p>
                        </div>
                      </div>
                      {/* 评分 */}
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(button.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            ({button.ratingCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 下载信息 */}
                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-500">
                      <div>
                        <p className="text-gray-400">大小</p>
                        <p className="mt-1 font-medium text-gray-900">{button.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">版本</p>
                        <p className="mt-1 font-medium text-gray-900">{button.version}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">系统要求</p>
                        <p className="mt-1 font-medium text-gray-900">{button.systemReq}</p>
                      </div>
                    </div>

                    {/* 下载按钮 */}
                    <div className="mt-6">
                      <a
                        href={button.href}
                        className="group relative flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:from-blue-500 hover:to-cyan-500"
                      >
                        <ArrowDownTrayIcon className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                        立即下载
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* 右侧：二维码 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* 装饰元素 */}
                <div className="absolute -inset-4">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-xl" />
                </div>

                {/* 二维码卡片 */}
                <div className="relative rounded-2xl bg-white p-8 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl" />
                  <div className="relative">
                    {/* 二维码 */}
                    <div className="aspect-square w-72 rounded-xl bg-white p-4 shadow-inner">
                      <div className="flex h-full items-center justify-center">
                        <img src="./download_qr.png" alt="二维码" className="h-full w-full" />
                      </div>
                    </div>

                    {/* 提示文本 */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-900">
                        扫描二维码下载最新版本
                      </p>
                      <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
                        <ShieldCheckIcon className="h-4 w-4 mr-1" />
                        已通过应用商店安全认证
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 底部特性标签 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {[
              "极速下载",
              "安全无毒",
              "隐私保护",
              "免费使用",
              "持续更新",
              "云端同步"
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700 ring-1 ring-inset ring-blue-700/10"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Download;