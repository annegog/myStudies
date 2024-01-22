import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Grades = () => {
    const navigate = useNavigate();

    const handleCreationGrades = () => {
        navigate("/professor/grades-create");
    };

    const handleShowGrades = () => {
        navigate("/professor/grades-show");
    };

    const [activeCourses, setActiveCourses] = useState({});

    const toggleCourse = (course) => {
        setActiveCourses({ ...activeCourses, [course]: !activeCourses[course] });
    };

    const courses = [
        "Εισαγωγή στον Προγραμματισμό",
        "Αντικειμενοστραφής Προγραμματισμός", 
        "Αρχές Γλωσσών Προγραμματισμού",
    ]

    return (
        <div>
            <Navbar/>
            <NavBarOptions userType={"professor"}/>
            <main className="Professor Main">                
                <h2 className="text-center text-3xl font-thin justify-center mt-10 mb-10"> Τα μαθήματα μου </h2>
                {courses.map(courses => (
                    <div className="flex flex-col bg-gray-300 bg-opacity-75 px-40 py-10 mt-5 mb-5 m-20 rounded-3xl max-md:px-5">
                        <div className="flex flex-row text-left w-full text-lg py-2 cursor-pointer focus:outline-none" onClick={() => toggleCourse(courses)}>
                            <span> {activeCourses[courses] ? "▲" : "▼"} </span>
                            <h> {courses} </h>
                        </div>

                        {activeCourses[courses] && (
                            <div className="Options">
                                <button onClick={handleCreationGrades} className="bg-blue-500 text-black font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-blue-600"> Δημιουργία Βαθμολογίου </button>
                                <button onClick={handleShowGrades} className="bg-green-500 text-black font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-green-600"> Προβολή Βαθμολογίου </button>
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