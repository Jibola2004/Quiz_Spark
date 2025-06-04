import { BrowserRouter as Router,Routes,Route } from "react-router";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthLayout from "./pages/Auth/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import { QuestionBank } from "./pages/QuestionBank";
const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
         <Route path="home" element={<QuestionBank />} />

        </Route>
        {/*auth route*/}
        <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        </Route>
         <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App