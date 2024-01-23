import React from "react";
import axios from "axios";

import { Route, Routes } from "react-router-dom";

import { UserContextProvider } from "./components/UserContext";

import Login from "./pages/Common/Login";
import Profile from "./pages/Common/Profile";
import Recovery from "./pages/Common/Help/Recovery";
import MobileApp from "./pages/Common/Help/MobileApp";
import ConnectHelp from "./pages/Common/Help/ConnectHelp";
import ContactAdmin from "./pages/Common/Help/ContactAdmin";
import CommonQuestions from "./pages/Common/Help/CommonQuestions";

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

        {/* Student Main */}

        <Route path="/student/:id" element={<Main />} />
        <Route path="/student/grades/:id" element={<Grades />} />
        <Route path="/student/courses/:id" element={<Courses />} />

        {/* Professor Main */}

        <Route path="/professor/:id" element={<MainProfessors />} />
        <Route path="/professor/grades/:id" element={<GradesProfessors />} />
        <Route path="/professor/grades-create/:id/:course" element={<GradesCreate />} />
        <Route path="/professor/grades-show/:id/:course" element={<GradesShow />} />

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