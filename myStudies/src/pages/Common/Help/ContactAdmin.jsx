import React, { useContext } from "react";

import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import { UserContext } from "../../../components/UserContext";

const ContactAdmin = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleBack = () => {
        if (user) {
            navigate(`/${user.role}/${user._id}`); 
        } else {
            navigate('/login');
        }
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
        <div>
            <Navbar/>
                <div className="m-10 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                    {question.map((data, index) => (
                        <div key={index} className="w-full">
                            <p className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full py-2"> {data.question} {" "} </p>
                        
                            <div className="info-container bg-gray-50 text-black text-base italic max-w-full shadow-md hover:shadow-xl cursor-pointer bg-opacity-30 w-fit justify-center items-stretch p-5 py-3 rounded-2xl self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                                <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                                    {data.steps.map((step, stepIndex) => (
                                        <li key={stepIndex} dangerouslySetInnerHTML={{ __html: step }}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    <button type="button" className="text-center text-white font-medium bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none rounded-lg text-base mt-36 px-5 py-3" 
                        onClick={handleBack}
                    > Επιστοφή στην Αρχική Σελίδα </button>
                </div>
            <Footer/>
        </div>
    );
};

export default ContactAdmin;