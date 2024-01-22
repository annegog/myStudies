import React from "react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Main = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleClick = () => {
        navigate(`/professor/grades/${id}`);
    };

    // Test Courses
    const courses = [
        "Εισαγωγή στον Προγραμματισμό",
        "Αντικειμενοστραφής Προγραμματισμός",
        "Αρχές Γλωσσών Προγραμματισμού"
    ]

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"professor"} userId={id} />
            <main className="Professor Main">
                <div className="mt-10 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 bg-amber-50">
                    <h2 className="text-2xl font-thin justify-center text-center mb-1"> Τα μαθήματα μου </h2>
                    {courses.map(lessons => (
                        <div key={lessons} className="bg-slate-200 p-2 rounded-lg mt-8 space-y-4">
                            <button className="flex flex-row text-left w-full text-lg py-2 focus:outline-none" onClick={() => handleClick()}>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <p> {lessons} </p>
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Main;