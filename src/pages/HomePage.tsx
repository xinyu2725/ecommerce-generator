import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: '商品任务',
    description: '创建和管理商品主图与文案生成任务',
    path: '/tasks',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    color: 'bg-blue-500',
  },
  {
    title: '模板库',
    description: '收藏和管理图文模板，快速复用',
    path: '/templates',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    color: 'bg-green-500',
  },
  {
    title: '设置',
    description: '配置默认生成规则和风格偏好',
    path: '/settings',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    color: 'bg-purple-500',
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎使用</h2>
        <p className="text-gray-600">电商商品主图与文案生成工具帮助您快速生成优质的商品展示图和营销文案</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">商品任务</p>
            </div>
          </div>
          <Link to="/tasks" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            查看全部 →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">收藏模板</p>
            </div>
          </div>
          <Link to="/templates" className="text-green-600 hover:text-green-700 text-sm font-medium">
            查看全部 →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">生成内容</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">本周已完成</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">快速入口</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">开始使用</h3>
        <p className="text-primary-100 mb-4">点击下方按钮，立即创建您的第一个商品任务</p>
        <Link
          to="/tasks"
          className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          创建任务
        </Link>
      </div>
    </div>
  );
};