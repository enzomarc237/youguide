import { useState } from 'react';
import { Loader, Zap, Image, Volume2, BookOpen } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Guide } from '../types';

interface MediaGeneratorProps {
  guide: Guide;
}

export default function MediaGenerator({ guide }: MediaGeneratorProps) {
  const [generatingMedia, setGeneratingMedia] = useState<Record<number, boolean>>({});
  const [completedMedia, setCompletedMedia] = useState<Record<number, string[]>>({});

  const generateMedia = async (stepId: number, mediaType: 'images' | 'audio' | 'summary') => {
    try {
      setGeneratingMedia({ ...generatingMedia, [stepId]: true });
      
      // Simulate media generation
      await new Promise(resolve => setTimeout(resolve, 1500));

      const completed = completedMedia[stepId] || [];
      setCompletedMedia({
        ...completedMedia,
        [stepId]: [...completed, mediaType],
      });
    } finally {
      setGeneratingMedia({ ...generatingMedia, [stepId]: false });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">🎨 Media Enhancement</h2>
        <p className="text-slate-600">Enhance each step with AI-generated images, audio summaries, and visual aids</p>
      </div>

      <div className="space-y-4">
        {guide.steps.map((step, index) => {
          const completed = completedMedia[step.id] || [];
          const isGenerating = generatingMedia[step.id];

          return (
            <Card key={step.id} className="p-6 border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </div>

              {/* Media Options Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Generate Images */}
                <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Image className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium text-slate-900">Related Images</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Generate contextual images to illustrate this step
                  </p>
                  <Button
                    onClick={() => generateMedia(step.id, 'images')}
                    disabled={isGenerating || completed.includes('images')}
                    size="sm"
                    variant={completed.includes('images') ? 'outline' : 'default'}
                    className={completed.includes('images') ? 'bg-green-50 border-green-200 text-green-700' : ''}
                  >
                    {isGenerating && completed.includes('images') === false ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : completed.includes('images') ? (
                      <>✓ Generated</>
                    ) : (
                      <>Generate</>
                    )}
                  </Button>
                </div>

                {/* Generate Audio */}
                <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Volume2 className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-slate-900">Audio Summary</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Create a narrated audio summary of instructions
                  </p>
                  <Button
                    onClick={() => generateMedia(step.id, 'audio')}
                    disabled={isGenerating || completed.includes('audio')}
                    size="sm"
                    variant={completed.includes('audio') ? 'outline' : 'default'}
                    className={completed.includes('audio') ? 'bg-green-50 border-green-200 text-green-700' : ''}
                  >
                    {isGenerating && completed.includes('audio') === false ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : completed.includes('audio') ? (
                      <>✓ Generated</>
                    ) : (
                      <>Generate</>
                    )}
                  </Button>
                </div>

                {/* Generate Summary */}
                <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-slate-900">Key Summary</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Generate a concise summary of key points
                  </p>
                  <Button
                    onClick={() => generateMedia(step.id, 'summary')}
                    disabled={isGenerating || completed.includes('summary')}
                    size="sm"
                    variant={completed.includes('summary') ? 'outline' : 'default'}
                    className={completed.includes('summary') ? 'bg-green-50 border-green-200 text-green-700' : ''}
                  >
                    {isGenerating && completed.includes('summary') === false ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : completed.includes('summary') ? (
                      <>✓ Generated</>
                    ) : (
                      <>Generate</>
                    )}
                  </Button>
                </div>
              </div>

              {/* Status */}
              {completed.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm text-emerald-700 font-medium">
                    ✓ {completed.length} media asset{completed.length !== 1 ? 's' : ''} generated
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-emerald-50 border-emerald-200">
        <h4 className="font-semibold text-emerald-900 mb-2">💡 Media Generation Tips</h4>
        <ul className="space-y-2 text-sm text-emerald-800">
          <li>• <span className="font-medium">Images</span>: Relevant stock images that illustrate the concept</li>
          <li>• <span className="font-medium">Audio</span>: Professional narration for accessibility</li>
          <li>• <span className="font-medium">Summaries</span>: Quick reference bullets for key points</li>
        </ul>
      </Card>

      {/* Generate All Button */}
      <Button
        size="lg"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        <Zap className="h-4 w-4 mr-2" />
        Generate All Media Assets
      </Button>
    </div>
  );
}
