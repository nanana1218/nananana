import { useState, useEffect, useCallback } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  type: 'single' | 'multiple' | 'judgment';
  explanation?: string;
}

interface ChapterExerciseProps {
  chapterId: string;
  chapterTitle: string;
  questions: Question[];
  questionCount: number;
  onComplete: (score: number, total: number) => void;
}

export default function ChapterExercise({ chapterId, chapterTitle, questions, questionCount = 30, onComplete }: ChapterExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | number[])[]>([]);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 只在组件挂载时随机抽取题目
  useEffect(() => {
    if (questions.length > 0) {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, questionCount);
      setRandomQuestions(selected);
      setIsLoading(false);
    }
  }, []);

  // 重置状态当题目索引变化时
  useEffect(() => {
    if (!isLoading) {
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  }, [currentQuestionIndex, isLoading]);

  const currentQuestion = randomQuestions[currentQuestionIndex];

  // 确保currentQuestion存在且加载完成
  if (isLoading || !currentQuestion) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 flex items-center justify-center">
        <p className="text-gray-400">正在加载题目...</p>
      </div>
    );
  }

  const handleAnswerSelect = useCallback((index: number) => {
    if (!showAnswer) {
      if (currentQuestion.type === 'multiple') {
        if (selectedAnswer === null) {
          setSelectedAnswer([index]);
        } else if (Array.isArray(selectedAnswer)) {
          if (selectedAnswer.includes(index)) {
            setSelectedAnswer(selectedAnswer.filter(i => i !== index));
          } else {
            setSelectedAnswer([...selectedAnswer, index]);
          }
        }
      } else {
        setSelectedAnswer(index);
      }
    }
  }, [currentQuestion.type, selectedAnswer, showAnswer]);

  const handleCheckAnswer = useCallback(() => {
    if (selectedAnswer !== null) {
      setShowAnswer(true);
    }
  }, [selectedAnswer]);

  const handleNext = useCallback(() => {
    if (selectedAnswer !== null && showAnswer) {
      let isCorrect = false;
      if (currentQuestion.type === 'multiple') {
        if (Array.isArray(selectedAnswer) && Array.isArray(currentQuestion.correctAnswer)) {
          isCorrect = selectedAnswer.length === currentQuestion.correctAnswer.length && 
                     selectedAnswer.every(ans => {
                       const correctAnswers = currentQuestion.correctAnswer as number[];
                       return correctAnswers.includes(ans);
                     });
        }
      } else {
        isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      }
      
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
      setAnswers(prev => [...prev, selectedAnswer]);
      
      if (currentQuestionIndex < randomQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowResult(true);
        onComplete(score + (isCorrect ? 1 : 0), randomQuestions.length);
      }
    }
  }, [selectedAnswer, showAnswer, currentQuestion, currentQuestionIndex, randomQuestions.length, score, onComplete]);

  const handleRestart = useCallback(() => {
    // 重新随机抽取题目
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount);
    setRandomQuestions(selected);
    
    // 重置状态
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  }, [questions, questionCount]);

  if (showResult) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-2xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          {chapterTitle} - 练习结果
        </h3>
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-blue-400 mb-2">
            {score}/{randomQuestions.length}
          </div>
          <div className="text-gray-300">
            {score === randomQuestions.length ? '太棒了！全部正确！' : 
             score >= randomQuestions.length * 0.7 ? '做得不错！继续加油！' : 
             '需要更多练习，再接再厉！'}
          </div>
        </div>
        <div className="space-y-4 mb-8">
          {randomQuestions.map((q, index) => {
            const userAnswer = answers[index];
            let isCorrect = false;
            if (q.type === 'multiple') {
              if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
                isCorrect = userAnswer.length === q.correctAnswer.length && 
                           userAnswer.every(ans => {
                             const correctAnswers = q.correctAnswer as number[];
                             return correctAnswers.includes(ans);
                           });
              }
            } else {
              isCorrect = userAnswer === q.correctAnswer;
            }
            
            return (
              <div key={q.id} className="border border-gray-700 rounded-lg p-4">
                <div className="text-gray-300 mb-2">{q.question}</div>
                <div className="flex items-center mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    isCorrect 
                      ? 'bg-green-500 text-white' 
                      : userAnswer !== null 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-700 text-gray-400'
                  }`}>
                    {isCorrect ? '✓' : userAnswer !== null ? '✗' : '?'}
                  </span>
                  <div>
                    <span className={`${isCorrect ? 'text-green-400' : 
                                    userAnswer !== null && !isCorrect ? 'text-red-400' : 
                                    'text-gray-400'}`}>
                      {q.type === 'multiple' && Array.isArray(userAnswer) ? (
                        userAnswer.map(ans => q.options[ans]).join(', ')
                      ) : (
                        q.options[userAnswer as number] || ''
                      )}
                    </span>
                    {userAnswer !== null && (
                      <span className="ml-4 text-green-400">
                        正确答案: {q.type === 'multiple' && Array.isArray(q.correctAnswer) ? (
                          q.correctAnswer.map(ans => q.options[ans]).join(', ')
                        ) : (
                          q.options[q.correctAnswer as number]
                        )}
                      </span>
                    )}
                  </div>
                </div>
                {q.explanation && (
                  <div className="mt-2 text-gray-400 text-sm">
                    解析: {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            重新练习
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 rounded-lg text-gray-300 font-medium hover:bg-gray-600 transition-all duration-300"
          >
            返回章节
          </button>
        </div>
      </div>
    );
  }

  // 检查答案是否正确
  const isCorrect = () => {
    if (selectedAnswer === null) return false;
    if (currentQuestion.type === 'multiple') {
      if (Array.isArray(selectedAnswer) && Array.isArray(currentQuestion.correctAnswer)) {
        return selectedAnswer.length === currentQuestion.correctAnswer.length && 
               selectedAnswer.every(ans => {
                 const correctAnswers = currentQuestion.correctAnswer as number[];
                 return correctAnswers.includes(ans);
               });
      }
    } else {
      return selectedAnswer === currentQuestion.correctAnswer;
    }
    return false;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-100">{chapterTitle} - 章节练习</h3>
        <div className="text-gray-400">
          题目 {currentQuestionIndex + 1}/{randomQuestions.length}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <h4 className="text-lg font-medium text-gray-200">
            {currentQuestion.question}
          </h4>
          <span className={`ml-4 px-2 py-1 rounded text-xs font-medium ${
            currentQuestion.type === 'single' ? 'bg-blue-900/50 text-blue-300' :
            currentQuestion.type === 'multiple' ? 'bg-purple-900/50 text-purple-300' :
            'bg-green-900/50 text-green-300'
          }`}>
            {currentQuestion.type === 'single' ? '单选题' :
             currentQuestion.type === 'multiple' ? '多选题' :
             '判断题'}
          </span>
        </div>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            // 检查是否是正确答案
            const isOptionCorrect = () => {
              if (currentQuestion.type === 'multiple') {
                if (Array.isArray(currentQuestion.correctAnswer)) {
                  return currentQuestion.correctAnswer.includes(index);
                }
              } else {
                return currentQuestion.correctAnswer === index;
              }
              return false;
            };

            // 检查是否是用户选择的答案
            const isSelected = () => {
              if (currentQuestion.type === 'multiple') {
                return Array.isArray(selectedAnswer) && selectedAnswer.includes(index);
              } else {
                return selectedAnswer === index;
              }
            };

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  showAnswer ? (
                    isOptionCorrect() 
                      ? 'border-green-500 bg-green-500/10'
                      : isSelected() && !isOptionCorrect()
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-gray-700'
                  ) : (
                    isSelected()
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-blue-700/50 cursor-pointer'
                  )
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center">
                  <span className={`w-6 h-6 ${currentQuestion.type === 'multiple' ? 'rounded' : 'rounded-full'} border flex items-center justify-center mr-3 ${
                    showAnswer ? (
                      isOptionCorrect()
                        ? 'border-green-500 bg-green-500 text-white'
                        : isSelected() && !isOptionCorrect()
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-gray-600'
                    ) : (
                      isSelected()
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-600'
                    )
                  }`}>
                    {showAnswer ? (
                      isOptionCorrect() ? '✓' : isSelected() && !isOptionCorrect() ? '✗' : ''
                    ) : (
                      currentQuestion.type === 'multiple' ? (
                        isSelected() ? '✓' : ''
                      ) : (
                        String.fromCharCode(65 + index)
                      )
                    )}
                  </span>
                  <span className={`${
                    showAnswer ? (
                      isOptionCorrect()
                        ? 'text-green-400'
                        : isSelected() && !isOptionCorrect()
                          ? 'text-red-400'
                          : 'text-gray-300'
                    ) : (
                      isSelected()
                        ? 'text-blue-300'
                        : 'text-gray-300'
                    )
                  }`}>
                    {option}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 显示答案和解析 */}
        {showAnswer && (
          <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center mb-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                isCorrect() ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {isCorrect() ? '✓' : '✗'}
              </span>
              <div>
                <span className={`font-medium ${
                  isCorrect() ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isCorrect() ? '回答正确！' : '回答错误！'}
                </span>
                <span className="ml-4 text-green-400">
                  正确答案: {currentQuestion.type === 'multiple' && Array.isArray(currentQuestion.correctAnswer) ? (
                    currentQuestion.correctAnswer.map(ans => currentQuestion.options[ans]).join(', ')
                  ) : (
                    currentQuestion.options[currentQuestion.correctAnswer as number]
                  )}
                </span>
              </div>
            </div>
            {currentQuestion.explanation && (
              <div className="mt-2 text-gray-300">
                <strong>解析:</strong> {currentQuestion.explanation}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-4">
        {!showAnswer && (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedAnswer === null
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            检查答案
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null || !showAnswer}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            selectedAnswer === null || !showAnswer
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-blue-500/30'
          }`}
        >
          {currentQuestionIndex === randomQuestions.length - 1 ? '提交' : '下一题'}
        </button>
      </div>
    </div>
  );
}
