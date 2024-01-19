import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrump from "../../../components/Tools/Breadcrumb";

import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Request = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    
    // 
    const handleBack = () => {
        navigate("/student/certifications");
    };

    const handleBackToMain = () => {
        navigate("/success");
    };

    // Function to move to the next step
    const goToNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    // Function to move to the previous step
    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        console.log('Current step is now:', currentStep);
    }, [currentStep]);

    let stepContent;
    switch (currentStep) {
        case 1:
            stepContent = <StepOne/>;
            break;
        case 2:
            stepContent = <StepTwo/>;
            break;
        case 3:
            stepContent = <StepThree/>;
            break;
        default:
            stepContent = <StepOne/>;
    }

    return (
        <div className="Certification Request">
            <Navbar />
            <NavBarOptions userType={"student"} /> {/* Instead of student string, giving the studentData.status */}
            <main className="main-content flex justify-center" >
                <div className="w-full max-w-4xl">
                    <Breadcrump currentStep={currentStep} stepStrings={["Επιλογή", "Αντίγραφα", "Αίτηση"]}/>
                    {stepContent}
                    <div style={{marginTop: "2rem"}} className="flex justify-center space-x-2 mt-4">
                        {currentStep === 1 ? (
                            <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> Προηγούμενο </button>
                        ) : currentStep && (
                            <button onClick={goToPreviousStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> Προηγούμενο </button>
                        )}

                        {currentStep === 3 ? (
                            <button onClick={goToNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> Αίτηση </button>
                        ) : currentStep < 3 && (
                            <button onClick={goToNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> Επόμενο </button>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const StepOne = () => {
    const [mainSelection, setMainSelection] = useState("Φοιτητικής Ιδιότητας");
    const [showCertificatesOptions, setShowCertificatesOptions] = useState(false);

    const handleButtonClick = (selectedOption) => {
        setMainSelection(selectedOption);
        setShowCertificatesOptions(false);
    };

    const options = [
        "Φοιτητικής Ιδιότητας", 
        "Φορολογικής Χρήσης", 
        "Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς",
        "Στρατολογική χρήση (Συνοπτικό)",
        "Στρατολογική χρήση (Συνοπτικό)",
    ]

    return (
        <div className="One">
            <div style={{ marginTop: "6rem" }} className="text-black text-center text-2xl w-full max-md:max-w-full flex flex-col items-center px-5">
                Eπιλέξτε το πιστοποιητικό για το οποίο θέλετε να υποβάλετε αίτηση
            </div>

            <div className="bg-gray-300 rounded-3xl">
                <div style={{ marginTop: "2rem" }} className="text-center text-black text-lg p-1 cursor-pointer font-medium" onClick={() => setShowCertificatesOptions(!showCertificatesOptions)}> 
                    <span> {mainSelection} {showCertificatesOptions ? "▲" : "▼"} </span>
                </div>
                {showCertificatesOptions && (
                    <div className="flex flex-col justify-center rounded-3xl p-1 bg-gray-100">
                        {options.map((option, index) => (
                            <button key={index} onClick={() => handleButtonClick(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StepTwo = () => {
    const [mainSelection, setMainSelection] = useState("1");
    const [showCertificatesCopies, setshowCertificatesCopies] = useState(false);

    const handleButtonClick = (selectedOption) => {
        setMainSelection(selectedOption);
        setshowCertificatesCopies(false);
    };

    const copies = ["1", "2", "3", "4", "5"]

    return (
        <div className="One">
            <div style={{ marginTop: "6rem" }} className="text-black text-center text-2xl w-full max-md:max-w-full flex flex-col items-center px-5">
                Συμπληρώστε τον αριθμό των αντιτύπων για το πιστοποιητικό που έχει επιλεχθεί
            </div>

            <div className="bg-gray-300 rounded-3xl">
                <div style={{ marginTop: "2rem" }} className="text-center text-black text-lg p-1 cursor-pointer font-medium" onClick={() => setshowCertificatesCopies(!showCertificatesCopies)}> 
                    <span> {mainSelection} {showCertificatesCopies ? "▲" : "▼"} </span>
                </div>
                {showCertificatesCopies && (
                    <div className="flex flex-col justify-center rounded-3xl p-1 bg-gray-100">
                        {copies.map((option, index) => (
                            <button key={index} onClick={() => handleButtonClick(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StepThree = () => {
    return (
        <div className="Three">
            <div style={{ marginTop: "6rem" }} className="text-black text-center text-2xl w-full max-md:max-w-full flex flex-col items-center px-5">
                Είστε σίγουροι ότι θέλετε να προχωρήσετε σε αίτηση του πιστοποιητικού; Αν ναι πατήστε επόμενο.
            </div>
        </div>
    );
};

export default Request;