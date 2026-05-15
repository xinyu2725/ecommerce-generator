import React, { useState } from 'react';

interface Settings {
  defaultImageStyle: string;
  defaultCopyStyle: string;
  autoSave: boolean;
  notificationEnabled: boolean;
  generateCount: number;
  discountThreshold: number;
}

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    defaultImageStyle: '简约现代风格',
    defaultCopyStyle: '促销风格',
    autoSave: true,
    notificationEnabled: true,
    generateCount: 4,
    discountThreshold: 20
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const imageStyles = ['简约现代风格', '时尚轻奢风格', '活力清新风格', '高端大气风格'];
  const copyStyles = ['促销风格', '品质风格', '新品风格', '日常风格'];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">设置</h2>
        <p className="text-gray-600">配置默认生成规则和风格偏好</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">默认生成规则</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                默认主图风格
              </label>
              <select
                value={settings.defaultImageStyle}
                onChange={e => handleChange('defaultImageStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {imageStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">新任务默认使用的主图风格</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                默认文案风格
              </label>
              <select
                value={settings.defaultCopyStyle}
                onChange={e => handleChange('defaultCopyStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {copyStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">新任务默认使用的文案风格</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                每次生成数量
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={settings.generateCount}
                  onChange={e => handleChange('generateCount', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-gray-900 w-12">{settings.generateCount}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">每次生成的主图和文案数量</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                折扣提示阈值
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={settings.discountThreshold}
                  onChange={e => handleChange('discountThreshold', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-gray-900 w-16">{settings.discountThreshold}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">当折扣大于此值时显示"限时折扣"提示</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">偏好设置</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">自动保存</p>
                <p className="text-sm text-gray-500">自动保存编辑中的内容</p>
              </div>
              <button
                onClick={() => handleChange('autoSave', !settings.autoSave)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.autoSave ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.autoSave ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">通知提醒</p>
                <p className="text-sm text-gray-500">生成完成时显示通知</p>
              </div>
              <button
                onClick={() => handleChange('notificationEnabled', !settings.notificationEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notificationEnabled ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notificationEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">数据管理</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">导出数据</p>
                <p className="text-sm text-gray-500">导出所有模板和设置</p>
              </div>
              <button className="px-4 py-2 text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
                导出
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-700">清除所有数据</p>
                <p className="text-sm text-red-500">删除所有任务、模板和设置</p>
              </div>
              <button className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                清除
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            保存设置
          </button>
          {saved && (
            <span className="text-green-600 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              设置已保存
            </span>
          )}
        </div>
      </div>
    </div>
  );
};