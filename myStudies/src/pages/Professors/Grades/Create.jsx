import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Column = ({ label, dataKey, values, onUpdateGrade }) => (
    <div className={`Students ${label}`} key={label}>
        <div className="text-center text-xl font-medium mr-10 mt-4">
            <p className="underline"> {label} </p>
            {values.map((data, index) => (
                <div key={index} className="w-full">
                    {label === 'Βαθμός' ? (
                        <input
                            type="text"
                            value={data[dataKey] || ''}
                            onChange={(e) => onUpdateGrade(index, e.target.value)}
                            className="text-black text-xl text-center rounded-3xl self-start max-md:max-w-full py-2"
                        />
                    ) : (
                        <p className="text-black text-xl text-center self-start max-md:max-w-full py-2">
                            {data[dataKey]} {" "}
                        </p>
                    )}
                </div>
            ))}
        </div>
    </div>
);

const Create = () => {
    const [grades, setGrades] = useState([
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

    return (
        <div className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 min-h-screen">
            <Navbar />
            <NavBarOptions userType={"professor"} />
            <main className="flex justify-center items-center h-full">
                <div className="w-full max-w-screen-2xl px-10 py-8 mt-10 mb-10 bg-white rounded-3xl shadow-lg">
                    <h1 className="text-center text-4xl font-thin mb-10"> Λίστα Μαθημάτων </h1>
                    <div className="flex flex-row justify-center items-stretch space-x-8">
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
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Create;
