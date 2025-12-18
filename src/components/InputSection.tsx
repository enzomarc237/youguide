import { useState } from 'react';
import { Upload, Link as LinkIcon, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

interface InputSectionProps {
  onSubmit: (data: {
    youtubeUrl?: string;
    videoFile?: File;
    description: string;
  }) => void;
  loading?: boolean;
}

export default function InputSection({ onSubmit, loading = false }: InputSectionProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<'url' | 'file'>('url');
  const [error, setError] = useState('');

  const validateYoutubeUrl = (url: string): boolean => {
    try {
      const regex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//;
      return regex.test(url);
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Please enter a description for the guide');
      return;
    }

    if (inputMethod === 'url') {
      if (!youtubeUrl.trim()) {
        setError('Please enter a YouTube URL');
        return;
      }
      if (!validateYoutubeUrl(youtubeUrl)) {
        setError('Please enter a valid YouTube URL');
        return;
      }
    } else {
      if (!videoFile) {
        setError('Please select a video file');
        return;
      }
    }

    onSubmit({
      youtubeUrl: inputMethod === 'url' ? youtubeUrl : undefined,
      videoFile: inputMethod === 'file' ? videoFile : undefined,
      description,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }
      setVideoFile(file);
      setError('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Method Selector */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => {
            setInputMethod('url');
            setError('');
          }}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            inputMethod === 'url'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <LinkIcon className="inline h-4 w-4 mr-2" />
          YouTube URL
        </button>
        <button
          onClick={() => {
            setInputMethod('file');
            setError('');
          }}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            inputMethod === 'file'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="inline h-4 w-4 mr-2" />
          Upload Video
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-900">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Method Content */}
        {inputMethod === 'url' ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              YouTube URL
            </label>
            <p className="text-sm text-slate-600 mb-3">
              Paste a YouTube video URL to analyze and convert
            </p>
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value);
                setError('');
              }}
              disabled={loading}
            />
            <p className="text-xs text-slate-500 mt-2">
              ✓ Supports YouTube, YouTube Shorts, and YouTube Music links
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Video File
            </label>
            <p className="text-sm text-slate-600 mb-3">
              Upload a video file to convert to a guide
            </p>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="mb-2 text-sm text-slate-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-500">
                    MP4, WebM, MOV (Max 500MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </label>
            </div>
            {videoFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  ✓ Selected: <span className="font-medium">{videoFile.name}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-900">
            Guide Description
          </label>
          <p className="text-sm text-slate-600 mb-3">
            Provide details about what this guide should cover
          </p>
          <Textarea
            placeholder="E.g., 'A complete guide to setting up a React project with TypeScript, covering project structure, configuration, and best practices.'"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError('');
            }}
            disabled={loading}
          />
          <p className="text-xs text-slate-500 mt-2">
            This helps generate accurate step titles and structure
          </p>
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">💡 Pro Tip:</span> More detailed descriptions result in better step breakdowns and more accurate timestamps.
          </p>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Converting Video...
            </>
          ) : (
            <>
              Convert to Interactive Guide
            </>
          )}
        </Button>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-4 pt-4">
          <div className="flex items-start gap-3 text-sm">
            <div className="text-lg">⏱️</div>
            <div>
              <p className="font-medium text-slate-900">Auto Timestamps</p>
              <p className="text-slate-600">Indexed by section</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="text-lg">🖼️</div>
            <div>
              <p className="font-medium text-slate-900">Enhanced Media</p>
              <p className="text-slate-600">Images & summaries</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="text-lg">✓</div>
            <div>
              <p className="font-medium text-slate-900">Interactive Quizzes</p>
              <p className="text-slate-600">Test understanding</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="text-lg">📥</div>
            <div>
              <p className="font-medium text-slate-900">Standalone HTML</p>
              <p className="text-slate-600">Works offline</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
