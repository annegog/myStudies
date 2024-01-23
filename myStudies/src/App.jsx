import React from "react";
import axios from "axios";

import { Route, Routes } from "react-router-dom";

import { UserContextProvider } from "./components/UserContext";

import Login from "./pages/General/Login";
import Profile from "./pages/General/Profile";
import Recovery from "./pages/General/Help/Recovery";
import MobileApp from "./pages/General/Help/MobileApp";
import ConnectHelp from "./pages/General/Help/ConnectHelp";
import ContactAdmin from "./pages/General/Help/ContactAdmin";
import CommonQuestions from "./pages/General/Help/CommonQuestions";

import StudentHome from "./pages/Students/Home/Home";
import Courses from "./pages/Students/CoursesProgram/Courses";
import GradesStudent from "./pages/Students/Grades/GradesStudent";
import Declarations from "./pages/Students/Declarations/Declarations";
import Certifications from "./pages/Students/Certifications/Certifications";
import CertificationsStatus from "./pages/Students/Certifications/CertificationsStatus";
import CertificationsRequest from "./pages/Students/Certifications/CertificationsRequest";
import CertificationsHistory from "./pages/Students/Certifications/CertificationsHistory";

import ProfessorHome from "./pages/Professors/Home/Home"
import GradesShow from "./pages/Professors/Grades/GradesShow"
import GradesCreate from "./pages/Professors/Grades/GradesCreate"
import GradesProfessor from "./pages/Professors/Grades/GradesProfessor"

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
    return (
        <UserContextProvider>
            <Routes>
                {/* General */}

                <Route path="/profile/:id" element={<Profile />} />
                
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recovery" element={<Recovery />} />
                <Route path="/mobile-app" element={<MobileApp />} />
                <Route path="/admin-contact" element={<ContactAdmin />} />
                <Route path="/connection-help" element={<ConnectHelp />} />
                <Route path="/common-questions" element={<CommonQuestions />} />

                {/* Professors */}

                <Route path="/professor/:id" element={<ProfessorHome />} />
                <Route path="/professor/grades/:id" element={<GradesProfessor />} />
                <Route path="/professor/grades-show/:id" element={<GradesShow />} />
                <Route path="/professor/grades-create/:id" element={<GradesCreate />} />

                {/* Students */}

                <Route path="/student/:id" element={<StudentHome />} />
                <Route path="/student/courses/:id" element={<Courses />} />
                <Route path="/student/grades/:id" element={<GradesStudent />} />
                <Route path="/student/declarations/:id" element={<Declarations />} />
                <Route path="/student/certifications/:id" element={<Certifications />} />
                <Route path="/student/certifications/status/:id" element={<CertificationsStatus />} />
                <Route path="/student/certifications/request/:id" element={<CertificationsRequest />} />
                <Route path="/student/certifications/history/:id" element={<CertificationsHistory />} />

            </Routes>
        </UserContextProvider>
    );
};

export default App;