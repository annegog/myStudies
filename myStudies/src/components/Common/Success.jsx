import React from "react";

import { useNavigate } from "react-router-dom";

const Message = ({ stringMessage, handleReturn }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-serif text-green-500 m-20">
                {stringMessage}
            </h2>
            
            <button onClick={handleReturn} className="text-white px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 shadow-md hover:shadow-xl"> 
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
        <div>
            {userRole === "student" && action === "declaration" ? (
                <Message stringMessage={"Η δήλωση των μαθημάτων έγινε με επιτυχία."} handleReturn={handleStudent} />
            ) : userRole === "student" && action === "certification" ? (
                <Message stringMessage={"Η αίτηση για παροχή πιστοποιητικού έγινε με επιτυχία."} handleReturn={handleStudent} />
            ) : userRole === "professor" && action === "final" ? (
                <Message stringMessage={"Η οριστική υποβολή των βαθμών έγινε με επιτυχία."} handleReturn={handleProfessor} />
            ) : userRole === "professor" && action === "temporary" && (
                <Message stringMessage={"Η προσωρινή αποθήκευση των βαθμών έγινε με επιτυχία."} handleReturn={handleProfessor} />
            )}
        </div>
    );
};

export default Success;