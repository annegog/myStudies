import React from "react";

import { useNavigate } from "react-router-dom";

const Message = ({ stringMessage, handleReturn }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold leading-none text-green-500 pe-1 mt-20">
                {stringMessage}
            </h2>
            <button onClick={handleReturn} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-xl m-10"> 
                Επιστροφή στην Αρχική
            </button>
        </div>
    );
};

const Success = ({ userRole, action, userId }) => {
    const navigate = useNavigate();

    const handleStudent = () => {
        navigate(`/student/${userId}`);
    };

    const handleProfessor = () => {
        navigate(`/professor/${userId}`);
    };

    return (
        <div className="Success">
            <main className="Main Context of Success">
                {userRole === "student" && action === "declaration" ? (
                    <Message stringMessage={"Η δήλωση των μαθημάτων έγινε με επιτυχία."} handleReturn={handleStudent} />
                ) : userRole === "student" && action === "certification" ? (
                    <Message stringMessage={"Η αίτηση για παροχή πιστοποιητικού έγινε με επιτυχία."} handleReturn={handleStudent} />
                ) : userRole === "professor" && action === "grades" && (
                    <Message stringMessage={"Η καταχώρηση των βαθμών έγινε με επιτυχία."} handleReturn={handleProfessor} />
                )}
            </main>
        </div>
    );
};

export default Success;