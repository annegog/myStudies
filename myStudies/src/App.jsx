import { Route, Routes } from "react-router-dom";

import React from "react";
import Grades from "./pages/GradesPage";
import LoginPage from "./pages/LoginPage";
import Courses from "./pages/CoursesPage";
import Profile from "./pages/ProfilePage";
import MainPageS from "./pages/MainPage_students";
import Certifications from "./pages/CertificationsPage";

const App = () => {
    return(
        <Routes>
            <Route index element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/student" element={<MainPageS/>} />
            <Route path="/student/grades" element={<Grades/>}/>
            <Route path="/student/courses" element={<Courses/>}/>
            <Route path="/student/profile" element={<Profile/>} />
            <Route path="/student/certifications" element={<Certifications/>}/>
        </Routes>
    );
};

export default App;