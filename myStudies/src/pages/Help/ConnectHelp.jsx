import React from "react";

import { useNavigate } from "react-router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ConnectHelp = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login");
    };

    const question = [
        {
            question: "Πως μπορώ να συνδεθώ στην πλατφόρμα του My Studies;",
            steps: [
                "Στο πεδίο του <strong> Όνομα Χρήστη </strong> συμπληρώστε τον A.M. που έχετε λάβει από τη σχολή.",
                "Στο πεδίο του <strong> Κωδικός Πρόσβασής </strong> συμπληρώστε τον κωδικό που έχετε λάβει από τη σχολή ή τον δικό σας στη περίπτωση που τον αλλάξατε.",
                "Κάντε κλικ στη <strong> Σύνδεση </strong>."
            ]
        },
    ]

    return (
        <div className="Connect Help">
            <Navbar/>
            <main className="Main Connect Help">
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

export default ConnectHelp;