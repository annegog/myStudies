import React from "react";

import { useNavigate } from "react-router";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";

const ContactAdmin = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login");
    };

    const question = [
        {
            question: "Πως μπορώ να επικοινωνήσω με τον Διαχειριστή;",
            steps: [
                "Στείλτε e-mail στη <strong> Γραμματεία </strong> του Πανεπιστημίου.",
                "Ακολουθήστε τα βήματα που θα σας πουν."
            ]
        },
    ]

    return (
        <div className="Contact Admin">
            <Navbar/>
            <main className="Main Contact Admin">
                <div style={{ marginTop: "1rem" }} className="bg-zinc-300 bg-opacity-50 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                    {question.map((data, index) => (
                        <div key={index} className="w-full">
                            <p className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full py-2"> {data.question} {" "} </p>
                        
                            <div className="text-black text-base italic max-w-full bg-green-200 bg-opacity-30 w-[800px] justify-center items-stretch pl-3 pr-16 py-3 rounded-[35px] self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                                <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                                    {data.steps.map((step, stepIndex) => (
                                        <li key={stepIndex} dangerouslySetInnerHTML={{ __html: step }}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    <button type="button" className="text-center text-white font-medium bg-sky-800 hover:bg-sky-900 focus:ring-4 focus:outline-none rounded-lg text-base mt-36 px-5 py-3" 
                        onClick={handleBack}
                    > Επιστοφή στην Αρχική Σελίδα </button>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default ContactAdmin;