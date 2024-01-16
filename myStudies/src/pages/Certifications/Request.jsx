import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar_students";
import NavBarOptions from "../../components/NavBarOptions";



const Request = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCertificate, setSelectedCertificate] = useState([]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/student/certifications");
    };

    const toggleCertificateSelection = (semester, subject) => {
        setSelectedCertificate(prevSubjects => {
            const subjectKey = `${semester}-${subject}`;
            if (prevSubjects.includes(subjectKey)) {
                return prevSubjects.filter(s => s !== subjectKey);
            } else {
                return [...prevSubjects, subjectKey];
            }
        });
    };

    // Function to move to the next step
    const goToNextStep = () => {
        console.log('Attempting to go to the next step');
        setCurrentStep(currentStep + 1);
    };

    // Function to move to the previous step
    const goToPreviousStep = () => {
        console.log('Attempting to go to the previous step');
        setCurrentStep(currentStep - 1);
    };

    const StepIndicators = ({ currentStep }) => {
        const steps = [1, 2, 3];

        return (
            <div className="flex items-center justify-center mt-8 space-x-2">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className={`flex flex-col items-center`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                {step}
                            </div>

                            <div className="text-sm text-center mt-1">
                                {step === 1 ? "Επιλογή Πιστοποιητικού" : step === 2 ? "Αντίγραφα" : "Αίτηση"}
                            </div>
                        </div>

                        {/* Connecting Line (for all but the last step) */}
                        {index < steps.length - 1 && (
                            <div className="flex-grow border-t border-gray-300" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    useEffect(() => {
        console.log('Current step is now:', currentStep);
    }, [currentStep]);

    let stepContent;
    switch (currentStep) {
        case 1:
            stepContent = <StepOne certificateSelection={toggleCertificateSelection} />;
            break;
        case 2:
            stepContent = <StepTwo certificateCopies={selectedCertificate} />;
            break;
        case 3:
            stepContent = <StepThree />;
            break;
        default:
            stepContent = <StepOne certificateSelection={toggleCertificateSelection} />;
    }

    return (
        <div className="Certification Request">
            <Navbar />
            <NavBarOptions userType={"student"} />
            <main className="main-content flex justify-center">
                <div className="w-full max-w-4xl">
                    {/* Render Step Indicators */}
                    <StepIndicators currentStep={currentStep} />
                    {/* Εδώ μπαίνει η λογική των βημάτων */}
                    {stepContent}
                    <div className="flex justify-center space-x-2 mt-4">
                        {/* Εμφάνιση του κουμπιού "Προηγούμενο" μόνο εάν δεν είμαστε στο πρώτο βήμα */}
                        {currentStep > 1 && (
                            <button onClick={goToPreviousStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Προηγούμενο</button>
                        )}
                        {/* Update button text based on the current step */}
                        {currentStep === 2 ? (
                            <button onClick={goToNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Οριστική Υποβολή</button>
                        ) : currentStep < 3 && (
                            <button onClick={goToNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Επόμενο</button>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const StepOne = ({ certificateSelection }) => {
    return (
        <div className="step-one-content">
            {/* Content of Step One */}
            <h2>Step One Content</h2>
            {/* Replace with actual content and form elements */}
        </div>
    );
};


const StepTwo = ({ certificateCopies }) => {
    return (
        <div className="step-two-content">
            {/* Content of Step Two */}
            <h2>Step Two Content</h2>
            {/* Replace with actual content and form elements */}
        </div>
    );
}
const StepThree = () => {
    return (
        <div className="step-three-content">
            {/* Content of Step Three */}
            <h2>Step Three Content</h2>
            {/* Replace with actual content and form elements */}
        </div>
    );
};


export default Request;