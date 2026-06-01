"use client";

import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const communityFeatures = [
  {
    name: "开放源代码",
    description: "核心功能开源，支持社区贡献和创新",
    icon: CodeBracketIcon,
  },
  {
    name: "活跃社区",
    description: "数千开发者在线交流与分享经验",
    icon: UserGroupIcon,
  },
  {
    name: "技术支持",
    description: "专业的技术团队提供支持服务",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "完善文档",
    description: "详尽的API文档和开发指南",
    icon: BookOpenIcon,
  },
];

const Developer = () => {
  return (
    <section id="developer" className="py-24 lg:py-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 blur-3xl opacity-30" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  开发者社区
                </span>
              </div>
              
              <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                加入充满创造力的
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  开发者社区
                </span>
              </h2>
              
              <p className="mt-6 text-lg leading-8 text-gray-600">
                由云中江树开发，LangGPT 提示词社区全力支持。我们致力于打造最好的中文AI开发平台，期待与您一起探索AI的无限可能。
              </p>

              <div className="mt-10 space-y-6">
                {communityFeatures.map((feature) => (
                  <div
                    key={feature.name}
                    className="relative group"
                  >
                    <div className="absolute -inset-y-2 -inset-x-4 scale-95 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex-none">
                        <span className="inline-flex items-center justify-center rounded-lg bg-blue-50 p-3 group-hover:bg-blue-100 transition-colors duration-200">
                          <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          {feature.name}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex items-center gap-4">
                <a
                  href="https://langgptai.feishu.cn/wiki/RXdbwRyASiShtDky381ciwFEnpe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1d4ed8_0%,#60a5fa_50%,#1d4ed8_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-blue-600 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-blue-500 transition-colors duration-200">
                    加入开发者社区
                  </span>
                </a>
                
                <a
                  href="https://github.com/langgptai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gray-50 px-6 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  访问 GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* 右侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative lg:ml-4"
          >
            {/* 代码编辑器风格的展示 */}
            <div className="relative rounded-xl bg-gray-900 shadow-2xl">
              {/* 顶部装饰栏 */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-sm text-gray-400">developer.py</div>
              </div>
              
              {/* 代码内容 */}
              <div className="p-4 font-mono text-sm">
                <pre className="text-gray-300">
                  <span className="text-blue-400">class</span>{" "}
                  <span className="text-green-400">PocketAI</span>:
                  {"\n"}{"    "}
                  <span className="text-blue-400">def</span>{" "}
                  <span className="text-yellow-400">__init__</span>(self):
                  {"\n"}{"        "}self.version = "1.0.0"
                  {"\n"}{"        "}self.community = "Active"
                  {"\n"}{"        "}self.developers = "10000+"
                  {"\n"}
                  {"\n"}{"    "}
                  <span className="text-blue-400">def</span>{" "}
                  <span className="text-yellow-400">join_community</span>(self):
                  {"\n"}{"        "}
                  <span className="text-purple-400">print</span>
                  ("Welcome to PocketAI!")
                  {"\n"}{"        "}
                  <span className="text-gray-500"># Start your AI journey</span>
                </pre>
              </div>

              {/* 装饰性评论区 */}
              <div className="border-t border-gray-800 p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-300 font-medium">Developer</div>
                    <div className="mt-1 text-sm text-gray-400">
                      加入我们，一起探索 AI 的未来！🚀
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 装饰性浮动元素 */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Developer;