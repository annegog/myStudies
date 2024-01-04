import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import MainPageS from "./pages/MainPage_students";
import Courses from "./pages/CoursesPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<LoginPage/>} />
      <Route path="/Student" element={<MainPageS/>} />
      <Route path="/student/courses" element={<Courses/>}/>
    </Routes>
    
  );
};

export default App;
