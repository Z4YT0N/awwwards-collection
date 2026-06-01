"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="absolute inset-0">
          <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M0 .5H32M.5 0V32" fill="none" stroke="rgb(226 232 240 / 0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* 闪光标记 */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              <SparklesIcon className="w-4 h-4 mr-1 text-blue-600" />
              AI新体验
            </span>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              将
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  世界知识
                </span>
                <span className="absolute -inset-1 bg-blue-100/40 blur-md" />
              </span>
              装进口袋
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              基于中文模型优化的AI对话助手，为中文用户提供极致的对话体验。智能、高效、便捷，随时随地获取知识、解答疑惑。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#download"
              className="group relative rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-2xl"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur" />
              <span className="relative flex items-center">
                <span>免费下载</span>
                <svg className="ml-2 -mr-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </a>
            <a
              href="#features"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors flex items-center group"
            >
              了解更多 
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </motion.div>

          {/* 预览图 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 flow-root px-4"
          >
            <div className="relative">
              {/* 装饰光环 */}
              <div className="absolute -inset-x-2 -top-16 -bottom-16 flex justify-center">
                <div className="w-[800px] h-[600px] bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-purple-400/20 blur-3xl" />
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
                {/* 顶部状态栏 */}
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                {/* 应用界面 */}
                <div className="bg-white p-4">
                  <img src="./p-1.png" alt="应用截图" className="aspect-[9/16] w-full max-w-xs mx-auto bg-gray-100 rounded-xl shadow-inner" />
                </div>

              </div>
              
              {/* 装饰元素 */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
                <div className="w-32 h-32 rounded-full bg-blue-400/20 blur-2xl" />
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                <div className="w-32 h-32 rounded-full bg-cyan-400/20 blur-2xl" />
              </div>
            </div>
          </motion.div>

          {/* 信任标记 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 flex justify-center gap-x-6 grayscale opacity-50"
          >
            <div className="flex gap-x-4 items-center text-sm text-gray-500">
              <span className="font-medium">已获用户信任</span>
              <span className="h-4 w-px bg-gray-300" />
              <span className="font-semibold text-gray-900">10,000+</span>
            </div>
            <div className="flex gap-x-4 items-center text-sm text-gray-500">
              <span className="font-medium">App Store 评分</span>
              <span className="h-4 w-px bg-gray-300" />
              <span className="font-semibold text-gray-900">4.8 / 5.0</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;