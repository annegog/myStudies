import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = ({ id }) => {
    return(
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <a href={`/professor/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-green-700 font-medium ">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span> Αρχική Σελίδα </span>
                    </a>
                </li>

                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium dark:text-gray-400"> Βαθμολόγιο </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

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
            <Path id={id} />
            <div className="justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32">
                <h2 className="text-3xl font-thin justify-center text-center mb-1"> Τα μαθήματα μου </h2>
                {courses.map(course => (
                    <div className="bg-gray-50 shadow-md hover:shadow-2xl p-5 rounded-2xl mt-10" key={course.id}>
                        <div className="flex flex-row text-left w-full text-lg cursor-pointer focus:outline-none" >
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <p className="pl-3"> {course.title} </p>
                        </div>
                        
                            <div className="pl-4 mt-3">
                                <button onClick={() => handleCreationGrades(course)} className="bg-green-500 hover:bg-green-600 shadow-md hover:shadow-xl text-white font-medium px-4 py-2 mt-1 mr-4 rounded-3xl info-container"> Δημιουργία Βαθμολογίου </button>
                                <button onClick={() => handleShowGrades(course)} className="bg-teal-600 shadow-md hover:shadow-xl text-white font-medium px-4 py-2 mt-1 mr-4 rounded-3xl hover:bg-teal-800 info-container"> Προβολή Βαθμολόγιου </button>
                            </div>
                        
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Grades;