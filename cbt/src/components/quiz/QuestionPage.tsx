import { useQuizNavigate } from "@/contexts/navigate-context";
import { Card } from "../ui/card";
import { useQuestionBank } from "@/contexts/questions-context";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

interface QuestionPageProps {
  selectedAnswers: Record<string, Record<string, string>>;
  currentTab: string;
}

const QuestionPage = ({ selectedAnswers, currentTab }: QuestionPageProps) => {
  const { questionStates, loading, } = useQuizNavigate();
  const { quiz, loading: quizLoading } = useQuestionBank();

  const question_num = questionStates?.[currentTab]?.totalQuestions || 0;
  const currentQuestion = questionStates?.[currentTab]?.currentQuestion || 1;
  const subjectQuestions = quiz?.questions?.[currentTab]?.question_list || [];
  

  const renderQuestionCircles = () => {
    if (loading || quizLoading) {
      return (
        <div className="flex flex-wrap gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-10 h-10 rounded-full" />
          ))}
        </div>
      );
    }

    if (question_num <= 0) {
      return (
        <div className="text-muted-foreground text-sm py-4">
          No questions available for this subject
        </div>
      );
    }

    return (
      
      <div className="flex flex-wrap gap-4">
        {/*className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-10" */}
        {subjectQuestions.map((question, i) => {
          const isAnswered = !!selectedAnswers[currentTab]?.[question.question_id];

          const isCurrent = i + 1 === currentQuestion;
          return (
            <QuestionCircle 
              key={question.question_id} 
              num={i + 1} 
              answered={isAnswered}
              current={isCurrent}
              tab={currentTab}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Card className={cn(
      "min-h-[200px] h-fit w-full p-4",
      "lg:max-w-[280px] lg:sticky lg:top-4"
    )}>
      <div className="flex justify-between items-center pb-2">
        <p className="text-xl font-bold">Questions</p>
        <p className="text-sm text-muted-foreground">
          {Object.keys(selectedAnswers).filter(key => key.startsWith(currentTab)).length}/{question_num}
        </p>
      </div>
      {renderQuestionCircles()}
    </Card>
  );
};

interface QuestionCircleProps {
  num: number;
  answered: boolean;
  current?: boolean;
  tab: string;
}

const QuestionCircle = React.memo(({ num, answered, current = false, tab }: QuestionCircleProps) => {
  const { setCurrentTab,handleQuestionNavigate } = useQuizNavigate();

  const handleClick = (num:number) => {
    setCurrentTab(tab);
    handleQuestionNavigate(num)
  };

  return (
    <button
      onClick={()=>handleClick(num)}
      className={cn(
        "rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium transition-all",
        "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        answered ? 'bg-green-500 text-white' : 'bg-muted text-foreground',
        current ? 'ring-2 ring-primary ring-offset-2' : ''
      )}
      aria-current={current ? 'step' : undefined}
      aria-label={`Question ${num} ${answered ? 'answered' : 'unanswered'}`}
    >
      {num}
    </button>
  );
});

QuestionCircle.displayName = "QuestionCircle";


export default QuestionPage