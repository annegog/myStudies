import React from "react";

import { Route, Routes } from "react-router-dom";

import Grades from "./pages/GradesPage";
import LoginPage from "./pages/LoginPage";
import Courses from "./pages/CoursesPage";
import Profile from "./pages/ProfilePage";
import MainPageS from "./pages/MainPage_students";

import Certifications from "./pages/Certifications/Main";
import Declarations from "./pages/DeclarationPage_students";
import CertificationsStatus from "./pages/Certifications/Status";
import CertificationsRequest from "./pages/Certifications/Request";
import CertificationsHistory from "./pages/Certifications/History";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/student" element={<MainPageS/>}/>
            <Route path="/student/grades" element={<Grades/>}/>
            <Route path="/student/courses" element={<Courses/>}/>
            <Route path="/student/profile" element={<Profile/>}/>
            <Route path="/student/declarations" element={<Declarations/>}/>
            <Route path="/student/certifications" element={<Certifications/>}/>
            <Route path="/student/certifications/status" element={<CertificationsStatus/>}/>
            <Route path="/student/certifications/request" element={<CertificationsRequest/>}/>
            <Route path="/student/certifications/history" element={<CertificationsHistory/>}/>
        </Routes>
    );
};

export default App;