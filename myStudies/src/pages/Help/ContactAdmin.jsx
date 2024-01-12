import React from "react";

import { useNavigate } from "react-router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ContactAdmin = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login");
    };

    return (
        <div className="Contact Admin">
            <Navbar/>
            <main className="Main Contact Admin">
                <div style={{ marginTop: "1rem" }} className="bg-zinc-300 bg-opacity-50 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                    <div className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full"> Πως μπορώ να επικοινωνήσω με τον Διαχειριστή; </div>

                    <span className="text-black text-base italic max-w-full bg-green-200 bg-opacity-30 w-[800px] justify-center items-stretch mt-5 pl-3 pr-16 py-5 rounded-[35px] self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                        <p> 1. Στείλτε e-mail στη <span className="font-bold"> Γραμματεία </span> του Πανεπιστημίου. </p>
                        <p> 2. Ακολουθήστε τα βήματα που θα σας πουν. </p>
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

export default ContactAdmin;