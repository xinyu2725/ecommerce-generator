import React from 'react';

interface SpecsEditorProps {
  specs: Record<string, string>;
  onSpecsChange: (specs: Record<string, string>) => void;
  disabled?: boolean;
}

export const SpecsEditor: React.FC<SpecsEditorProps> = ({ specs, onSpecsChange, disabled = false }) => {
  const entries = Object.entries(specs);

  const handleAdd = () => {
    if (disabled) return;
    onSpecsChange({ ...specs, '': '' });
  };

  const handleChange = (oldKey: string, newKey: string, value: string) => {
    if (disabled) return;
    const newSpecs = { ...specs };
    if (oldKey !== newKey) {
      delete newSpecs[oldKey];
      newSpecs[newKey] = value;
    } else {
      newSpecs[oldKey] = value;
    }
    onSpecsChange(newSpecs);
  };

  const handleDelete = (key: string) => {
    if (disabled) return;
    const newSpecs = { ...specs };
    delete newSpecs[key];
    onSpecsChange(newSpecs);
  };

  return (
    <div className={`space-y-2 ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">商品规格</label>
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          className={`text-sm flex items-center gap-1 ${
            disabled 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-primary-600 hover:text-primary-700'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          添加规格
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500 py-2">暂无规格参数，点击添加</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {entries.map(([key, value], index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={key}
                onChange={(e) => handleChange(key, e.target.value, value)}
                placeholder="规格名称"
                disabled={disabled}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, key, e.target.value)}
                placeholder="规格值"
                disabled={disabled}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => handleDelete(key)}
                disabled={disabled}
                className={`p-2 rounded-lg transition-colors ${
                  disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-red-500 hover:bg-red-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};