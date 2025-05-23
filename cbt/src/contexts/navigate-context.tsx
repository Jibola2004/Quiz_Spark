import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from 'react'
import { useQuestionBank } from './questions-context'

type QuestionState = {
  currentQuestion: number
  totalQuestions: number
  isFirstQuestion: boolean
  isLastQuestion: boolean
  questionsAttempted: number[]
  isLoading?: boolean
  error?: Error
}

type NavigateContextType = {
  currentTab: string
  setCurrentTab: (value: string) => void
  tabs: string[]
  questionStates: Record<string, QuestionState>
  handlePrevious: () => void
  handleNext: () => void
  handleQuestionNavigate: (num:number)=> void
  resetTab: (tabName: string) => void
  getCurrentQuestionState: () => QuestionState
  loading: boolean
  error?: Error
}

const QuizNavigateContext = createContext<NavigateContextType | null>(null)

export function QuizNavigateProvider({ children, tabs }: { children: ReactNode, tabs: string[] }) {
  const { quiz, loading: quizLoading, error: quizError } = useQuestionBank()
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  // Initialize or update question states when quiz data or tabs change
  useEffect(() => {
    if (quizLoading) {
      setLoading(true)
      return
    }

    try {
      setLoading(true)
      
      if (!quiz) {
        throw new Error('No quiz data available')
      }

      setQuestionStates(prevStates => {
        const newStates = { ...prevStates }
        
        tabs.forEach(tab => {
          const tabQuestions = quiz.questions[tab]
          if (!tabQuestions) {
            console.warn(`No questions found for tab: ${tab}`)
            return
          }

          const totalQuestions = tabQuestions.total_question
          const existingState = prevStates[tab]

          newStates[tab] = {
            currentQuestion: existingState?.currentQuestion || 1,
            totalQuestions,
            isFirstQuestion: existingState ? 
              existingState.currentQuestion === 1 : 
              true,
            isLastQuestion: existingState ? 
              existingState.currentQuestion === totalQuestions : 
              totalQuestions <= 1,
            questionsAttempted: existingState?.questionsAttempted || [],
            isLoading: false
          }
        })

        return newStates
      })
      
      setError(undefined)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize questions'))
      console.error('Error initializing question states:', err)
    } finally {
      setLoading(false)
    }
  }, [quiz, quizLoading, tabs])

  useEffect(() => {
    if (tabs){
    setCurrentTab(tabs[0])}
  }, [tabs])

  const handlePrevious = useCallback(() => {
    setQuestionStates(prev => {
      const currentState = prev[currentTab]
      if (!currentState || currentState.currentQuestion <= 1) return prev
      
      const newQuestion = currentState.currentQuestion - 1
      return {
        ...prev,
        [currentTab]: {
          ...currentState,
          currentQuestion: newQuestion,
          isFirstQuestion: newQuestion === 1,
          isLastQuestion: newQuestion === currentState.totalQuestions
        }
      }
    })
  }, [currentTab])

  const handleNext = useCallback(() => {
    setQuestionStates(prev => {
      const currentState = prev[currentTab]
      if (!currentState || currentState.currentQuestion >= currentState.totalQuestions) return prev
      
      const newQuestion = currentState.currentQuestion + 1
      return {
        ...prev,
        [currentTab]: {
          ...currentState,
          currentQuestion: newQuestion,
          isFirstQuestion: false,
          isLastQuestion: newQuestion === currentState.totalQuestions,
          questionsAttempted: [
            ...currentState.questionsAttempted,
            currentState.currentQuestion
          ].filter((v, i, a) => a.indexOf(v) === i) // Unique values
        }
      }
    })
  }, [currentTab])

  const handleQuestionNavigate = useCallback((num:number) => {
    setQuestionStates(prev => {
      const currentState = prev[currentTab]
      if (!currentState || num < 1 || num > currentState.totalQuestions) return prev
      
      const newQuestion = num
      return {
        ...prev,
        [currentTab]: {
          ...currentState,
          currentQuestion: newQuestion,
          isFirstQuestion: newQuestion === 1,
          isLastQuestion: newQuestion === currentState.totalQuestions
        }
      }
    })
  }, [currentTab])

  const resetTab = useCallback((tabName: string) => {
    if (!quiz?.questions[tabName]) return

    setQuestionStates(prev => ({
      ...prev,
      [tabName]: {
        currentQuestion: 1,
        totalQuestions: quiz.questions[tabName].total_question,
        isFirstQuestion: true,
        isLastQuestion: quiz.questions[tabName].total_question <= 1,
        questionsAttempted: [],
        isLoading: false
      }
    }))
  }, [quiz])

  const getCurrentQuestionState = useCallback(() => {
    return questionStates[currentTab] || {
      currentQuestion: 1,
      totalQuestions: 0,
      isFirstQuestion: true,
      isLastQuestion: true,
      questionsAttempted: [],
      isLoading: loading
    }
  }, [currentTab, questionStates, loading])

  const value = useMemo(() => ({
    currentTab,
    setCurrentTab,
    tabs,
    questionStates,
    handlePrevious,
    handleNext,
    resetTab,
    handleQuestionNavigate,
    getCurrentQuestionState,
    loading: loading || quizLoading,
    error: error || quizError
  }), [
    currentTab,
    tabs,
    questionStates,
    handlePrevious,
    handleNext,
    handleQuestionNavigate,
    resetTab,
    getCurrentQuestionState,
    loading,
    quizLoading,
    error,
    quizError
  ])

  return (
    <QuizNavigateContext.Provider value={value}>
      {children}
    </QuizNavigateContext.Provider>
  )
}

export function useQuizNavigate() {
  const context = useContext(QuizNavigateContext)
  if (!context) {
    throw new Error('useQuizNavigate must be used within a QuizNavigateProvider')
  }
  return context
}