import React, { useState, useEffect } from 'react';
import Navbar_students from "../components/Navbar";
import Footer from "../components/Footer";
import NavBarOptions from "../components/NavBarOptions";

const Grades = () => {
    const gradesData = {
        1: { // Semester 1
            "Course 1.1": 8,
            "Course 1.2": 7,
            // ... more courses
        },
        2: { // Semester 2
            "Course 2.1": 9,
            "Course 2.2": 4,
            // ... more courses
        },
        // ... more semesters
    };

    const [filter, setFilter] = useState('all'); // 'all', 'passed', or 'failed'
    const [semesterFilter, setSemesterFilter] = useState('all'); // 'all', 'even', or 'odd'
    const [showGradeFilters, setShowGradeFilters] = useState(false); // State to toggle grade filter visibility
    const [showSemesterFilters, setShowSemesterFilters] = useState(false); // State to toggle semester filter visibility
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    // Function to get the appropriate color based on the grade
    const getGradeColor = (grade) => grade >= 5 ? 'text-green-500' : 'text-red-500';

    // Function to handle the search
    const handleSearch = () => {
        for (const semester of Object.keys(gradesData)) {
            if (gradesData[semester][searchTerm]) {
                setSearchResult({ semester, course: searchTerm, grade: gradesData[semester][searchTerm] });
                return;
            }
        }
        setSearchResult('not found');
    };


    // Function to filter courses based on the current filter
    const filterCourses = (courses) => {
        return Object.entries(courses).filter(([_, grade]) => {
            if (filter === 'all') return true;
            if (filter === 'passed') return grade >= 5;
            if (filter === 'failed') return grade < 5;
        });
    };

    // Function to determine if a semester should be shown based on the current semester filter
    const shouldShowSemester = (semester) => {
        if (semesterFilter === 'all') return true;
        const isEven = semester % 2 === 0;
        return (semesterFilter === 'even' && isEven) || (semesterFilter === 'odd' && !isEven);
    };

    return (
        <div className="declaration-page">
            <Navbar_students />
            <NavBarOptions userType={"student"} />
            <main className="main-content flex justify-center">
                <div className="grades-table w-full max-w-4xl">
                    {/* Search Bar */}
                    <div className="flex justify-center mt-4">
                        <input
                            type="text"
                            className="p-2 border border-gray-300"
                            placeholder="Search for a subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white p-2 ml-2"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>

                    {/* Search Results */}
                    {searchResult && (
                        <div className="text-center my-4">
                            {searchResult === 'not found' ? (
                                <span>No subject found.</span>
                            ) : (
                                <div>
                                    <span>Found: </span>
                                    <span className={`font-medium ${getGradeColor(searchResult.grade)}`}>
                                        {searchResult.course} - Grade: {searchResult.grade} (Semester: {searchResult.semester})
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                    {/* Filters Section */}
                    <div className="bg-gray-100 p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                            {/* Attempts Filter */}
                            <div className="mb-2 md:mb-0 md:mr-2 flex-1">
                                <div className="text-center font-bold cursor-pointer" onClick={() => setShowGradeFilters(!showGradeFilters)}>
                                    Προσπάθειες
                                    <span>{showGradeFilters ? '▲' : '▼'}</span>
                                </div>
                                {showGradeFilters && (
                                    <div className="flex flex-col justify-center p-2 bg-white">
                                        <button onClick={() => setFilter('all')} className={`my-1 px-4 py-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
                                        <button onClick={() => setFilter('passed')} className={`my-1 px-4 py-2 ${filter === 'passed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Passed</button>
                                        <button onClick={() => setFilter('failed')} className={`my-1 px-4 py-2 ${filter === 'failed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Failed</button>
                                    </div>
                                )}
                            </div>

                            {/* Examination Period Filter */}
                            <div className="flex-1">
                                <div className="text-center font-bold cursor-pointer" onClick={() => setShowSemesterFilters(!showSemesterFilters)}>
                                    Εξεταστική Περίοδος
                                    <span>{showSemesterFilters ? '▲' : '▼'}</span>
                                </div>
                                {showSemesterFilters && (
                                    <div className="flex flex-col justify-center p-2 bg-white">
                                        <button onClick={() => setSemesterFilter('all')} className={`my-1 px-4 py-2 ${semesterFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All Semesters</button>
                                        <button onClick={() => setSemesterFilter('even')} className={`my-1 px-4 py-2 ${semesterFilter === 'even' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Even Semesters</button>
                                        <button onClick={() => setSemesterFilter('odd')} className={`my-1 px-4 py-2 ${semesterFilter === 'odd' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Odd Semesters</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Grades Table */}
                    {Object.entries(gradesData)
                        .filter(([semester, _]) => shouldShowSemester(parseInt(semester)))
                        .map(([semester, courses]) => (
                            <div key={semester} className={`mb-8 ${shouldShowSemester(parseInt(semester)) ? '' : 'hidden'}`}>
                                <h2 className="text-center text-lg font-bold">Εξάμηνο {semester}</h2>
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">Course</th>
                                            <th scope="col" className="py-3 px-6">Grade</th>
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
                        ))}
                </div>
            </main>
            <Footer />
        </div>
    );

};

export default Grades