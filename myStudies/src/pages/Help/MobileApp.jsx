import React from "react";

import { useNavigate } from "react-router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MobileApp = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login");
    };

    return (
        <div className="Mobile App">
            <Navbar/>
            <main className="Main Mobile App">
                <div style={{ marginTop: "1rem" }} className="bg-zinc-300 bg-opacity-50 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                    <div className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full"> Mobile Εφαρμογή για τους προπτυχιακούς φοιτητές </div>

                    <div className="text-blue-900 text-xl self-start max-md:max-w-full"> 
                        <p> Είναι διαθέσιμη για τους προπτυχιακούς φοιτητές του ΕΚΠΑ η mobile εφαρμογή myStudies για κινητά Android και Apple. </p>
                        <p> Παρέχει τις ακόλουθες πληροφορίες και μικρο-εφαρμογές: </p>
                    </div>

                    <span className="text-black text-base italic max-w-full bg-green-200 bg-opacity-30 w-[800px] justify-center items-stretch mt-5 pl-3 pr-16 py-5 rounded-[35px] self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                        <p> <span className="font-bold"> Φοιτητολόγιο: </span> για την πρόσβαση σε πληροφορίες που αφορούν αναλυτική βαθμολογία, δηλώσεις μαθημάτων, πρόγραμμα σπουδών, διδάσκοντες. </p>
                        <p> <span className="font-bold"> Αξιολόγηση μαθημάτων:  </span> εύκολη πρόσβαση στα online ερωτηματολόγια αξιολόγησης μαθημάτων. </p>
                        <p> <span className="font-bold"> Κοινωνική δικτύωση: </span> chat, αποστολή αρχείων, εικόνας, video, ομάδες φίλων, πληροφορίες γεωγραφικής θέσης, ομάδες κοινών ενδιαφερόντων. </p>
                    </span>

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