import { useState } from 'react';
import { Upload, Zap, Download, Plus, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import InputSection from './components/InputSection';
import GuidePreview from './components/GuidePreview';
import MediaGenerator from './components/MediaGenerator';
import AdvancedOptions from './components/AdvancedOptions';
import { Guide, GuideStep } from './types';

function App() {
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'input' | 'generate' | 'preview'>('input');
  const [customOptions, setCustomOptions] = useState({
    includeTimestamps: true,
    generateImages: true,
    generateAudio: false,
    addQuizzes: true,
    colorScheme: 'blue',
  });

  const handleConvert = async (data: {
    youtubeUrl?: string;
    videoFile?: File;
    description: string;
  }) => {
    try {
      setError('');
      setLoading(true);
      
      // Simulate API conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock conversion result with sample data
      const mockGuide: Guide = {
        id: `guide-${Date.now()}`,
        title: 'Complete Step-by-Step Guide',
        description: data.description || 'A comprehensive interactive guide with multimedia enhancements.',
        videoSource: data.youtubeUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '15:32',
        steps: [
          {
            id: 1,
            title: 'Introduction & Setup',
            description: 'Learn the fundamentals and get your environment ready. This section covers all prerequisites and basic setup steps.',
            videoTimestamp: '0:00 - 2:15',
            content: 'Start by understanding the core concepts. Set up your workspace and gather all necessary tools.',
            mediaAssets: {
              images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'],
              video: undefined,
              audio: undefined,
            },
            notes: ['Important: Read documentation first', 'Install all dependencies'],
            quiz: {
              question: 'What is the first step?',
              options: ['Setup', 'Learning', 'Installation', 'Testing'],
              answer: 0,
            },
          },
          {
            id: 2,
            title: 'Core Configuration',
            description: 'Deep dive into configuration options and best practices. Understand how each setting affects your workflow.',
            videoTimestamp: '2:16 - 7:45',
            content: 'Explore advanced configuration options and learn optimization techniques.',
            mediaAssets: {
              images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'],
              video: undefined,
              audio: undefined,
            },
            notes: ['Use environment variables', 'Follow naming conventions'],
            quiz: {
              question: 'Which configuration is most important?',
              options: ['Logging', 'Database', 'Security', 'Cache'],
              answer: 2,
            },
          },
          {
            id: 3,
            title: 'Implementation & Best Practices',
            description: 'Practical implementation techniques and industry best practices. Learn from real-world examples.',
            videoTimestamp: '7:46 - 12:30',
            content: 'Implement features following best practices and design patterns.',
            mediaAssets: {
              images: ['https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop'],
              video: undefined,
              audio: undefined,
            },
            notes: ['Test thoroughly', 'Code review required', 'Document changes'],
            quiz: {
              question: 'What should you do before deployment?',
              options: ['Skip testing', 'Test thoroughly', 'Rush it', 'Ignore feedback'],
              answer: 1,
            },
          },
          {
            id: 4,
            title: 'Deployment & Optimization',
            description: 'Deploy with confidence and optimize for performance. Monitor and maintain your solution.',
            videoTimestamp: '12:31 - 15:32',
            content: 'Deploy to production and set up monitoring. Optimize performance and handle edge cases.',
            mediaAssets: {
              images: ['https://images.unsplash.com/photo-1460925895917-afd651603c0d?w=600&h=400&fit=crop'],
              video: undefined,
              audio: undefined,
            },
            notes: ['Monitor metrics', 'Set up alerts', 'Plan for scaling'],
            quiz: {
              question: 'What is critical after deployment?',
              options: ['Nothing', 'Monitoring', 'More features', 'Manual checks'],
              answer: 1,
            },
          },
        ],
        createdAt: new Date().toISOString(),
        options: customOptions,
      };

      setGuide(mockGuide);
      setCurrentStep('preview');
    } catch (err) {
      setError('Failed to convert video. Please check the URL and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!guide) return;
    
    // Generate HTML content
    const htmlContent = generateHTML(guide);
    
    // Download HTML file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    element.setAttribute('download', `${guide.title.replace(/\s+/g, '-').toLowerCase()}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 p-2">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">YouTube Guide Converter</h1>
                <p className="text-xs text-slate-500">Transform videos into interactive guides</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">How it works</a>
              {guide && (
                <Button
                  onClick={handleExport}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Guide
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm font-medium text-red-900">{error}</p>
            <button
              onClick={() => setError('')}
              className="mt-2 text-sm text-red-700 hover:text-red-900 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {!guide ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Convert Videos to Interactive Guides
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Transform any YouTube video into a beautiful, interactive HTML guide with step-by-step instructions, timestamps, images, and quizzes.
              </p>
            </div>

            {/* Steps Tabs */}
            <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto pb-4">
              <button
                onClick={() => setCurrentStep('input')}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  currentStep === 'input'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Input
              </button>
              <button
                onClick={() => guide && setCurrentStep('generate')}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  currentStep === 'generate'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Generate
              </button>
              <button
                onClick={() => guide && setCurrentStep('preview')}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  currentStep === 'preview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                3. Preview
              </button>
            </div>

            {/* Content Sections */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {currentStep === 'input' && (
                  <InputSection
                    onSubmit={handleConvert}
                    loading={loading}
                  />
                )}
                {currentStep === 'generate' && guide && (
                  <MediaGenerator guide={guide} />
                )}
                {currentStep === 'preview' && guide && (
                  <GuidePreview guide={guide} />
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-4 sticky top-24">
                  <AdvancedOptions
                    options={customOptions}
                    onChange={setCustomOptions}
                  />

                  {/* Features Card */}
                  <Card className="p-6 border-slate-200 bg-white">
                    <h3 className="font-semibold text-slate-900 mb-4">Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-blue-100 p-1">
                          <Plus className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-600">Auto-generated timestamps</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-emerald-100 p-1">
                          <Plus className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-600">Enhanced with images</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-purple-100 p-1">
                          <Plus className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm text-slate-600">Interactive quizzes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-orange-100 p-1">
                          <Plus className="h-3 w-3 text-orange-600" />
                        </div>
                        <span className="text-sm text-slate-600">Downloadable HTML</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Guide Preview</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setGuide(null);
                    setCurrentStep('input');
                  }}
                >
                  Create New
                </Button>
                <Button
                  onClick={handleExport}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export HTML
                </Button>
              </div>
            </div>
            <GuidePreview guide={guide} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            Transform your educational content into interactive guides
          </p>
        </div>
      </footer>
    </div>
  );
}

function generateHTML(guide: Guide): string {
  const stepsHTML = guide.steps
    .map(
      (step, idx) => `
      <div class="step-container">
        <h3 class="step-title">${idx + 1}. ${step.title}</h3>
        <p class="step-description">${step.description}</p>
        <p class="step-timestamp"><strong>⏱️ ${step.videoTimestamp}</strong></p>
        <p class="step-content">${step.content}</p>
        ${
          step.mediaAssets.images.length > 0
            ? `<div class="step-images">${step.mediaAssets.images
                .map((img) => `<img src="${img}" alt="${step.title}" />`)
                .join('')}</div>`
            : ''
        }
        ${
          step.notes.length > 0
            ? `<div class="step-notes"><strong>📝 Notes:</strong><ul>${step.notes
                .map((note) => `<li>${note}</li>`)
                .join('')}</ul></div>`
            : ''
        }
        ${
          step.quiz
            ? `<div class="step-quiz"><strong>❓ Quiz:</strong><p>${step.quiz.question}</p><ul>${step.quiz.options
                .map((opt, i) => `<li><input type="radio" name="q${step.id}" value="${i}" /> ${opt}</li>`)
                .join('')}</ul></div>`
            : ''
        }
      </div>
    `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${guide.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }
    header {
      background: linear-gradient(135deg, #2563eb, #059669);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .guide-meta {
      font-size: 0.95rem;
      opacity: 0.95;
      margin-top: 1rem;
    }
    .video-section {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
    }
    .video-section h2 {
      margin-bottom: 1rem;
      color: #111827;
    }
    .video-container {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
    }
    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    .steps-container {
      display: grid;
      gap: 2rem;
    }
    .step-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      border-left: 4px solid #2563eb;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      border-left: 4px solid #2563eb;
    }
    .step-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.75rem;
    }
    .step-description {
      color: #374151;
      margin-bottom: 1rem;
      line-height: 1.7;
    }
    .step-timestamp {
      background: #dbeafe;
      color: #1e40af;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    .step-content {
      color: #4b5563;
      margin-bottom: 1rem;
      line-height: 1.7;
    }
    .step-images {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    .step-images img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .step-notes {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 1rem;
      border-radius: 6px;
      margin: 1rem 0;
    }
    .step-notes ul {
      list-style: none;
      margin-left: 0;
      padding-left: 1.5rem;
    }
    .step-notes li:before {
      content: "✓ ";
      color: #f59e0b;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    .step-quiz {
      background: #f0fdf4;
      border-left: 4px solid #10b981;
      padding: 1rem;
      border-radius: 6px;
      margin: 1rem 0;
    }
    .step-quiz ul {
      list-style: none;
      margin: 1rem 0 0 0;
      padding-left: 0;
    }
    .step-quiz li {
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
    }
    footer {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 0.9rem;
    }
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
      h1 {
        font-size: 1.8rem;
      }
      .step-container {
        padding: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📚 ${guide.title}</h1>
      <p>${guide.description}</p>
      <div class="guide-meta">
        <p>⏱️ Duration: ${guide.duration}</p>
      </div>
    </header>

    <div class="video-section">
      <h2>📹 Video Source</h2>
      <div class="video-container">
        <iframe
          src="${guide.videoSource}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <div class="steps-container">
      ${stepsHTML}
    </div>

    <footer>
      <p>Generated with YouTube Guide Converter • Create interactive guides from your videos</p>
    </footer>
  </div>
</body>
</html>`;
}

export default App;
