import React from "react";
import axios from 'axios';

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import Success from "../../../components/Common/Success";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = ({ id }) => {
    return(
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <a href={`/professor/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-green-700 font-medium dark:text-gray-400 dark:hover:text-white">
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
                        <a href={`/professor/grades/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-green-700 font-medium dark:text-gray-400 dark:hover:text-white"> Βαθμολόγιο </a>
                    </div>
                </li>

                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium  dark:text-gray-400"> Δημιουργία Βαθμολογίου </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Column = ({ label, dataKey, values, onUpdateGrade }) => (
    <div className={`Students ${label}`} key={label}>
        <div className="text-center text-lg font-medium my-4">
        <p className="underline"> {label} </p>
        {values.map((data, index) => (
            <div key={index} className="w-full flex flex-col items-center my-3.5">
                {label === 'Βαθμός' ? (
                    <input
                        value={data.grade ? data.grade.grade : ''}
                        onChange={(e) => onUpdateGrade(data, e.target.value)}
                        className="text-black text-xl text-center shadow-md hover:shadow-xl border border-black rounded-3xl w-24 info-container"
                    />
                ) : (
                    <p className="text-black text-xl text-center max-md:max-w-full "> {data[dataKey]} </p>
                )}
            </div>
        ))}
        </div>
    </div>
);

const Create = () => {
    const { id, course } = useParams();
    const [grades, setGrades] = useState([]);
    const [options, setOptions] = useState("");
    const [students, setStudents] = useState(null);
    const [successMessage, setSuccessMessage] = useState(0);
    const [final, setFinal] = useState(false);
    
    const navigate = useNavigate();

    const columns = [
        { label: 'A.M.', dataKey: 'studentId' },
        { label: 'Ονοματεπώνυμο', dataKey: 'name' },
        { label: 'Εξάμηνο Φοίτησης', dataKey: 'semester' },
        { label: 'Βαθμός', dataKey: 'grade' },
    ];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`/students/declared/course/${course}`);
                const studentsData = response.data;

                const initialGrades = studentsData.map(({ student, grade }) => ({
                    studentId: student.username,
                    name: `${student.first_name} ${student.last_name}`,
                    semester: student.semester,
                    grade: grade ? grade : null,
                })); 
                setGrades(initialGrades);
                
                if (studentsData.length > 0 && studentsData[0].status === "final") {
                    setFinal(true);
                }

            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [course]);

    const onUpdateGrade = (student, value) => {
        const newGrades = [...grades];
        const studentIndex = newGrades.findIndex(item => item.studentId === student.studentId);

        if (studentIndex !== -1) {
            newGrades[studentIndex].grade = value;
            setGrades(newGrades);
        }
    };

    const handleFinalization = async () => {
        try {
            const response = await axios.post(`/save-grades/${course}/final`, {                
                grades: grades.map(({ studentId, grade }) => ({ studentId, grade }))
            });
            setSuccessMessage(successMessage + 1);
        } catch (error) {
            console.error('Error saving grades:', error);    
        }
    }

    const handleTempSave = async () => {
        try {
            const response = await axios.post(`/save-grades/${course}/${options}`, {                
                grades: grades.map(({ studentId, grade }) => ({ studentId, grade }))
            });
            setSuccessMessage(successMessage + 1);
        } catch (error) {
            console.error('Error saving grades:', error);    
        }
    }
    const handleBack = () => {
        navigate(`/professor/grades/${id}`);
    };
    return (
        <div>
        <Navbar />
        <NavBarOptions userType={"professor"} userId={id} />
        <Path id={id} />
        <div className="flex justify-center items-center h-full">
            {successMessage > 0 ? (
                <Success userRole={"professor"} action={options === "final" ? "final" : "temporary"} userId={id} />
            ) : (
                <div className="justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32">
                    <h2 className="text-3xl font-thin justify-center text-center mb-1"> Λίστα Μαθητών </h2>
                    <div className="bg-gray-50 shadow-md hover:shadow-xl rounded-3xl px-10 py-8 mt-10">
                        <div className="flex flex-row justify-center items-stretch space-x-10">
                            {columns.map((column, index) => (
                                <Column
                                    key={index}
                                    label={column.label}
                                    dataKey={column.dataKey}
                                    values={grades}
                                    onUpdateGrade={onUpdateGrade}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <div className="Options">
                                {!final ? (
                                    <>
                                        <button onClick={() => { handleTempSave(); setOptions("temporary") }} className="bg-green-500 hover:bg-green-600 shadow-md hover:shadow-xl text-white font-medium px-4 py-2 mt-2 mr-4 rounded-3xl info-container"> Προσωρινή Αποθήκευση </button>
                                        <button onClick={() => { handleFinalization(); setOptions("final") }} className="bg-teal-600 shadow-md hover:shadow-xl text-white font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-teal-800 info-container"> Οριστικοποίηση </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="justify-center text-center text-blue-900 text-lg">Έχει πραγματοποιηθεί Οριστική Υποβολή των Βαθμολογιών.<br/> Δεν μπορεί να γίνει τροποποιήση τους</span>
                                        <button onClick={handleBack} className="bg-teal-600 text-white font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-teal-800 shadow-md hover:shadow-xl"> Επιστροφή </button>
                                    </div>
                                    
                                )}
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <Footer />
        </div>
    );
};

export default Create;