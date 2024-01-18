import React from "react";

import { useNavigate } from "react-router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MobileApp = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login");
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
        <div className="Mobile App">
            <Navbar/>
            <main className="Main Mobile App">
                <div style={{ marginTop: "1rem" }} className="bg-zinc-300 bg-opacity-50 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                    {mobileInfo.map((data, index) => (
                        <div key={index} className="w-full">
                            <p className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full py-2"> {data.title} {" "} </p>
                            <p className="text-blue-900 text-xl self-start max-md:max-w-full"> {data.sentence} {" "} </p>
                            <p className="text-blue-900 text-xl self-start py-2 max-md:max-w-full"> {data.offering} {" "} </p>
                        
                            <div className="text-black text-base italic max-w-full bg-green-200 bg-opacity-30 w-[800px] justify-center items-stretch pl-3 pr-16 py-3 rounded-[35px] self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                                <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                                    {data.info.map((info, stepIndex) => (
                                        <li key={stepIndex} dangerouslySetInnerHTML={{ __html: info }}/>
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

export default MobileApp;