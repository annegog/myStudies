import React from "react";

import { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Courses from "../../components/Courses";
import NavBarOptions from "../../components/NavBarOptions";

const CoursesPage = () => {
    return (
        <div>
        <Navbar />
        <NavBarOptions userType={"student"} />
        <div className="mt-10 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 bg-amber-50">
            <h2 className="text-2xl font-thin justify-center text-center mb-1"> Πρόγραμμα Σπουδών </h2>
            <Courses/>
        </div>
        <Footer />
        </div>
    );
};

export default CoursesPage;