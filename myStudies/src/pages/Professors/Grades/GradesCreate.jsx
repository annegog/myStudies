import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import Success from "../../../components/Common/Success";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Column = ({ label, dataKey, values, onUpdateGrade }) => (
    <div className={`Students ${label}`} key={label}>
      <div className="text-center text-lg font-medium my-4">
        <p className="underline"> {label} </p>
        {values.map((data, index) => (
          <div key={index} className="w-full flex flex-col items-center my-3.5">
            {label === 'Βαθμός' ? (
              <input
                value={data[dataKey] || ''}
                onChange={(e) => onUpdateGrade(data, e.target.value)}
                className="text-black text-xl text-center rounded-3xl max-md:max-w-full"
              />
            ) : (
              <p className="text-black text-xl text-center max-md:max-w-full ">
                {data[dataKey]} {" "}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
);
  
const Create = () => {
    const { id, course } = useParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(0);
    const [students, setStudents] = useState(null);
    const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`/students/declared/course/${course}`);
        const studentsData = response.data;
        setStudents(studentsData);

        // Initialize grades based on students
        const initialGrades = studentsData.map(student => ({
          studentId: student.username,
          name: `${student.first_name} ${student.last_name}`,
          semester: student.semester,
          grade: '',
        }));

        setGrades(initialGrades);

      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [course]);

    const columns = [
        { label: 'A.M.', dataKey: 'studentId' },
        { label: 'Ονοματεπώνυμο', dataKey: 'name' },
        { label: 'Εξάμηνο Φοίτησης', dataKey: 'semester' },
        { label: 'Βαθμός', dataKey: 'grade' },
    ];

    const onUpdateGrade = (student, value) => {
        const newGrades = [...grades];
        const studentIndex = newGrades.findIndex(item => item.studentId === student.studentId);
      
        if (studentIndex !== -1) {
          newGrades[studentIndex].grade = value;
          setGrades(newGrades);
        }
    };

    const handleFinalization = () => {
        setSuccessMessage(successMessage + 1);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <NavBarOptions userType={"professor"} userId={id} />
                <nav class="flex mt-2 justify-center" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center mb-3 sm:mb-0">
                    <li class="inline-flex items-center">
                    <a href={`/professor/${id}`} class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Αρχική Σελίδα
                    </a>
                    </li>
                    <li>
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <a href={`/professor/grades/${id}`} class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Βαθμολόγιο</a>
                    </div>
                    </li>
                    <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Δημιουργία Βαθμολογίου</span>
                    </div>
                    </li>
                </ol>
            </nav>
            <main className="flex justify-center items-center h-full">
                {successMessage > 0 ? (
                    <Success userRole={"professor"} action={"grades"} userId={id} />
                ) : (
                    <div className="w-full max-w-screen-2xl " >
                        <h1 className="text-center text-3xl font-thin mt-8 mb-4"> Λίστα Μαθητών</h1>
                        <div className="bg-gray-300 rounded-3xl shadow-lg px-10 py-8 mt-4 mb-10 m-20">
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
                                    <button className="bg-blue-500 text-black font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-blue-600"> Προσωρινή Αποθήκευση </button>
                                    <button onClick={handleFinalization} className="bg-green-500 text-black font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-green-600"> Οριστικοποίηση </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Create;