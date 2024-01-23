import React from "react";
import axios from "axios";

import { Route, Routes } from "react-router-dom";

import Login from "./pages/General/Login";
import Profile from "./pages/General/Profile";
import Recovery from "./pages/General/Help/Recovery";
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
import GradesCreate from "./pages/Professors/Grades/Create"
import GradesShow from "./pages/Professors/Grades/Show"
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
        <Route path="/profile/:id" element={<Profile />} />

        {/* Help */}

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

        {/* Declarations */}

        <Route path="/student/declarations/:id" element={<Declarations />} />

        {/* Certificates */}

        <Route path="/student/certifications/:id" element={<Certifications />} />
        <Route path="/student/certifications/status/:id" element={<CertificationsStatus />} />
        <Route path="/student/certifications/request/:id" element={<CertificationsRequest />} />
        <Route path="/student/certifications/history/:id" element={<CertificationsHistory />} />
      </Routes>

    </UserContextProvider>
  );
};

export default App;
