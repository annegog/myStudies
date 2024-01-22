import React from "react";

import { useState } from "react";

import { useParams } from "react-router-dom"; // Import useParams
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import Courses from "../../components/Courses";
import NavBarOptions from "../../components/Common/NavBarOptions";

const CoursesPage = () => {
    const { id } = useParams(); // Use useParams to access the id
    console.log("Received ID in Grades:", id); // Check the received ID
    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"student"} userId={id} />
            <div className="mt-10 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 bg-amber-50">
                <h2 className="text-2xl font-thin justify-center text-center mb-1"> Πρόγραμμα Σπουδών </h2>
                <Courses />
            </div>
            <Footer />
        </div>
    );
};

export default CoursesPage;