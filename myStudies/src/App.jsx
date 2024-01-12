import React from "react";

import { Route, Routes } from 'react-router-dom';

import axios from "axios";
import Grades from "./pages/GradesPage";

import Help from "./pages/General/Help";
import Login from "./pages/General/Login";

import Courses from "./pages/CoursesPage";
import Profile from "./pages/ProfilePage";
import MainPageS from "./pages/MainPage_students";

import Declarations from "./pages/Declarations/Declarations";

import CertificationsStatus from "./pages/Certifications/Status";
import Certifications from "./pages/Certifications/Certifications";
import CertificationsRequest from "./pages/Certifications/Request";
import CertificationsHistory from "./pages/Certifications/History";


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const App = () => {
    return (
        <Routes>

            {/* General */}

            {/* <Route path="/" element={<Login/>}/> */}
            <Route path="/help" element={<Help/>}/>
            <Route path="/login" element={<Login/>}/>

            {/* Student Main */}

            <Route path="/student" element={<MainPageS/>}/>
            <Route path="/student/grades" element={<Grades/>}/>
            <Route path="/student/courses" element={<Courses/>}/>
            <Route path="/student/profile" element={<Profile/>}/>

            {/* Declarations */}
            
            <Route path="/student/declarations" element={<Declarations/>}/>

            {/* Certificates */}

            <Route path="/student/certifications" element={<Certifications/>} />
            <Route path="/student/certifications/status" element={<CertificationsStatus/>}/>
            <Route path="/student/certifications/request" element={<CertificationsRequest/>}/>
            <Route path="/student/certifications/history" element={<CertificationsHistory/>}/>
        </Routes>
    );
};

export default App;