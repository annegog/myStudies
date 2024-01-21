import React from "react";

import { useState, useEffect } from "react";

import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Grades = () => {
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

    {/* Data */}
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const [filter, setFilter] = useState("all");                            // "all", "passed", "failed"
    const [semesterFilter, setSemesterFilter] = useState("all");            // "all", "even", "odd"
    const [showGradeFilters, setShowGradeFilters] = useState(false);        // State to toggle grade filter visibility
    const [showSemesterFilters, setShowSemesterFilters] = useState(false);  // State to toggle semester filter visibility

    {/* Functions */}
    
    // Function to get the appropriate color based on the grade
    const getGradeColor = (grade) => grade >= 5 ? "text-green-500" : "text-red-500";    

    // Function to handle the search
    const handleSearch = () => {
        for (const semester of Object.keys(gradesData)) {
            if (gradesData[semester][searchTerm]) {
                setSearchResult({ semester, course: searchTerm, grade: gradesData[semester][searchTerm] });
                return;
            }
        }
        setSearchResult("not found");
    };

    // Function to filter courses based on the current filter
    const filterCourses = (courses) => {
        return Object.entries(courses).filter(([_, grade]) => {
            if (filter === "all") return true;
            if (filter === "failed") return grade < 5;
            if (filter === "passed") return grade >= 5;
        });
    };

    // Function to determine if a semester should be shown based on the current semester filter
    const shouldShowSemester = (semester) => {
        if (semesterFilter === "all") return true;
        const isEven = semester % 2 === 0;
        return (semesterFilter === "even" && isEven) || (semesterFilter === "odd" && !isEven);
    };

    {/* Main */}

    return (
        <div className="Declarations">
            <Navbar/>
            <NavBarOptions userType={"student"}/>
            <main className="main-content flex justify-center">
                <div className="grades-table w-full max-w-4xl">
                    
                    {/* Search Bar */}
                    <div style={{ marginTop: "1rem" }} className="flex flex-row justify-center mt-4">
                        <input
                            type="text"
                            className="text-black text-center rounded-3xl p-2 border border-gray-300"
                            placeholder="Αναζήτηση Μαθήματος"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="text-white text-center bg-blue-500 rounded-3xl p-2 ml-2 hover:bg-blue-600" 
                            onClick={handleSearch}
                        > Search </button>
                    </div>

                    {/* Search Results */}
                    {searchResult && (
                        <div className="text-center my-4">
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
                    <div style={{ marginTop: "1rem" }} className="bg-gray-100 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between">

                            {/* Attempts Filter */}
                            <div className="mb-2 md:mb-0 md:mr-2 flex-1">
                                <div className="text-center text-lg font-medium cursor-pointer" onClick={() => setShowGradeFilters(!showGradeFilters)}> 
                                    Προσπάθειες
                                    <span>{showGradeFilters ? "▲" : "▼"}</span>
                                </div>
                                {showGradeFilters && (
                                    <div className="flex flex-col justify-center rounded-lg p-2 bg-gray-100">
                                        <button onClick={() => setFilter("all")} className={`my-1 px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}> Όλα </button>
                                        <button onClick={() => setFilter("passed")} className={`my-1 px-4 py-2 rounded-lg ${filter === "passed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}> Επιτυχίες </button>
                                        <button onClick={() => setFilter("failed")} className={`my-1 px-4 py-2 rounded-lg ${filter === "failed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}> Αποτυχίες </button>
                                    </div>
                                )}
                            </div>

                            {/* Examination Period Filter */}
                            <div className="flex-1">
                                <div className="text-center font-medium cursor-pointer" onClick={() => setShowSemesterFilters(!showSemesterFilters)}>
                                    Εξεταστική Περίοδος
                                    <span>{showSemesterFilters ? "▲" : "▼"}</span>
                                </div>
                                {showSemesterFilters && (
                                    <div className="flex flex-col justify-center rounded-lg p-2 bg-gray-100">
                                        <button onClick={() => setSemesterFilter("all")} className={`my-1 px-4 py-2 rounded-lg ${semesterFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}> Όλες </button>
                                        <button onClick={() => setSemesterFilter("even")} className={`my-1 px-4 py-2 rounded-lg ${semesterFilter === "even" ? "bg-blue-500 text-white" : "bg-gray-200"}`}> Εαρινού </button>
                                        <button onClick={() => setSemesterFilter("odd")} className={`my-1 px-4 py-2 rounded-lg ${semesterFilter === "odd" ? "bg-blue-500 text-white" : "bg-gray-200"}`}> Χειμερινού </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Grades Table */}
                    {Object.entries(gradesData)
                        .filter(([semester, _]) => shouldShowSemester(parseInt(semester)))
                        .map(([semester, courses]) => (
                            <div style={{ marginTop: "2rem" }} key={semester} className={`mb-8 ${shouldShowSemester(parseInt(semester)) ? "" : "hidden"}`}>
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
                                            <tr key={course} className="bg-white border-b">
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
            </main>
            <Footer />
        </div>
    );
};

export default Grades