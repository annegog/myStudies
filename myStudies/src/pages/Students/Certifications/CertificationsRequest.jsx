import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
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
                    <Link to={`/student/${id}`} class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white">
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
                        <a href={`/student/certifications/${id}`} class="inline-flex items-center text-sm text-gray-700 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white"> Πιστοποιητικά </a>
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
        <div className="flex flex-col items-center">
            <h2 className="flex flex-col text-center text-2xl w-full mt-24 mb-4">
                Επιλέξτε το πιστοποιητικό για το οποίο θέλετε να υποβάλετε αίτηση
            </h2>

            <div className="bg-gray-50 shadow-xl rounded-xl w-auto pl-2 pr-2">
                <div className="text-center text-lg font-medium p-3 cursor-pointer" onClick={() => setShowCertificatesOptions(!showCertificatesOptions)}>
                    <span> {mainSelection} {showCertificatesOptions ? "▲" : "▼"} </span>
                </div>
                {showCertificatesOptions && (
                    <div className="flex flex-col bg-gray-50 rounded-xl">
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
        <div className="flex flex-col items-center">
            <h2 className="flex flex-col text-center text-2xl w-full mt-24 mb-4">
                Επιλέξτε τον αριθμό των αντιτύπων για το πιστοποιητικό που έχει επιλεχθεί
            </h2>

            <div className="bg-gray-50 shadow-xl rounded-xl w-auto pl-2 pr-2">
                <div className="text-center text-lg font-medium p-3 cursor-pointer" onClick={() => setshowCertificatesCopies(!showCertificatesCopies)}>
                    <span> {mainSelection} {showCertificatesCopies ? "▲" : "▼"} </span>
                </div>
                {showCertificatesCopies && (
                    <div className="flex flex-col rounded-xl bg-gray-50">
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
        <div className="flex flex-col items-center">
            <h2 className="flex flex-col text-center text-2xl w-full mt-24 mb-4">
                Είστε σίγουροι ότι θέλετε να προχωρήσετε σε αίτηση του πιστοποιητικού; <br /> Αν ναι πατήστε επόμενο.
            </h2>
        </div>
    );
};

const Request = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [certificationType, setCertificationType] = useState('');
    const [numberOfCopies, setNumberOfCopies] = useState(1);

    const handleBack = () => {
        navigate(`/student/certifications/${id}`);
    };

    const goToNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        console.log("Current step is now:", currentStep);
    }, [currentStep]);

    const handleSubmit = async () => {
        const requestData = {
            certificationType,
            numberOfCopies,
            requestDate: new Date().toISOString(),
            studentId: id
        };

        try {
            const response = await axios.post('/api/certification-requests', requestData);
            console.log(response.data);
            // Handle successful submission
            // e.g., navigate to a success page or show a success message
        } catch (error) {
            console.error('Error submitting request:', error);
            // Handle error
            // e.g., show an error message to the user
        }
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
            <NavBarOptions userType={"student"} userId={id} /> {/* Instead of student string, giving the studentData.status */}
            <Path id={id} />
            <div className="flex justify-center items-center px-6 mb-36" >
                {currentStep === 4 ? (
                    <Success userRole={"student"} action={"certification"} />
                ) : (
                    <div className="w-full max-w-4xl">
                        <Breadcrumb currentStep={currentStep} stepStrings={["Επιλογή", "Αντίγραφα", "Αίτηση"]} />
                        {stepContent}
                        <div style={{ marginTop: "2rem" }} className="flex justify-center space-x-2 mt-4">
                            {currentStep === 1 ? (
                                <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-xl"> Προηγούμενο </button>
                            ) : currentStep && (
                                <button onClick={goToPreviousStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-xl"> Προηγούμενο </button>
                            )}

                            {currentStep === 3 ? (
                                <button onClick={goToNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-xl"> Αίτηση </button>
                            ) : currentStep < 3 && (
                                <button onClick={goToNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-xl"> Επόμενο </button>
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