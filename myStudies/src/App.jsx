import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import MainPageS from "./pages/MainPage_students";
import Courses from "./pages/CoursesPage";
import Certifications from "./pages/CertificationsPage";
import Profile from "./pages/ProfilePage";
import Grades from "./pages/GradesPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/student" element={<MainPageS/>} />
      <Route path="/student/courses" element={<Courses/>}/>
      <Route path="/student/certifications" element={<Certifications/>}/>
      <Route path="/student/profile" element={<Profile/>} />
      <Route path="/student/grades" element={<Grades/>}/>
    </Routes>
    
  );
};

export default App;
