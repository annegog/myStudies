import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar_students";
import NavBarOptions from "../../components/NavBarOptions";

const Certifications = () => {
    // const [studentData, setStudentData] = useState(null);    {/* To have the info */}

    const navigate = useNavigate();

    const handleRequest = () => {
        navigate("/student/certifications/request");
    };

    const handleStatus = () => {
        navigate("/student/certifications/status");
    };

    const handleHistory = () => {
        navigate("/student/certifications/history");
    };

    return (
        <div className="Certifications Page">
            <Navbar/>
            <NavBarOptions userType="student"/> {/* Instead of student string, giving the studentData.status */}
            <main className="Main Context of Certification Page">
                <div className="mt-16 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 mb-36">
                    <div className="grid grid-flow-row justify-center mt-2 mb-2 gap-4">
                        <button type="button" className="text-center text-white font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 "
                            onClick={handleRequest}
                        > Αίτηση για παροχή πιστοποιητικού </button>

                        <button type="button" className="text-center text-white font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 "
                            onClick={handleStatus}
                        > Εμφάνιση της κατάστασης αιτήσεων για πιστοποιητικά </button>

                        <button type="button" className="text-center text-white font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 "
                            onClick={handleHistory}
                        > Ιστορικό Αιτήσεων </button>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Certifications;