import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface ExerciseProps {
  title: string;
  questions: Question[];
  onComplete?: (score: number, total: number) => void;
}

export default function ExerciseComponent({ title, questions, onComplete }: ExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
      setAnswers(prev => [...prev, selectedAnswer]);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setShowResult(true);
        if (onComplete) {
          onComplete(score + (isCorrect ? 1 : 0), questions.length);
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (showResult) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-2xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          练习完成
        </h3>
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-blue-400 mb-2">
            {score}/{questions.length}
          </div>
          <div className="text-gray-300">
            {score === questions.length ? '太棒了！全部正确！' : 
             score >= questions.length * 0.7 ? '做得不错！继续加油！' : 
             '需要更多练习，再接再厉！'}
          </div>
        </div>
        <div className="space-y-4 mb-8">
          {questions.map((q, index) => (
            <div key={q.id} className="border border-gray-700 rounded-lg p-4">
              <div className="text-gray-300 mb-2">{q.question}</div>
              <div className="flex items-center">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  answers[index] === q.correctAnswer 
                    ? 'bg-green-500 text-white' 
                    : answers[index] !== null 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                }`}>
                  {answers[index] === q.correctAnswer ? '✓' : answers[index] !== null ? '✗' : '?'}
                </span>
                <span className={`${answers[index] === q.correctAnswer ? 'text-green-400' : 
                                answers[index] !== null && answers[index] !== q.correctAnswer ? 'text-red-400' : 
                                'text-gray-400'}`}>
                  {q.options[answers[index] || 0]}
                </span>
                {answers[index] !== q.correctAnswer && answers[index] !== null && (
                  <span className="ml-4 text-green-400">
                    正确答案: {q.options[q.correctAnswer]}
                  </span>
                )}
              </div>
              {q.explanation && (
                <div className="mt-2 text-gray-400 text-sm">
                  解析: {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            重新练习
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
        <div className="text-gray-400">
          问题 {currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-200 mb-4">
          {currentQuestion.question}
        </h4>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-blue-700/50'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <div className="flex items-center">
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={selectedAnswer === index ? 'text-blue-300' : 'text-gray-300'}>
                  {option}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            selectedAnswer === null
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-blue-500/30'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? '提交' : '下一题'}
        </button>
      </div>
    </div>
  );
}
