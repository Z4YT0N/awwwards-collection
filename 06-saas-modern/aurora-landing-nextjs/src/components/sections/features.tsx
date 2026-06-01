"use client";

import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  BoltIcon,
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "中文优化对话体验",
    description: "基于中文大语言模型深度优化，完美理解中文语境和表达方式，对话更自然流畅。",
    icon: ChatBubbleLeftRightIcon,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "智能交互界面",
    description: "精心设计的交互体验，简洁直观的操作方式，让AI对话像聊天一样轻松自如。",
    icon: CursorArrowRaysIcon,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "强大的知识引擎",
    description: "海量知识库支持，从科技前沿到人文历史，助您探索世界的每个角落。",
    icon: SparklesIcon,
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "隐私安全保障",
    description: "采用先进的数据加密技术，严格的隐私保护机制，确保您的数据安全。",
    icon: ShieldCheckIcon,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "高效网络处理",
    description: "智能网络优化与重试机制，即使在不稳定的网络环境下也能保持流畅体验。",
    icon: BoltIcon,
    color: "from-blue-500 to-violet-500",
  },
  {
    name: "多语言支持",
    description: "支持中英日韩等多种语言互译，打破语言壁垒，连接世界对话。",
    icon: GlobeAltIcon,
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "AI创作助手",
    description: "提供写作、绘画、代码等多领域创作辅助，激发您的创意灵感。",
    icon: DocumentTextIcon,
    color: "from-red-500 to-rose-500",
  },
  {
    name: "场景化定制",
    description: "根据不同使用场景优化体验，适配学习、工作、娱乐等多种需求。",
    icon: UserGroupIcon,
    color: "from-fuchsia-500 to-pink-500",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        <div className="absolute inset-0">
          <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="features-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M0 .5H32M.5 0V32" fill="none" stroke="rgb(226 232 240 / 0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#features-grid)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              产品特性
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              为中文用户打造的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                {" "}AI 助手
              </span>
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              深入理解中文用户需求，精心打造每一个功能特性，只为提供最佳的AI对话体验
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative group">
                  {/* 卡片内容 */}
                  <div className="relative z-10 bg-white rounded-2xl p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
                    {/* 图标背景 */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-300" />
                    <div className="relative">
                      {/* 图标 */}
                      <div className="relative h-12 w-12">
                        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.color} opacity-10`} />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                          <feature.icon
                            className={`h-6 w-6 bg-gradient-to-r ${feature.color} [&>path]:fill-transparent [&>path]:stroke-[url(#gradient)] stroke-2`}
                            aria-hidden="true"
                          />
                          <svg width="0" height="0">
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" className="[stop-color:var(--tw-gradient-from)]" />
                                <stop offset="100%" className="[stop-color:var(--tw-gradient-to)]" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      {/* 标题和描述 */}
                      <dt className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-600">
                        {feature.description}
                      </dd>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* 技术指标 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24 rounded-2xl bg-gray-50 p-8"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">99.9%</div>
              <div className="mt-2 text-sm text-gray-600">服务可用性</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">&lt;100ms</div>
              <div className="mt-2 text-sm text-gray-600">平均响应时间</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="mt-2 text-sm text-gray-600">专业领域覆盖</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">10M+</div>
              <div className="mt-2 text-sm text-gray-600">日对话次数</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;