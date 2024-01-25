import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = () => {
    return (
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium dark:text-gray-400"> Αρχική Σελίδα </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Home = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`/courses/professor/${id}`);
                const coursesData = await response.data;
                setCourses(coursesData);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };            

        fetchCourses();
    }, [id]);

    const handleClick = () => {
        navigate(`/professor/grades/${id}`);
    };

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"professor"} userId={id} />
            <Path />
            
            <div className="px-4 lg:px-16 xl:px-32">
                <div className="justify-center items-center text-center">
                    <h2 className="text-center text-3xl font-thin"> Τα μαθήματα μου </h2>
                </div>

                <div div className="flex flex-col justify-center items-center p-2 mt-8">
                    {courses.map(lesson => (
                        <div key={lesson._id}>
                            <button className="flex w-96 text-lg py-2 focus:outline-none bg-gray-50 rounded-xl p-5 mb-4 shadow-md hover:shadow-xl" onClick={() => handleClick()}>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <p className="flex flex-col pl-5"> {lesson.title} </p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;