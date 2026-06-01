"use client";

import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";

const plans = [
  {
    name: "免费版",
    description: "适合个人用户体验",
    price: "0",
    features: [
      { name: "每日对话次数限制", value: "20次" },
      { name: "基础AI对话功能", included: true },
      { name: "基础知识库访问", included: true },
      { name: "上下文记忆（5轮）", included: true },
      { name: "广告展示", included: true },
      { name: "高级AI模型", included: false },
      { name: "自定义知识库", included: false },
      { name: "API 访问", included: false },
      { name: "技术支持", included: false },
    ],
    cta: "立即使用",
    ctaLink: "#download",
    popular: false,
  },
  {
    name: "专业版",
    description: "适合重度使用者",
    price: "19.9",
    period: "月",
    features: [
      { name: "无限对话次数", included: true },
      { name: "完整AI对话功能", included: true },
      { name: "完整知识库访问", included: true },
      { name: "上下文记忆（20轮）", included: true },
      { name: "无广告体验", included: true },
      { name: "高级AI模型", included: true },
      { name: "自定义知识库", included: true },
      { name: "API 访问", included: false },
      { name: "技术支持", value: "8/5" },
    ],
    cta: "升级专业版",
    ctaLink: "#",
    popular: true,
  },
  {
    name: "企业版",
    description: "适合团队和企业",
    price: "399",
    period: "月",
    features: [
      { name: "无限对话次数", included: true },
      { name: "完整AI对话功能", included: true },
      { name: "完整知识库访问", included: true },
      { name: "上下文记忆（无限）", included: true },
      { name: "无广告体验", included: true },
      { name: "高级AI模型", included: true },
      { name: "自定义知识库", included: true },
      { name: "API 访问", included: true },
      { name: "技术支持", value: "24/7" },
    ],
    cta: "联系我们",
    ctaLink: "https://langgptai.feishu.cn/wiki/RXdbwRyASiShtDky381ciwFEnpe",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      </div>

      <div className="container-custom">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            选择适合您的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              {" "}使用方案
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            我们提供灵活的价格方案，满足不同用户的需求。无论您是个人用户还是企业团队，都能找到合适的选择。
          </p>
        </motion.div>

        {/* 价格卡片 */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* 热门标签 */}
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 text-sm font-medium text-white text-center">
                  最受欢迎
                </div>
              )}

              {/* 价格卡片 */}
              <div className={`h-full rounded-3xl bg-white shadow-xl ring-1 ring-gray-200 p-8 ${
                plan.popular ? 'scale-105' : ''
              }`}>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  <div className="mt-6">
                    <p className="flex items-baseline">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        ¥{plan.price}
                      </span>
                      {plan.period && (
                        <span className="ml-1 text-sm font-semibold text-gray-600">
                          /{plan.period}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* 功能列表 */}
                  <ul role="list" className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {typeof feature.included === 'boolean' ? (
                          feature.included ? (
                            <CheckIcon className="h-5 w-5 text-blue-600" />
                          ) : (
                            <XIcon className="h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <CheckIcon className="h-5 w-5 text-blue-600" />
                        )}
                        <span className="ml-3 text-sm text-gray-700">
                          {feature.name}
                          {feature.value && ` (${feature.value})`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA 按钮 */}
                <div className="mt-8">
                  <a
                    href={plan.ctaLink}
                    className={`block w-full rounded-xl px-6 py-4 text-center text-sm font-semibold shadow-sm transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-blue-50 px-6 py-2">
            <span className="text-sm font-medium text-blue-700">
              所有方案均支持 7 天无理由退款，可随时取消订阅
            </span>
          </div>
          
          {/* 企业定制信息 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900">需要企业定制？</h3>
            <p className="mt-2 text-sm text-gray-600">
              我们提供企业级定制方案，包括专属部署、数据安全、团队管理等功能
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              联系销售团队
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;