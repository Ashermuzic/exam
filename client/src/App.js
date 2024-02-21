import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import SingleQuestion from "./pages/single/SingleQuestion";
import SingleExam from "./pages/single/SingleExam";
import New from "./pages/new/New";
import Profile from "./pages/profile/Profile";
import NewQuestion from "./pages/new/NewQuestion";
import QuestionEdit from "./pages/edit/QuestionEdit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { questionsInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import QuestionList from "./pages/list/QuestionList";
import ExamList from "./pages/list/ExamList";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={
                  <New inputs={questionsInputs} title="Add New Question" />
                }
              />
            </Route>
            <Route path="questions">
              <Route index element={<QuestionList />} />
              <Route path=":questionId" element={<SingleQuestion />} />
              <Route
                path="new"
                element={
                  <NewQuestion
                    inputs={questionsInputs}
                    title="Add New Question"
                  />
                }
              />
              <Route
                path="edit/:questionId"
                element={
                  <QuestionEdit
                    inputs={questionsInputs}
                    title="Edit Question"
                  />
                }
              />
            </Route>
            <Route path="exams">
              <Route index element={<ExamList />} />
              <Route path=":examId" element={<SingleExam />} />
              <Route
                path="new"
                element={
                  <NewQuestion
                    inputs={questionsInputs}
                    title="Add New Question"
                  />
                }
              />
              <Route
                path="edit/:questionId"
                element={
                  <QuestionEdit
                    inputs={questionsInputs}
                    title="Edit Question"
                  />
                }
              />
            </Route>
            <Route>
              <Route path="profile" element={<Profile />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
