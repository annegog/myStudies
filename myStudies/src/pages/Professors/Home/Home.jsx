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

            <div className="flex justify-center items-center px-6 mt-12 mb-36">
                <h2 className="text-8xl font-serif justify-start mb-2 ml-4 animated2-text">
                    Τα<br/> Μαθήματα Μου
                </h2>
            <div className="grid grid-cols-4 mb-2 gap-6">
                {courses.map((lesson) => (
                    <div key={lesson._id} className="m-2">
                        <button className="info-container flex flex-col items-center justify-center text-center text-white font-medium bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-3xl text-base px-5 py-8 p-2 shadow-md hover:shadow-xl relative"
                            onClick={() => handleClick()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor" className="w-[4rem] h-[4rem]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                                <span className="text-4xl font-thin ml-4"> {lesson.title} </span>
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