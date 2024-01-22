import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import Success from "../../../components/Common/Success";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Column = ({ label, dataKey, values, onUpdateGrade }) => (
    <div className={`Students ${label}`} key={label}>
        <div className="text-center text-xl font-medium my-4">
            <p className="underline"> {label} </p>
            {values.map((data, index) => (
                <div key={index} className="w-full flex flex-col items-center my-3.5">
                    {label === 'Βαθμός' ? (
                        <input
                            value={data[dataKey] || ''}
                            onChange={(e) => onUpdateGrade(index, e.target.value)}
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
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(0)

    const [grades, setGrades] = useState([
        { studentId: 'sdi202000122', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 7, grade: '' },
        { studentId: 'sdi201800033', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 11, grade: '' },
        { studentId: 'sdi201600003', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: '' },
        { studentId: 'sdi202100199', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: '' },
        { studentId: 'sdi202000122', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 7, grade: '' },
        { studentId: 'sdi201800033', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 11, grade: '' },
        { studentId: 'sdi201600003', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: '' },
        { studentId: 'sdi202100199', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: '' },
        { studentId: 'sdi202000122', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 7, grade: '' },
        { studentId: 'sdi201800033', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 11, grade: '' },
        { studentId: 'sdi201600003', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: '' },
        { studentId: 'sdi202100199', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: '' },
        { studentId: 'sdi202000122', name: 'ΓΕΩΡΓΙΟΣ ΨΑΘΑΣ', semester: 7, grade: '' },
        { studentId: 'sdi201800033', name: 'ΔΗΜΗΤΡΑ ΓΕΡΗ', semester: 11, grade: '' },
        { studentId: 'sdi201600003', name: 'ΑΘΑΝΑΣΙΟΣ ΚΟΝΤΟΣ', semester: 15, grade: '' },
        { studentId: 'sdi202100199', name: 'ΚΑΤΕΡΙΝΑ ΦΡΑΓΚΟΥ', semester: 5, grade: '' },
    ]);

    const columns = [
        { label: 'A.M.', dataKey: 'studentId' },
        { label: 'Ονοματεπώνυμο', dataKey: 'name' },
        { label: 'Εξάμηνο Φοίτησης', dataKey: 'semester' },
        { label: 'Βαθμός', dataKey: 'grade' },
    ];

    const onUpdateGrade = (index, value) => {
        const newGrades = [...grades];
        newGrades[index].grade = value;
        setGrades(newGrades);
    };

    const handleFinalization = () => {
        setSuccessMessage(successMessage + 1);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <NavBarOptions userType={"professor"} />
            <main className="flex justify-center items-center h-full">
                {successMessage > 0 ? (
                    <Success userRole={"professor"} action={"grades"}/>
                ) : (
                    <div className="bg-gray-300 w-full max-w-screen-2xl px-10 py-8 mt-10 mb-10 m-20 rounded-3xl shadow-lg">
                        <h1 className="text-center text-4xl font-thin mb-10"> Λίστα Μαθημάτων </h1>
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
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Create;
