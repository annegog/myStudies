import React from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import NavBarOptions from "./NavBarOptions";

const Message = ({ stringMessage, handleReturn }) => {
    return (
        <div className="flex flex-col items-center justify-center font-bold">
            <h2 className="text-2xl font-semibold leading-none text-green-500 pe-1 mt-20">
                {stringMessage}
            </h2>
            <button onClick={handleReturn} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-10"> 
                Επιστροφή στην Αρχική
            </button>
        </div>
    );
};

const Success = ({ userRole, action }) => {
    const navigate = useNavigate();

    const handleStudent = () => { 
        navigate("/student/:id");
    };

    const handleProfessor = () => { 
        navigate("/professor/:id");
    };

    return (
        <div className="Success">
            <main className="Main Context of Success">
                {userRole === "student" && action === "declaration" ? (
                    <Message stringMessage={"Η δήλωση των μαθημάτων έγινε με επιτυχία."} handleReturn={handleStudent}/>
                ) : userRole === "student" && action === "certification" ? (
                    <Message stringMessage={"Η αίτηση για παροχή πιστοποιητικού έγινε με επιτυχία."} handleReturn={handleStudent}/>
                ) : userRole === "professor" && action === "grades" && (
                    <Message stringMessage={"Η καταχώρηση των βαθμών έγινε με επιτυχία."} handleReturn={handleProfessor}/>
                )}
            </main>
        </div>
    );
};

export default Success;