import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Certifications = () => {
    const navigate = useNavigate();

    const { id } = useParams(); // Use useParams to access the id
    
    console.log("Received ID in Grades:", id); // Check the received ID

    const handleRequest = () => {
        navigate(`/student/certifications/request/${id}`);
    };

    const handleStatus = () => {
        navigate(`/student/certifications/status/${id}`);
    };
    
    const handleHistory = () => {
        navigate(`/student/certifications/history/${id}`);
    };

    return (
        <div className="bg-gray-50">
            <Navbar />
            <NavBarOptions userType={"student"} userId={id} /> {/* Instead of student string, giving the studentData.status */}
            <div className="mt-16 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 mb-36">
                <div className="grid grid-flow-row justify-center mt-2 mb-2 gap-4">
                    <button type="button" className="text-center text-white font-medium bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 shadow-md hover:shadow-xl"
                        onClick={handleRequest}
                    > Αίτηση για παροχή πιστοποιητικού </button>

                    <button type="button" className="text-center text-white font-medium bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 shadow-md hover:shadow-xl"
                        onClick={handleStatus}
                    > Εμφάνιση της κατάστασης αιτήσεων για πιστοποιητικά </button>

                    <button type="button" className="text-center text-white font-medium bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 shadow-md hover:shadow-xl"
                        onClick={handleHistory}
                    > Ιστορικό Αιτήσεων </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Certifications;