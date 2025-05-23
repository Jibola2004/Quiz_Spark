import { ThemeProvider } from "./components/theme-provider"
import { QuestionBankProvider } from "./contexts/questions-context"
import ExamPage from "./pages/ExamPage"
import { BrowserRouter as Router,Routes,Route } from "react-router";
import HomePage from "./pages/HomePage";
import ExitPage from "./pages/ExitPage";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <Router>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QuestionBankProvider>
        <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/exam" element={<ExamPage />} />
           <Route path="/exit" element={<ExitPage />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
     
      </QuestionBankProvider>
    </ThemeProvider>
    </Router>
  )
}

export default App