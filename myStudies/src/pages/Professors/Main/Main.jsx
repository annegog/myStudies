import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Main = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/professor/grades");
    };

    // Test Courses
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
                <div className="bg-gray-300 bg-opacity-50 flex flex-col px-40 py-12 mx-20 my-20 rounded-3xl max-md:px-5">
                    <h2 className="text-2xl font-thin justify-center text-center mb-10 underline"> Τα μαθήματα μου </h2>

                    {courses.map(lessons => (
                        <div key={lessons}>
                            <button className="flex flex-row text-left w-full text-lg py-2 focus:outline-none" onClick={() => handleClick()}>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>
                                <p> {lessons} </p>
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Main;