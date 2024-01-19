import React from "react";
import axios from "axios";

import { Route, Routes } from "react-router-dom";

import Login from "./pages/General/Login";
import Profile from "./pages/General/Profile";
import MobileApp from "./pages/General/Help/MobileApp";
import ConnectHelp from "./pages/General/Help/ConnectHelp";
import ContactAdmin from "./pages/General/Help/ContactAdmin";
import CommonQuestions from "./pages/General/Help/CommonQuestions";

import CertificationsStatus from "./pages/Students/Certifications/Status";
import Certifications from "./pages/Students/Certifications/Certifications";
import CertificationsRequest from "./pages/Students/Certifications/Request";
import CertificationsHistory from "./pages/Students/Certifications/History";
import Declarations from "./pages/Students/Declarations/Declarations";
import Grades from "./pages/Students/Grades/Grades";
import Courses from "./pages/Students/Courses";
import Main from "./pages/Students/Main";

import GradesProfessors from "./pages/Professors/Grades/Grades"
import MainProfessors from "./pages/Professors/Main/Main"

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

        <Route path="/student/:id" element={<Main />} />
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
