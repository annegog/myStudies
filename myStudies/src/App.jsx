import React from "react";
import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import Courses from "./pages/CoursesPage";
import Profile from "./pages/ProfilePage";
import MainPageS from "./pages/MainPage_students";
import Grades from "./pages/GradesPage";

import Certifications from "./pages/Certifications/Certifications";
import CertificationsStatus from "./pages/Certifications/Status";
import CertificationsRequest from "./pages/Certifications/Request";
import CertificationsHistory from "./pages/Certifications/History";

import DeclarationsStart from "./pages/Declarations/DeclarationPage_students";
import DeclarationVerification from "./pages/Declarations/VerificationPage_students";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const App = () => {
    return (
        <Routes>

            {/* General */}

            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Student Main */}

            <Route path="/student" element={<MainPageS />} />
            <Route path="/student/grades" element={<Grades />} />
            <Route path="/student/courses" element={<Courses />} />
            <Route path="/student/profile" element={<Profile />} />

            {/* Declarations */}
            
            <Route path="/student/declarations/start" element={<DeclarationsStart />} />
            <Route path="/student/declarations/verification" element={<DeclarationVerification />} />

            {/* Certificates */}

            <Route path="/student/certifications" element={<Certifications />} />
            <Route path="/student/certifications/status" element={<CertificationsStatus />} />
            <Route path="/student/certifications/request" element={<CertificationsRequest />} />
            <Route path="/student/certifications/history" element={<CertificationsHistory />} />
        </Routes>
    );
};

export default App;