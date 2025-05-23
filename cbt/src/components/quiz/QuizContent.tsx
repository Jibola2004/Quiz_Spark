import { Separator } from "@radix-ui/react-dropdown-menu"
import QuizTitle from "./QuizTitle"
import { Card } from "../ui/card"
import { useQuizNavigate } from "@/contexts/navigate-context"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Calculator, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import QuestionPage from "./QuestionPage"
import { Button } from "../ui/button"
import QuizPage from "./QuizPage"
import { useQuestionBank, type QuizSubmission } from "@/contexts/questions-context"
import { useNavigate } from "react-router"

const QuizContent = ({ tabs,state }: { tabs: string[],state:object }) => {
  const navigate = useNavigate()
  const { 
     
    currentTab, 
    setCurrentTab,
    getCurrentQuestionState
  } = useQuizNavigate()

  const {submitAnswers}=useQuestionBank()

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Record<string, string>>>({});

  const [submitting, setSubmitting] = useState(false)

  const currentQuestionState = getCurrentQuestionState()
  const { currentQuestion, totalQuestions } = currentQuestionState

  useEffect(() => {
    if (tabs.length > 0 && !currentTab) {
      setCurrentTab(tabs[0])
    }
  }, [tabs, currentTab, setCurrentTab])

  const handleAnswerSelect = (subject: string, questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
    ...prev,
    [subject]: {
      ...(prev[subject] || {}),
      [questionId]: answer
    }
  }))
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      // Format answers for submission

      const submission = formatAnswersForSubmission(selectedAnswers)
      // Submit through context
      submitAnswers(submission)
      console.log('Submitting from quiz content:', submission)
      navigate('/exit')
      
      // Show success message
    } catch (error) {
      console.error('Submission error at quiz content:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatAnswersForSubmission = (answers: Record<string, Record<string, string>>): QuizSubmission => {
    // Implementation depends on your exact submission format requirements
    console.log(answers)
    return {
      total_subjects: tabs.length,
      subject_names: tabs,
      students_answers: answers // Fill this with formatted answers
    }
  }

  return (
    <Card className='m-2 max-h-[calc(100vh - 20px)] gap-2 min-h-screen max-w-[calc(100% - 8px)]'>
      <QuizTitle state={state} />
      <Separator className="my-4 h-2" />
      
      <Card className='mx-20 h-20 p-4 justify-between items-center flex flex-row'>
        <div className="font-bold text-center min-w-[80px]">
          <p className="text-sm">Question</p>
          <p className="text-lg">
            {currentQuestion}
            <span className="text-muted-foreground">/{totalQuestions}</span>
          </p>
        </div>

        <div className="flex-1 mx-4">
          <Tabs value={currentTab}>
            <TabsList className="hidden md:flex w-full  gap-2">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className="truncate"
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsList className="flex w-full  gap-1 md:hidden">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className="text-xs p-2"
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab[0].toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="min-w-[40px] flex justify-end">
          <Calculator className="h-6 w-6 text-muted-foreground" />
        </div>
      </Card>

      <div className='hidden lg:flex lg:px-20 lg:gap-6'>
        <div className='flex flex-col gap-6 flex-1'>
          <QuestionPage 
            selectedAnswers={selectedAnswers} 
            currentTab={currentTab}
          />
          <div className="flex justify-between items-center">
            {/*<div className="text-sm text-muted-foreground">
              {Object.keys(selectedAnswers).length} answers selected
            </div>*/}
            <Button 
              onClick={handleSubmit}
              disabled={submitting}
              className="min-w-[200px]"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : 'Submit Answers'}
            </Button>
          </div>
        </div>
        <QuizPage 
          onAnswerSelect={handleAnswerSelect} 
          selectedAnswers={selectedAnswers}
        />
      </div>

      <div className='flex flex-col px-4 gap-6 lg:hidden'>
        <QuizPage 
          onAnswerSelect={handleAnswerSelect} 
          selectedAnswers={selectedAnswers}
        />
        <QuestionPage 
          selectedAnswers={selectedAnswers} 
          currentTab={currentTab}
        />
        <div className='flex flex-col gap-2 sticky bottom-0 bg-background p-4 border-t'>
         {/* <div className="text-sm text-muted-foreground text-center">
          {Object.keys(selectedAnswers).length} answers selected
          </div>*/}
          <Button 
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : 'Submit Answers'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default QuizContent
