import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuizNavigate } from "@/contexts/navigate-context";
import { cn } from "@/lib/utils";

interface NavigateQuestionProps {
  currentTab: string;
}

export const NavigateQuestion = ({ currentTab }: NavigateQuestionProps) => {
  const { 
    handleNext, 
    handlePrevious, 
    getCurrentQuestionState, 
    loading 
  } = useQuizNavigate();
  
  const { 
    currentQuestion, 
    totalQuestions, 
    isFirstQuestion, 
    isLastQuestion 
  } = getCurrentQuestionState();

  return (
    <div className="flex items-center justify-between w-full gap-4 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "gap-1 sm:gap-2 transition-all",
          "hover:bg-primary/10 hover:scale-[1.02]",
          "active:scale-95 focus-visible:ring-2 focus-visible:ring-primary",
          "px-2 sm:px-4"
        )}
        onClick={handlePrevious}
        disabled={isFirstQuestion || loading}
        aria-label="Previous question"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-medium text-foreground">
          {currentTab}
        </span>
        <span className="text-xs text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        className={cn(
          "gap-1 sm:gap-2 transition-all",
          "hover:bg-primary/10 hover:scale-[1.02]",
          "active:scale-95 focus-visible:ring-2 focus-visible:ring-primary",
          "px-2 sm:px-4"
        )}
        onClick={handleNext}
        disabled={isLastQuestion || loading}
        aria-label="Next question"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};