import React from "react";

import { useState } from "react";

import { useParams } from "react-router-dom";
import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";
import { useNavigate } from "react-router";

const Path = ({ id }) => {
    return (
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <a href={`/professor/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white">
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
                        <a href={`/professor/grades/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white"> Βαθμολόγιο </a>
                    </div>
                </li>

                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium  dark:text-gray-400"> Προβολή Βαθμολογίου </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Show = () => {
    const navigate = useNavigate();
    
    const { id } = useParams();

    const [grades] = useState([
        { studentId: 'sdi201900122', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 7, grade: 6 },
        { studentId: 'sdi201800033', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 11, grade: 5 },
        { studentId: 'sdi201400043', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: 10 },
        { studentId: 'sdi202000109', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: 8 },
        { studentId: 'sdi201800072', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 7, grade: 5 },
        { studentId: 'sdi201900083', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 11, grade: 8 },
        { studentId: 'sdi201400065', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: 8 },
        { studentId: 'sdi202200053', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: 10 },
        { studentId: 'sdi202000104', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 7, grade: 9 },
        { studentId: 'sdi201900083', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 11, grade: 6 },
        { studentId: 'sdi201600063', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: 5 },
        { studentId: 'sdi202100143', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: 5 },
        { studentId: 'sdi201800045', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 7, grade: 7 },
        { studentId: 'sdi201800046', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 11, grade: 9 },
        { studentId: 'sdi201900067', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: 10 },
        { studentId: 'sdi202100109', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: 7 },
    ]);

    const columns = [
        { label: 'A.M.', dataKey: 'studentId' },
        { label: 'Ονοματεπώνυμο', dataKey: 'name' },
        { label: 'Εξάμηνο Φοίτησης', dataKey: 'semester' },
        { label: 'Βαθμός', dataKey: 'grade' },
    ];

    const handleFinalization = () => {
        navigate(`/professor/${id}`);
    };

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"professor"} userId={id} />
            <Path id={id} />
            <div className="flex justify-center items-center h-full">
                <div className="bg-gray-50 w-full max-w-screen-2xl px-10 py-8 rounded-3xl shadow-md hover:shadow-2xl">
                    <h1 className="text-center text-4xl font-thin m-10 underline"> Λίστα Μαθητών </h1>
                    <div className="flex flex-row justify-center items-stretch space-x-10">
                        {columns.map((column) => (
                            <div key={column.label} className="text-center text-xl font-medium mr-10 mt-4">
                                <p className="underline mb-3">{column.label}</p>
                                {grades.map((grade, index) => (
                                    <div key={`${column.dataKey}-${index}`} className="w-full mt-2">
                                        <p className="text-black text-xl text-center self-start max-md:max-w-full py-2">
                                            {grade[column.dataKey]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <div className="Options">
                            <button onClick={handleFinalization} className="bg-blue-500 text-black font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-blue-600 shadow-xl"> Τέλος </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Show;
