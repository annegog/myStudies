import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Grades = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [courses, setCourses] = useState([]);

     const handleCreationGrades = (selectedCourse) => {
        console.log(selectedCourse);
        navigate(`/professor/grades-create/${id}/${selectedCourse._id}`);
    };
    
    const handleShowGrades = (selectedCourse) => {
        navigate(`/professor/grades-show/${id}/${selectedCourse._id}`);
    };

    const [activeCourses, setActiveCourses] = useState({});
    
    const toggleCourse = (course) => {
        setActiveCourses({ ...activeCourses, [course]: !activeCourses[course] });
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
        <div>
            <Navbar />
            <NavBarOptions userType={"professor"} userId={id} />
            <nav class="flex mt-2 justify-center bg-transparent" aria-label="Breadcrumb">
                <ol class="inline-flex items-center m-3 sm:mb-0">
                    <li class="inline-flex items-center">
                    <a href={`/professor/${id}`} class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Αρχική Σελίδα
                    </a>
                    </li>
                    <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Βαθμολόγιο</span>
                    </div>
                    </li>
                </ol>
            </nav>
            <div className="mt-10 justify-center items-center md:justify-items-center px-6 lg:px-16 xl:px-32">
                <h2 className="text-center text-3xl font-thin justify-center mt-10 mb-10"> Τα μαθήματα μου </h2>
                {courses.map(course => (
                <div className="bg-gray-50 shadow-md hover:shadow-xl p-5 rounded-lg mt-10" key={course.id}>
                    <div className="flex flex-row text-left w-full text-lg cursor-pointer focus:outline-none" onClick={() => toggleCourse(course.id)}>
                        <span> {activeCourses[course.id] ? "▲" : "▼"} </span>
                        <h> {course.title} </h>
                    </div>
                    {activeCourses[course.id] && (
                        <div className="pl-4 mt-3">
                            <button onClick={() => handleCreationGrades(course)} className="bg-blue-500 shadow-md hover:shadow-xl text-black font-medium px-4 py-2 mt-1 mr-4 rounded-3xl hover:bg-blue-600"> Δημιουργία Βαθμολογίου </button>
                            <button onClick={() => handleShowGrades(course)} className="bg-green-500 shadow-md hover:shadow-xl text-black font-medium px-4 py-2 mt-1 mr-4 rounded-3xl hover:bg-green-600"> Προβολή Βαθμολόγιου </button>
                        </div>
                    )}
                </div>
            ))}
            </div>
            <Footer />
        </div>
    );
};

export default Grades;