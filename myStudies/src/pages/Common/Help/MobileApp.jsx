import React, { useContext } from "react";

import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import { UserContext } from "../../../components/UserContext";

const MobileApp = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const handleBack = () => {
        if (user) {
            navigate(`/${user.role}/${user._id}`); 
        } else {
            navigate('/login');
        }
    };

    const mobileInfo = [
        {
            title: "Mobile Εφαρμογή για τους προπτυχιακούς φοιτητές",
            sentence: "Είναι διαθέσιμη για τους προπτυχιακούς φοιτητές του ΕΚΠΑ η mobile εφαρμογή myStudies για κινητά Android και Apple.",
            offering: "Παρέχει τις ακόλουθες πληροφορίες και μικρο-εφαρμογές:",
            info: [
                "<strong> Φοιτητολόγιο </strong> : για την πρόσβαση σε πληροφορίες που αφορούν αναλυτική βαθμολογία, δηλώσεις μαθημάτων, πρόγραμμα σπουδών, διδάσκοντες.",
                "<strong> Αξιολόγηση μαθημάτων </strong> : εύκολη πρόσβαση στα online ερωτηματολόγια αξιολόγησης μαθημάτων.",
                "<strong> Κοινωνική δικτύωση </strong> : chat, αποστολή αρχείων, εικόνας, video, ομάδες φίλων, πληροφορίες γεωγραφικής θέσης, ομάδες κοινών ενδιαφερόντων.",
            ]
        },
    ]

    return (
        <div>
            <Navbar/>
            <div className="m-10 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                {mobileInfo.map((data, index) => (
                    <div key={index} className="w-full">
                        <p className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full py-2"> {data.title} {" "} </p>
                        <p className="text-blue-900 text-xl self-start max-md:max-w-full"> {data.sentence} {" "} </p>
                        <p className="text-blue-900 text-xl self-start max-md:max-w-full"> {data.offering} {" "} </p>
                    
                        <div className="info-container mt-2 bg-gray-50 text-black text-base italic max-w-full shadow-md hover:shadow-xl cursor-pointer bg-opacity-30 w-fit justify-center items-stretch p-5 py-3 rounded-2xl self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                            <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                                {data.info.map((info, stepIndex) => (
                                    <li key={stepIndex} dangerouslySetInnerHTML={{ __html: info }}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                <button type="button" className="text-center text-white font-medium bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none rounded-lg text-base mt-36 px-5 py-3" 
                    onClick={handleBack}
                > Επιστοφή στην Αρχική Σελίδα </button>
            </div>
            <Footer/>
        </div>
    );
};

export default MobileApp;