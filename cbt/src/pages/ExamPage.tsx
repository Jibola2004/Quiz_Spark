import QuizContent from "@/components/quiz/QuizContent"
import { QuizNavigateProvider } from "@/contexts/navigate-context"
import { useQuestionBank } from "@/contexts/questions-context"
import { useLocation } from "react-router"

const ExamPage = () => {
  const { quiz } = useQuestionBank()
  const tabs = quiz?.subject_names || ['subject'] 
  const { state } = useLocation();
  

  return (
    <QuizNavigateProvider tabs={tabs}>
      <QuizContent tabs={tabs}  state={state}/>
    </QuizNavigateProvider>
  )
}

export default ExamPage