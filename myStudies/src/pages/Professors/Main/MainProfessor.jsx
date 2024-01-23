import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Main = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const handleClick = () => {
        navigate(`/professor/grades/${id}`);
    };

    useEffect(() => {
        // Fetch courses data
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`/courses/professor/${id}`);
                const coursesData = await response.data;
                setCourses(coursesData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };            

        fetchCourses();
    }, [id]);

    return (
        <div className="bg-gray-50">
            <Navbar />
            <NavBarOptions userType={"professor"} userId={id} />
            <main className="Professor Main">
                <div className="mt-10 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 bg-gray-50">
                    <h2 className="text-2xl font-thin justify-center text-center mb-1"> Τα μαθήματα μου </h2>
                    {courses.map(lesson => (
                        <div key={lesson._id} className="bg-slate-200 p-2 rounded-xl mt-8 space-y-4 bg-white shadow-2xl">
                            <button className="flex flex-row text-left w-full text-lg py-2 focus:outline-none" onClick={() => handleClick()}>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <p> {lesson.title} </p>
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
