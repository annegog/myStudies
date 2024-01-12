import React from "react";

import { useNavigate } from "react-router";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ConnectHelp = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login");
    };

    return (
        <div className="Connect Help">
            <Navbar/>
            <main className="Main Connect Help">
                <div style={{ marginTop: "1rem" }} className="bg-zinc-300 bg-opacity-50 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                    <div className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full"> Πως μπορώ να συνδεθώ στην πλατφόρμα του My Studies; </div>

                    <span className="text-black text-base italic max-w-full bg-green-200 bg-opacity-30 w-[800px] justify-center items-stretch mt-5 pl-3 pr-16 py-5 rounded-[35px] self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                        <p> 1. Στο πεδίο του <span className="font-bold"> Όνομα Χρήστη </span> συμπληρώστε τον A.M. που έχετε λάβει από τη σχολή. </p>
                        <p> 2. Στο πεδίο του <span className="font-bold"> Κωδικός Πρόσβασής </span> συμπληρώστε τον κωδικό που έχετε λάβει από τη σχολή ή τον δικό σας στη περίπτωση που τον αλλάξατε. </p>
                        <p> 3. Κάντε κλικ στο <span className="font-bold"> Είσοδος. </span> </p>
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

export default ConnectHelp;