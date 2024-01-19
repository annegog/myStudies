import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import NavBarOptions from "../../../components/NavBarOptions";

const Grades = () => {
    const navigate = useNavigate();

    const handleCreationGrades = () => {
        navigate("/professor/create-grades")
    };

    const handleShowGrades = () => {
        navigate("/professor/show-grades")
    };

    const [activeCourse, setActiveCourse] = useState(false);

    const toggleCourse = (course) => {
        setActiveCourse(activeCourse === course ? null : course);
    };


    const courses = [
        "Εισαγωγή στον Προγραμματισμό",
        "Αντικειμενοστραφής Προγραμματισμός", 
        "Αρχές Γλωσσών Προγραμματισμού"
    ]

    return (
        <div>
            <Navbar/>
            <NavBarOptions userType={"professor"}/>
            <main className="Professor Main">
                {courses.map(courses => (
                    <div style={{ marginTop: "2rem" }} className="bg-zinc-300 bg-opacity-50 flex flex-col  px-40 py-12 rounded-lg max-md:px-5">
                        <div className="flex flex-row cursor-pointer text-left w-full text-lg py-2 focus:outline-none" onClick={() => toggleCourse(!activeCourse)}>
                            <span>{activeCourse ? "▲" : "▼"}</span>
                            <h> {courses} </h>
                        </div>
                        {activeCourse && (
                            <div className="Options">
                                <button  onClick={handleCreationGrades} className="bg-blue-500 text-black px-4 py-2 mr-10 rounded-3xl hover:bg-blue-600"> Δημιουργία Βαθμολογίου </button>
                                <button  onClick={handleCreationGrades} className="bg-green-500 text-black px-4 py-2 mt-10 rounded-3xl hover:bg-blue-600"> Προβολή Βαθμολογίου </button>
                            </div>
                        )}
                    </div>
                ))}
            </main>

            <Footer/>
        </div>
    );
};

export default Grades;