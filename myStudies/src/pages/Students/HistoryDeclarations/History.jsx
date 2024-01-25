import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = ({ id }) => {
    return (
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <a href={`/student/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white">
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
                        <span class="text-sm text-gray-500 font-medium"> Ιστορικό Δηλώσεων </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Declarations = () => {
    const { id } = useParams();
    const [declarations, setDeclarations] = useState([]);
    const [expandedDeclarations, setExpandedDeclarations] = useState({});

    useEffect(() => {
        const fetchDeclarations = async () => {
            try {
                const response = await axios.get(`/api/declarations/${id}`);
                setDeclarations(response.data);

                const expandedState = response.data.reduce((acc, declaration) => {
                    acc[declaration._id] = false;
                    return acc;
                }, {});
                setExpandedDeclarations(expandedState);
            } catch (error) {
                console.error("Error fetching declaration history status:", error);
            }
        };
        fetchDeclarations();
    }, [id]);

    const getSemesterLabel = (date) => {
        const declarationDate = new Date(date);
        const year = declarationDate.getFullYear();

        const summerStart = new Date(year, 1, 1);
        const summerEnd = new Date(year, 8, 15);

        let semesterLabel = "Θερινού";
        if (declarationDate >= summerStart && declarationDate <= summerEnd) {
            semesterLabel = "Εαρινού";
        }
        if (declarationDate >= summerEnd) {
            return `Δηλώσεις ${semesterLabel} Εξημήνου ${year} - ${year + 1}`;
        } else {
            return `Δηλώσεις ${semesterLabel} Εξημήνου ${year - 1} - ${year}`;
        }
    };

    const toggleDeclaration = (declarationId) => {
        setExpandedDeclarations(prevState => ({
            ...prevState,
            [declarationId]: !prevState[declarationId]
        }));
    };

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"student"} userId={id} />
            <Path id={id} />
            <div className="flex justify-center">
                {declarations.map((declaration) => (
                    <div className="flex flex-col items-center justify-center">
                        <div onClick={() => toggleDeclaration(declaration._id)} className="text-lg bg-gray-50 rounded-xl py-3 px-5 mb-5 shadow-xl hover:shadow-2xl cursor-pointer">
                            <span> {getSemesterLabel(declaration.data)} {expandedDeclarations[declaration._id] ? '▲' : '▼'} </span>
                        </div>
                        {expandedDeclarations[declaration._id] && (
                            <div>
                                {declaration.courses && declaration.courses.map(course => (
                                    <p key={course._id} className="flex justify-center text-green-600 cursor-pointer"> {course.title} </p> 
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Declarations;