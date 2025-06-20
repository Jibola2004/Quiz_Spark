import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import axios from 'axios'

type Question = {
  question_id: number;
  question: string;
  options: string[];
};

type SubjectQuestions = {
  total_question: number;
  question_list: Question[];
};

type QuizData = {
  total_subject: number;
  subject_names: string[];
  questions: {
    [subject: string]: SubjectQuestions;
  };
};
type SubjectWithCount = {
  name: string;
  count: number;
};
//type StudentAnswer = {
  //question_id: number;
  //answer: string;
//};

//type SubjectAnswers = {
//  total_question: number;
  //answer_list: StudentAnswer[];
//};

//export type QuizSubmission = {
//  total_subjects: number;
//  subject_names: string[];
//  students_answers: {
 //   [subject: string]: SubjectAnswers;
//  };
//};
export type QuizSubmission = {
  total_subjects: number;
  subject_names: string[];
  students_answers: Record<string, Record<string, string>>;
};


type QuestionBankContextType = {
  quiz?: QuizData;
  loading: boolean;
  error?: Error;
  submitAnswers: (answers: QuizSubmission) => Promise<void>;
  setSubjects: (subjects: SubjectWithCount[]) => void;
};



const QuestionBankContext = createContext<QuestionBankContextType | null>(null);

export function QuestionBankProvider({ children }: { children: ReactNode }) {
  const [quiz, setQuiz] = useState<QuizData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [subjects, setSubjects] = useState<SubjectWithCount[]>([]);

  useEffect(() => {
     if (subjects.length === 0) {
    // Don't load quiz if subjects list is empty
    return;
  }
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.post<QuizData>('http://localhost:3000/api/quiz/custom', {
                   subjects
                    });
        setQuiz(response.data);
      } catch (err) {
        console.error('Failed to load quiz:', err);
        setError(err instanceof Error ? err : new Error('Quiz loading failed'));
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [subjects]);



  const submitAnswers = async (answers: QuizSubmission) => {
    try {
      const response = await axios.post('/api/submit-quiz', answers);
      return response.data;
      //console.log('submission from context:',answers)
    } catch (err) {
      console.error('Submission failed at question context:', err);
      throw err;
    }
  };

  return (
    <QuestionBankContext.Provider value={{ quiz, loading, error, submitAnswers,setSubjects }}>
      {children}
    </QuestionBankContext.Provider>
  );
}

export function useQuestionBank() {
  const context = useContext(QuestionBankContext);
  if (!context) {
    throw new Error('useQuestionBank must be used within a QuestionBankProvider');
  }
  return context;
}