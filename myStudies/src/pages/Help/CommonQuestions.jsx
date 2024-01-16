import React, { useState } from "react";
import { useNavigate } from "react-router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CommonQuestions = () => {
    const navigate = useNavigate();
    const [openQuestions, setOpenQuestions] = useState({});

    const handleBack = () => {
        navigate("/login");
    };

    const toggleQuestion = (index) => {
        setOpenQuestions(prevOpenQuestions => ({
            ...prevOpenQuestions,
            [index]: !prevOpenQuestions[index]
        }));
    };

    return (
        <div className="Common Questions">
            <Navbar />
            <main className="Main Common Questions">
                <div style={{ marginTop: "1rem" }} className="bg-zinc-300 bg-opacity-50 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">

                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="w-full">
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="text-left w-full py-3 text-black text-xl font-semibold"
                            >
                                {`Question ${index + 1}`} <span>{openQuestions[index] ? "▲" : "▼"}</span>
                            </button>
                            {openQuestions[index] && (
                                <div className="text-black text-base px-5 py-3 bg-gray-100 rounded-md">
                                    {/* Replace the content below with actual content for each question */}
                                    <p>Answer to question {index + 1}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    <button type="button" className="text-center text-white font-medium bg-sky-800 hover:bg-sky-900 focus:ring-4 focus:outline-none rounded-lg text-base mt-36 px-5 py-3"
                        onClick={() => handleBack()}
                    > Επιστοφή στην Αρχική Σελίδα </button>
                </div>
            </main >
            <Footer />
        </div >
    );
};

export default CommonQuestions;
