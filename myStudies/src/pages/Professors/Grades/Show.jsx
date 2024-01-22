import React from "react";

import { useState } from "react";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";
import { useNavigate } from "react-router";

const Show = () => {
    const navigate = useNavigate();

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
        navigate("/professor/:id");
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <NavBarOptions userType={"professor"} />
            <main className="flex justify-center items-center h-full">
                <div className="bg-gray-300 w-full max-w-screen-2xl px-10 py-8 mt-10 mb-10 m-20 rounded-3xl shadow-lg">
                    <h1 className="text-center text-4xl font-thin mb-10"> Λίστα Μαθημάτων </h1>
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
                            <button onClick={handleFinalization} className="bg-blue-500 text-black font-medium px-4 py-2 mt-2 mr-4 rounded-3xl hover:bg-blue-600"> Τέλος </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Show;
