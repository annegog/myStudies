import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
// Ensure you have imported NavBarOptions if you are using it
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Declarations = () => {
    const [declarations, setDeclarations] = useState([]);
    const [expandedDeclarations, setExpandedDeclarations] = useState({});
    const { id } = useParams();

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
                // Error handling...
            }
        };
        fetchDeclarations();
    }, [id]);

    const getSemesterLabel = (date) => {
        const declarationDate = new Date(date);
        const year = declarationDate.getFullYear();
        // Define the start and end dates for the Θερινό semester
        const summerStart = new Date(year, 1, 1); // Febuary 1th
        const summerEnd = new Date(year, 8, 15); // August 15th

        let semesterLabel = 'Θερινού'; // Default to Spring
        if (declarationDate >= summerStart && declarationDate <= summerEnd) {
            semesterLabel = 'Εαρινού'; // Change to Summer if within the range
        }
        if (declarationDate >= summerEnd) {
            return `Δηλώσεις ${semesterLabel} Περιόδου ${year} - ${year + 1}`;
        } else {
            return `Δηλώσεις ${semesterLabel} Περιόδου ${year - 1} - ${year}`;
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
                            <span class="text-sm text-gray-500 font-medium  dark:text-gray-400"> Ιστορικό Δηλώσεων </span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {declarations.map((declaration) => (
                    <div key={declaration._id} style={{ width: '60%', textAlign: 'center', marginBottom: '10px' }}>
                        <div onClick={() => toggleDeclaration(declaration._id)} style={{ cursor: 'pointer' }}>
                            <span>Δηλώσεις {getSemesterLabel(declaration.data)} Εξαμήνου</span>
                            <span>{expandedDeclarations[declaration._id] ? '▲' : '▼'}</span>
                        </div>
                        {expandedDeclarations[declaration._id] && (
                            <div>
                                {declaration.courses && declaration.courses.map(course => (
                                    <p key={course._id} style={{ color: 'green' }}>{course.title}</p> // Text color changed to green
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
