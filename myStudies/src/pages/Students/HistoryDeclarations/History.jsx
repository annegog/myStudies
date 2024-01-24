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
