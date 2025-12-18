import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Guide, GuideStep } from '../types';

interface GuidePreviewProps {
  guide: Guide;
}

export default function GuidePreview({ guide }: GuidePreviewProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleQuizAnswer = (stepId: number, answer: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [stepId]: answer,
    });
  };

  const checkQuiz = (stepId: number) => {
    setShowResults({
      ...showResults,
      [stepId]: true,
    });
  };

  const isQuizCorrect = (step: GuideStep): boolean => {
    if (!step.quiz) return false;
    return quizAnswers[step.id] === step.quiz.answer;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">{guide.title}</h1>
        <p className="text-blue-100 mb-4">{guide.description}</p>
        <div className="flex items-center gap-6 text-sm">
          <span>⏱️ Duration: {guide.duration}</span>
          <span>📚 {guide.steps.length} steps</span>
          <span>📅 {new Date(guide.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Video Embed */}
      <Card className="p-0 overflow-hidden bg-black">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={guide.videoSource}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">📚 Step-by-Step Guide</h2>
        
        {guide.steps.map((step, index) => (
          <Card
            key={step.id}
            className={`overflow-hidden transition-all duration-300 ${
              expandedStep === step.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {/* Step Header */}
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full p-6 flex items-start justify-between hover:bg-slate-50 transition-colors border-l-4 border-blue-500"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
              <div className="ml-4 mt-1 flex-shrink-0">
                {expandedStep === step.id ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </button>

            {/* Step Content */}
            {expandedStep === step.id && (
              <div className="border-t border-slate-200 p-6 bg-slate-50 space-y-6">
                {/* Timestamp */}
                {step.videoTimestamp && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-900">
                      ⏱️ {step.videoTimestamp}
                    </p>
                  </div>
                )}

                {/* Content */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">📝 Instructions</h4>
                  <p className="text-slate-700 leading-relaxed">{step.content}</p>
                </div>

                {/* Images */}
                {step.mediaAssets.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">🖼️ Visual References</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {step.mediaAssets.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`${step.title} - Reference ${idx + 1}`}
                          className="rounded-lg w-full h-auto border border-slate-200"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {step.notes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">📌 Important Notes</h4>
                    <ul className="space-y-2">
                      {step.notes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <span className="text-amber-600 font-bold mt-0.5">✓</span>
                          <span className="text-slate-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quiz */}
                {step.quiz && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-4">❓ Knowledge Check</h4>
                    <p className="text-slate-900 font-medium mb-4">{step.quiz.question}</p>
                    <div className="space-y-3 mb-4">
                      {step.quiz.options.map((option, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`quiz-${step.id}`}
                            value={idx}
                            checked={quizAnswers[step.id] === idx}
                            onChange={() => {
                              handleQuizAnswer(step.id, idx);
                              setShowResults({ ...showResults, [step.id]: false });
                            }}
                            className="w-4 h-4 text-green-600"
                          />
                          <span className="text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    
                    {/* Quiz Feedback */}
                    {showResults[step.id] && (
                      <div className={`rounded-lg p-4 mb-4 flex items-start gap-3 ${
                        isQuizCorrect(step)
                          ? 'bg-green-100 border border-green-300'
                          : 'bg-red-100 border border-red-300'
                      }`}>
                        {isQuizCorrect(step) ? (
                          <>
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-green-900">Correct!</p>
                              <p className="text-sm text-green-800">Great job! You've mastered this concept.</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-red-900">Not quite right</p>
                              <p className="text-sm text-red-800">Review the instructions and try again.</p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={() => checkQuiz(step.id)}
                      disabled={quizAnswers[step.id] === undefined}
                      className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                    >
                      Check Answer
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Progress Summary */}
      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <h3 className="font-semibold text-slate-900 mb-3">📊 Your Progress</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold text-emerald-600">{Object.keys(quizAnswers).length}</p>
            <p className="text-sm text-slate-600">Questions Answered</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {Object.entries(quizAnswers).filter(([stepId, answer]) => {
                const step = guide.steps.find(s => s.id === parseInt(stepId));
                return step?.quiz?.answer === answer;
              }).length}
            </p>
            <p className="text-sm text-slate-600">Correct Answers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {guide.steps.length}
            </p>
            <p className="text-sm text-slate-600">Total Steps</p>
          </div>
        </div>
      </Card>

      {/* Export Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">💡 Ready to download?</span> Click the "Export HTML" button at the top to download this guide as a standalone HTML file.
        </p>
      </Card>
    </div>
  );
}
