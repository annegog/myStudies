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

    const handleCreationGrades = () => {
        navigate(`/professor/grades-create/${id}`);
    };

    const handleShowGrades = () => {
        navigate(`/professor/grades-show/${id}`);
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
        <div className="bg-gray-50">
            <Navbar />
            <NavBarOptions userType={"professor"} userId={id} />
            <main className="Professor Main">
                <div className="mt-10 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 bg-gray-50">
                    <h2 className="text-center text-3xl font-thin justify-center mt-10 mb-10"> Τα μαθήματα μου </h2>
                    {courses.map(course => (
                        <div className="bg-slate-200 p-2 rounded-2xl mt-8 space-y-4 bg-white shadow-2xl">
                            <div className="flex flex-row text-left w-full text-lg pl-10 py-3 cursor-pointer focus:outline-none" onClick={() => toggleCourse(courses)}>
                                <span> {activeCourses[course.id] ? "▲" : "▼"} </span>
                                <h className="ml-3"> {course.title} </h>
                            </div>
                            {activeCourses[courses] && (
                                <div className="pl-10">
                                    <button onClick={handleCreationGrades} className="bg-blue-500 text-black font-medium p-2 m-4 rounded-3xl hover:bg-blue-600 shadow-xl"> Δημιουργία Βαθμολογίου </button>
                                    <button onClick={handleShowGrades} className="bg-green-500 text-black font-medium p-2 m-4 rounded-3xl hover:bg-green-600 shadow-xl"> Προβολή Βαθμολογίου </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Grades;