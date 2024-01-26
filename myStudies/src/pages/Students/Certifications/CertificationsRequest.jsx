import React from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../components/UserContext";

import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
import Success from "../../../components/Common/Success";
import Breadcrumb from "../../../components/Tools/Breadcrumb";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = ({ id }) => {
    return (
        <nav class="flex flex-col items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <Link to={`/student/${id}`} class="inline-flex items-center text-sm text-gray-600 hover:text-green-700 font-medium">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        <span> Αρχική Σελίδα </span>
                    </Link>
                </li>

                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <Link to={`/student/certifications/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-green-700 font-medium"> Πιστοποιητικά </Link>
                    </div>
                </li>

                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="text-sm text-gray-500 font-medium  dark:text-gray-400"> Αίτηση πιστοποιητικού </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const StepOne = ({ setCertificationType }) => {
    const [mainSelection, setMainSelection] = useState("Φοιτητικής Ιδιότητας");
    const [showCertificatesOptions, setShowCertificatesOptions] = useState(false);
    
    const options = [
        "Φοιτητικής Ιδιότητας",
        "Φορολογικής Χρήσης",
        "Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς",
        "Στρατολογική χρήση (Αναλυτικό)",
        "Στρατολογική χρήση (Συνοπτικό)",
    ]

    const handleButtonClick = (selectedOption) => {
        setMainSelection(selectedOption);
        setShowCertificatesOptions(false);
        setCertificationType(selectedOption);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center text-xl w-full mt-10 mb-4">
                Επιλέξτε το πιστοποιητικό<br/> για το οποίο θέλετε να υποβάλετε αίτηση
            </h2>

            <div className="bg-gray-50 rounded-3xl shadow-md hover:shadow-xl w-auto pl-2 pr-2">
                <div className="text-center text-xl font-medium p-4 cursor-pointer" onClick={() => setShowCertificatesOptions(!showCertificatesOptions)}>
                    <span> {mainSelection} {showCertificatesOptions ? "▲" : "▼"} </span>
                </div>
                {showCertificatesOptions && (
                    <div className="flex flex-col bg-gray-100 rounded-2xl pl-2 pr-2 mb-2">
                        {options.map((option, index) => (
                            <button key={index} onClick={() => handleButtonClick(option)} className="info-container text-lg mb-1 mt-1">
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StepTwo = ({ setNumberOfCopies }) => {
    const [mainSelection, setMainSelection] = useState("1");
    const [showCertificatesCopies, setShowCertificatesCopies] = useState(false);

    const copies = ["1", "2", "3", "4", "5"]
    
    const handleButtonClick = (selectedOption) => {
        setMainSelection(selectedOption);
        setShowCertificatesCopies(false);
        setNumberOfCopies(selectedOption);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center text-xl w-full mt-10 mb-4">
                Επιλέξτε τον αριθμό των αντιτύπων<br/> για το πιστοποιητικό που έχει επιλεχθεί
            </h2>
  
        <div className="bg-gray-50 rounded-3xl shadow-md hover:shadow-xl w-auto pl-2 pr-2">
                <div className="text-center text-xl font-medium p-3 cursor-pointer" onClick={() => setShowCertificatesCopies(!showCertificatesCopies)}>
                    <span> {mainSelection} {showCertificatesCopies ? "▲" : "▼"} </span>
                </div>
                {showCertificatesCopies && (
                    <div className="flex flex-col bg-gray-100 text-lg rounded-3xl pl-2 pr-2">
                        {copies.map((option, index) => (
                            <button key={index} onClick={() => handleButtonClick(option)} className="info-container">
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
        <div className="flex flex-col items-center">
            <h2 className="text-center text-2xl w-full mt-10 mb-4"> Είστε σίγουροι ότι θέλετε να ολοκληρώσετε την Aίτηση του Πιστοποιητικού; <br /> Αν ναι πατήστε επόμενο. </h2>
        </div>
    );
};

const Request = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [numberOfCopies, setNumberOfCopies] = useState(1);
    const [certificationType, setCertificationType] = useState("");

    useEffect(() => {
        console.log("Current step is now:", currentStep);
    }, [currentStep]);

    const handleSubmit = async () => {
        console.log(certificationType, numberOfCopies);
        const requestData = { certificationType, numberOfCopies, requestDate: new Date().toISOString(), studentId: user._id };
        try {
            const response = await axios.post('/certification-requests', requestData);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const goToNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        navigate(`/student/certifications/${user._id}`);
    };

    let stepContent;
    switch (currentStep) {
        case 1:
            stepContent = <StepOne setCertificationType={setCertificationType} />;
            break;
        case 2:
            stepContent = <StepTwo setNumberOfCopies={setNumberOfCopies} />;
            break;
        case 3:
            stepContent = <StepThree />;
            break;
        default:
            stepContent = <StepOne />;
    }

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"student"} userId={user._id} /> {/* Instead of student string, giving the studentData.status */}
            <Path id={user._id} />
            <div className="flex justify-center items-center px-6 mb-36" >
                {currentStep === 4 ? (
                    <Success userRole={"student"} action={"certification"} userId={user._id} />
                ) : (
                    <div className="w-full max-w-4xl">
                        <Breadcrumb currentStep={currentStep} stepStrings={["Επιλογή", "Αντίγραφα", "Αίτηση"]} />
                        {stepContent}
                        <div style={{ marginTop: "2rem" }} className="flex justify-center space-x-2 mt-4">
                            {currentStep === 1 ? (
                                <button onClick={handleBack} className="text-white bg-gray-400 rounded-lg hover:bg-gray-500 shadow-md hover:shadow-xl px-4 py-2"> Προηγούμενο </button>
                            ) : currentStep && (
                                <button onClick={goToPreviousStep} className="text-white bg-gray-400 rounded-lg hover:bg-gray-500 shadow-md hover:shadow-xl px-4 py-2"> Προηγούμενο </button>
                            )}

                            {currentStep === 3 ? (
                                <button onClick={() => {handleSubmit(); goToNextStep()}} className="text-white bg-green-500 rounded-lg hover:bg-green-600 shadow-md hover:shadow-xl px-4 py-2"> Ολοκλήρωση Αίτησης </button>
                            ) : currentStep < 3 && (
                                <button onClick={goToNextStep} className="text-white bg-green-500 rounded-lg hover:bg-green-600 shadow-md hover:shadow-xl px-8 py-2"> Επόμενο </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Request;