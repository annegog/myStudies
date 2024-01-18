import React from "react";
import axios from "axios";

import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

import Grades from "./pages/Grades/Grades";

import MobileApp from "./pages/Help/MobileApp";
import ConnectHelp from "./pages/Help/ConnectHelp";
import ContactAdmin from "./pages/Help/ContactAdmin";
import CommonQuestions from "./pages/Help/CommonQuestions";

import Courses from "./pages/CoursesPage";
import Profile from "./pages/ProfilePage";
import MainPageS from "./pages/MainPage_students";

import Declarations from "./pages/Declarations/Declarations";

import CertificationsStatus from "./pages/Certifications/Status";
import Certifications from "./pages/Certifications/Certifications";
import CertificationsRequest from "./pages/Certifications/Request";
import CertificationsHistory from "./pages/Certifications/History";

import MainProfessors from "./pages/Professors/Main/Main"
import GradesProfessors from "./pages/Professors/Grades/Grades"

import { UserContextProvider } from "./components/UserContext";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>

      <Routes>
        {/* General */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Help */}

        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/admin-contact" element={<ContactAdmin />} />
        <Route path="/connection-help" element={<ConnectHelp />} />
        <Route path="/common-questions" element={<CommonQuestions />} />

        {/* Student Main */}

        <Route path="/student/:id" element={<MainPageS />} />
        <Route path="/student/grades" element={<Grades />} />
        <Route path="/student/courses" element={<Courses />} />
        <Route path="/student/profile" element={<Profile />} />

        {/* Professor Main */}

        <Route path="/professor" element={<MainProfessors />} />
        <Route path="/professor/grades" element={<GradesProfessors />} />

        {/* Declarations */}

        <Route path="/student/declarations" element={<Declarations />} />

        {/* Certificates */}

        <Route path="/student/certifications" element={<Certifications />} />
        <Route path="/student/certifications/status" element={<CertificationsStatus />} />
        <Route path="/student/certifications/request" element={<CertificationsRequest />} />
        <Route path="/student/certifications/history" element={<CertificationsHistory />} />
      </Routes>

    </UserContextProvider>
  );
};

export default App;
