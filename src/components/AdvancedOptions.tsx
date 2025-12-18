import { Card } from './ui/card';
import { CustomOptions } from '../types';

interface AdvancedOptionsProps {
  options: CustomOptions;
  onChange: (options: CustomOptions) => void;
}

export default function AdvancedOptions({ options, onChange }: AdvancedOptionsProps) {
  const handleToggle = (key: keyof Omit<CustomOptions, 'colorScheme'>) => {
    onChange({
      ...options,
      [key]: !options[key],
    });
  };

  const handleColorScheme = (scheme: string) => {
    onChange({
      ...options,
      colorScheme: scheme,
    });
  };

  return (
    <Card className="p-6 bg-white border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-4">⚙️ Options</h3>
      
      <div className="space-y-4">
        {/* Timestamps Toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
            Include Timestamps
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={options.includeTimestamps}
              onChange={() => handleToggle('includeTimestamps')}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              options.includeTimestamps ? 'bg-blue-600' : 'bg-slate-300'
            }`} />
            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              options.includeTimestamps ? 'translate-x-4' : ''
            }`} />
          </div>
        </label>

        {/* Images Toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
            Generate Images
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={options.generateImages}
              onChange={() => handleToggle('generateImages')}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              options.generateImages ? 'bg-emerald-600' : 'bg-slate-300'
            }`} />
            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              options.generateImages ? 'translate-x-4' : ''
            }`} />
          </div>
        </label>

        {/* Audio Toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
            Generate Audio
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={options.generateAudio}
              onChange={() => handleToggle('generateAudio')}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              options.generateAudio ? 'bg-purple-600' : 'bg-slate-300'
            }`} />
            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              options.generateAudio ? 'translate-x-4' : ''
            }`} />
          </div>
        </label>

        {/* Quizzes Toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
            Add Quizzes
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={options.addQuizzes}
              onChange={() => handleToggle('addQuizzes')}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              options.addQuizzes ? 'bg-orange-600' : 'bg-slate-300'
            }`} />
            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              options.addQuizzes ? 'translate-x-4' : ''
            }`} />
          </div>
        </label>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-4" />

        {/* Color Scheme */}
        <div>
          <p className="text-sm font-medium text-slate-900 mb-3">Color Scheme</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'blue', bg: 'bg-blue-600', label: 'Blue' },
              { name: 'emerald', bg: 'bg-emerald-600', label: 'Green' },
              { name: 'purple', bg: 'bg-purple-600', label: 'Purple' },
              { name: 'slate', bg: 'bg-slate-600', label: 'Slate' },
            ].map(scheme => (
              <button
                key={scheme.name}
                onClick={() => handleColorScheme(scheme.name)}
                className={`h-10 rounded-lg ${scheme.bg} transition-all ${
                  options.colorScheme === scheme.name
                    ? 'ring-2 ring-offset-2 ring-slate-400 scale-105'
                    : 'hover:opacity-90'
                } cursor-pointer`}
                title={scheme.label}
                aria-label={`Select ${scheme.label} color scheme`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
