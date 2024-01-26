import React from "react";
import axios from "axios";

import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams

import { UserContext } from "../../../components/UserContext";

import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = ({ id }) => {
    return (
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <Link to={`/student/${id}`} class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span> Αρχική Σελίδα </span>
                    </Link>
                </li>

                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium  dark:text-gray-400"> Βαθμολόγιο </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Grades = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    
    const gradesData = {
        1: {
            "Course 1.1": 8,
            "Course 1.2": 7,
        },
        2: {
            "Course 2.1": 9,
            "Course 2.2": 4,
        },
        3: {
            "Course 2.1": 9,
            "Course 2.2": 4,
        },
    };

    const [grades, setGrades] = useState([]);
    const [filter, setFilter] = useState("all");                            // "all", "passed", "failed"
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [semesterFilter, setSemesterFilter] = useState("all");            // "all", "even", "odd"
    const [showGradeFilters, setShowGradeFilters] = useState(false);        // State to toggle grade filter visibility
    const [showSemesterFilters, setShowSemesterFilters] = useState(false);  // State to toggle semester filter visibility

    // useEffect(() => {
    //     const fetchGrades = async () => {
    //         try {
    //             if (user) {
    //                 const response = await axios.get(`/declaration-season/${user._id}`);
    //                 setGrades(response.data);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching declaration status:", error);
    //         }
    //     };

    //     fetchGrades ();
    // }, []);

    const getGradeColor = (grade) => grade >= 5 ? "text-green-500" : "text-red-500";

    const handleSearch = () => {
        for (const semester of Object.keys(gradesData)) {
            if (gradesData[semester][searchTerm]) {
                setSearchResult({ semester, course: searchTerm, grade: gradesData[semester][searchTerm] });
                return;
            }
        }
        setSearchResult("not found");
    };

    const filterCourses = (courses) => {
        return Object.entries(courses).filter(([_, grade]) => {
            if (filter === "all") return true;
            if (filter === "failed") return grade < 5;
            if (filter === "passed") return grade >= 5;
        });
    };

    const shouldShowSemester = (semester) => {
        if (semesterFilter === "all") return true;
        const isEven = semester % 2 === 0;
        return (semesterFilter === "even" && isEven) || (semesterFilter === "odd" && !isEven);
    };

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"student"} userId={id} />
            <Path id={id} />
            <div className="flex justify-center">
                <div className="grades-table w-full max-w-4xl">
                    <div className="flex flex-row justify-center">
                        <input
                            type="text"
                            placeholder="Αναζήτηση"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-black text-center bg-gray-50 rounded-3xl p-2 border border-gray-300 shadow-md hover:shadow-xl"
                        />
                        <button className="text-white text-center bg-blue-500 rounded-3xl p-2 ml-2 hover:bg-blue-600 shadow-md hover:shadow-xl"
                            onClick={handleSearch}
                        > Search </button>
                    </div>

                    {/* Search Results */}
                    {searchResult && (
                        <div className="text-center mr-20 ml-1 m-4">
                            {searchResult === "not found" ? (
                                <span> Δεν βρέθηκαν αποτελέσματα </span>
                            ) : (
                                <div>
                                    <span className={`font-medium ${getGradeColor(searchResult.grade)}`}>
                                        {searchResult.course} - ΒΑΘΜΟΣ: {searchResult.grade} (Εξάμηνο: {searchResult.semester})
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Filters Section */}
                    <div className="bg-gray-50 rounded-xl p-3 m-5 shadow-md hover:shadow-xl">
                        <div className="flex flex-col md:flex-row justify-between">

                            {/* Attempts Filter */}
                            <div className="mb-2 md:mb-0 md:mr-2 flex-1">
                                <div className="text-center text-lg font-medium cursor-pointer" onClick={() => setShowGradeFilters(!showGradeFilters)}>
                                    Προσπάθειες
                                    <span>{showGradeFilters ? "▲" : "▼"}</span>
                                </div>
                                {showGradeFilters && (
                                    <div className="flex flex-col justify-center rounded-lg p-2 bg-gray-50">
                                        <button onClick={() => setFilter("all")} className={`my-1 px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-50"}`}> Όλα </button>
                                        <button onClick={() => setFilter("passed")} className={`my-1 px-4 py-2 rounded-lg ${filter === "passed" ? "bg-blue-500 text-white" : "bg-gray-50"}`}> Επιτυχίες </button>
                                        <button onClick={() => setFilter("failed")} className={`my-1 px-4 py-2 rounded-lg ${filter === "failed" ? "bg-blue-500 text-white" : "bg-gray-50"}`}> Αποτυχίες </button>
                                    </div>
                                )}
                            </div>

                            {/* Examination Period Filter */}
                            <div className="mb-2 md:mb-0 md:mr-2 flex-1">
                                <div className="text-center text-lg font-medium cursor-pointer" onClick={() => setShowSemesterFilters(!showSemesterFilters)}>
                                    Εξεταστική Περίοδος
                                    <span>{showSemesterFilters ? "▲" : "▼"}</span>
                                </div>
                                {showSemesterFilters && (
                                    <div className="flex flex-col justify-center rounded-lg p-2 bg-gray-50">
                                        <button onClick={() => setSemesterFilter("all")} className={`my-1 px-4 py-2 rounded-lg ${semesterFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-50"}`}> Όλες </button>
                                        <button onClick={() => setSemesterFilter("even")} className={`my-1 px-4 py-2 rounded-lg ${semesterFilter === "even" ? "bg-blue-500 text-white" : "bg-gray-50"}`}> Εαρινού </button>
                                        <button onClick={() => setSemesterFilter("odd")} className={`my-1 px-4 py-2 rounded-lg ${semesterFilter === "odd" ? "bg-blue-500 text-white" : "bg-gray-50"}`}> Χειμερινού </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Grades Table */}
                    {Object.entries(gradesData)
                        .filter(([semester, _]) => shouldShowSemester(parseInt(semester)))
                        .map(([semester, courses]) => (
                            <div key={semester} className={`mb-8 ${shouldShowSemester(parseInt(semester)) ? "" : "hidden"}`}>
                                <h2 className="text-center text-lg font-medium"> {semester}o Εξάμηνο </h2>
                                <table className="rounded-lg bg-gray-200 w-full text-sm text-left">
                                    <thead className="text-xs">
                                        <tr>
                                            <th scope="col" className="py-3 px-6"> ΜΑΘΗΜΑΤΑ </th>
                                            <th scope="col" className="py-3 px-6"> ΒΑΘΜΟΣ </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterCourses(courses).map(([course, grade]) => (
                                            <tr key={course} className="bg-gray-50 border-b">
                                                <td scope="row" className={`py-4 px-6 font-medium whitespace-nowrap ${getGradeColor(grade)}`}>
                                                    {course}
                                                </td>
                                                <td className={`py-4 px-6 ${getGradeColor(grade)}`}>
                                                    {grade}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Grades