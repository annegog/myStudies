import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import MainPageS from "./pages/MainPage_students";
import Courses from "./pages/CoursesPage";
import Certifications from "./pages/CertificationsPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<LoginPage/>} />
      <Route path="/student" element={<MainPageS/>} />
      <Route path="/student/courses" element={<Courses/>}/>
      <Route path="/student/certifications" element={<Certifications/>}/>
    </Routes>
    
  );
};

export default App;
