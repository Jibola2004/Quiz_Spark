'use client'

import { Card } from '../ui/card'
import { NavigateQuestion } from './NavigateQuestion'
import { Tabs, TabsContent } from '../ui/tabs'
import { useQuizNavigate } from '@/contexts/navigate-context'
import { useQuestionBank } from '@/contexts/questions-context'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

interface QuizPageProps {
  onAnswerSelect: (subject: string, questionId: number, answer: string) => void
  selectedAnswers: Record<string, Record<string, string>>
}

const QuizPage = ({ onAnswerSelect, selectedAnswers }: QuizPageProps) => {
  const { questionStates, currentTab, loading } = useQuizNavigate()
  const { quiz, loading: quizLoading } = useQuestionBank()

  const currentQuestionState = questionStates?.[currentTab] || {
    currentQuestion: 1,
    totalQuestions: 0,
    isFirstQuestion: true,
    isLastQuestion: true,
    questionsAttempted: [],
    isLoading: true
  }

  const currentQuestionIndex = currentQuestionState.currentQuestion - 1
  const subjectQuestions = quiz?.questions?.[currentTab]?.question_list || []
  
  const currentQuestion = useMemo(() => {
    return subjectQuestions[currentQuestionIndex]
  }, [subjectQuestions, currentQuestionIndex])

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion || loading || quizLoading) return
    onAnswerSelect(currentTab, currentQuestion.question_id, option)
  }

  if (loading || quizLoading) {
    return (
      <Card className='w-full h-[500px] p-4 flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </Card>
    )
  }

  return (
    <Card className='w-full h-[500px] p-4 flex flex-col'>
      <div className='flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-auto'>
        <Tabs value={currentTab}>
          {quiz?.subject_names.map((subject) => (
            <TabsContent key={subject} value={subject} className='h-full'>
              <div className='h-full p-4'>
                {currentQuestion ? (
                  <>
                    <div className='flex justify-between items-center mb-4'>
                      <h2 className='text-xl font-bold'>
                        {subject.charAt(0).toUpperCase() + subject.slice(1)} - Question {currentQuestionState.currentQuestion}
                      </h2>
                      <span className='text-sm text-muted-foreground'>
                        {currentQuestionState.currentQuestion}/{currentQuestionState.totalQuestions}
                      </span>
                    </div>
                    
                    <p className="mb-6 text-lg">{currentQuestion.question}</p>
                    
                    <ul className="space-y-3">
                      {currentQuestion.options.map((option, i) => {
                        const isSelected = selectedAnswers[currentTab]?.[currentQuestion.question_id] === option;

                        const optionLetter = String.fromCharCode(65 + i) // A, B, C, D
                        
                        return (
                          <li 
                            key={i} 
                            className={cn(
                              'p-3 border rounded-lg cursor-pointer transition-colors',
                              'hover:bg-gray-200 dark:hover:bg-gray-700',
                              isSelected 
                                ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' 
                                : 'border-gray-300 dark:border-gray-600'
                            )}
                            onClick={() => handleOptionSelect(option)}
                            aria-selected={isSelected}
                          >
                            <div className='flex items-center'>
                              <span className='font-medium mr-3'>{optionLetter}.</span>
                              <span>{option}</span>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </>
                ) : (
                  <div className='h-full flex items-center justify-center'>
                    <p className='text-muted-foreground'>No question available for this subject</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <NavigateQuestion currentTab={currentTab} />
    </Card>
  )
}

export default QuizPage