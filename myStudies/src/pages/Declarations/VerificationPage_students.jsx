import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar_students from "../../components/Navbar_students";
import Footer from "../../components/Footer";
import NavBarOptions from "../../components/NavBarOptions";

const DeclarationPage = () => {
    // State for controlling which step the user is on
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    // ... other state hooks

    const toggleSubjectSelection = (semester, subject) => {
        setSelectedSubjects(prevSubjects => {
            const subjectKey = `${semester}-${subject}`;
            if (prevSubjects.includes(subjectKey)) {
                return prevSubjects.filter(s => s !== subjectKey);
            } else {
                return [...prevSubjects, subjectKey];
            }
        });
    };

    const StepIndicators = ({ currentStep }) => {
        const steps = [1, 2, 3]; // Define the number of steps

        return (
            <div className="flex items-center justify-center mt-8 space-x-2">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        {/* Step Circle */}
                        <div className={`flex flex-col items-center`}>
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
                            >
                                {step}
                            </div>
                            <div className="text-sm text-center mt-1">
                                {step === 1 ? "Επιλογή Μαθημάτων" : step === 2 ? "Επισκόπηση" : "Οριστική Υποβολή"}
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

    // Function to deselect a subject
    const handleSubjectDeselect = (subjectKey) => {
        setSelectedSubjects(selectedSubjects.filter(s => s !== subjectKey));
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

    useEffect(() => {
        console.log('Current step is now:', currentStep);
    }, [currentStep]);
    // ... rest of your component

    // Conditional rendering based on the current step
    let stepContent;
    switch (currentStep) {
        case 1:
            stepContent = <StepOne onSubjectSelect={toggleSubjectSelection} selectedSubjects={selectedSubjects} />;
            break;
        case 2:
            stepContent = (<StepTwo selectedSubjects={selectedSubjects} onSubjectDeselect={handleSubjectDeselect} />
            );
            break;
        case 3:
            stepContent = <StepThree selectedSubjects={selectedSubjects} />;
            break;
        default:
            stepContent = <StepOne onSubjectSelect={toggleSubjectSelection} selectedSubjects={selectedSubjects} />;
    }

    return (
        <div className="declaration-page">
            <Navbar_students />
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

const courseData = {
    1: { // Semester 1
        required: ["Course 1.1", "Course 1.2"], // Υποχρεωτικά
        optional: ["Course 1.3", "Course 1.4"], // Προαιρετικά
        labs: ["Course 1.5", "Course 1.6"],
        // ... other course types
    },
    2: { // Semester 2
        required: ["Course 2.1", "Course 2.2"],
        optional: ["Course 2.3", "Course 2.4"],
        labs: ["Course 2.5", "Course 2.6"],
        // ... other course types
    },
    3: { // Semester 2
        required: ["Course 3.1", "Course 3.2"],
        optional: ["Course 3.3", "Course 3.4"],
        labs: ["Course 3.5", "Course 3.6"],
        // ... other course types
    },
    4: { // Semester 2
        required: ["Course 4.1", "Course 4.2"],
        optional: ["Course 4.3", "Course 4.4"],
        labs: ["Course 4.5", "Course 4.6"],
        // ... other course types
    },
    5: { // Semester 2
        required: ["Course 5.1", "Course 5.2"],
        optional: ["Course 5.3", "Course 5.4"],
        labs: ["Course 5.5", "Course 5.6"],
        // ... other course types
    },
    6: { // Semester 2
        required: ["Course 6.1", "Course 6.2"],
        optional: ["Course 6.3", "Course 6.4"],
        labs: ["Course 6.5", "Course 6.6"],
        // ... other course types
    },
    7: { // Semester 2
        required: ["Course 7.1", "Course 7.2"],
        optional: ["Course 7.3", "Course 7.4"],
        labs: ["Course 7.5", "Course 7.6"],
        // ... other course types
    },
    8: { // Semester 2
        required: ["Course 8.1", "Course 8.2"],
        optional: ["Course 8.3", "Course 8.4"],
        labs: ["Course 8.5", "Course 8.6"],
        // ... other course types
    }
};


// Εδώ ορίζετε τα συστατικά για κάθε βήμα
const StepOne = ({ onSubjectSelect, selectedSubjects }) => {
    const [activeSemester, setActiveSemester] = useState(null);
    const [openSections, setOpenSections] = useState({});

    const toggleSemester = (semester) => {
        console.log('Toggling semester', semester);
        setActiveSemester(activeSemester === semester ? null : semester);
    };

    const isSubjectSelected = (semester, subject) => {
        return selectedSubjects.includes(`${semester}-${subject}`);
    };

    const handleSubjectToggle = (semester, subject) => {
        onSubjectSelect(semester, subject);
    };

    const toggleSection = (semester, section, event) => {
        event.stopPropagation();
        const key = `${semester}-${section}`;
        console.log(`Toggling section: ${key}`);
        setOpenSections(prevSections => ({
            ...prevSections,
            [key]: !prevSections[key]
        }));
    };

    const AccordionSection = ({ title, children, isOpen, onClick }) => {
        return (
            <div>
                <button onClick={onClick} className="text-left w-full text-lg py-2 focus:outline-none">
                    {title}
                </button>
                {isOpen && <div className="content bg-gray-100 p-4">{children}</div>}
            </div>
        );
    };

    return (
        <div>
            {/* Existing semester and accordion logic */}
            <div className="semesters mt-8 space-y-4">
                {Object.keys(courseData).map((semester) => (
                    <div key={semester}>
                        <button
                            onClick={() => toggleSemester(semester)}
                            className="text-left w-full text-lg py-2 focus:outline-none"
                        >
                            Εξάμηνο {semester}
                        </button>
                        {activeSemester === semester && (
                            <div className="flex flex-col space-y-2 pl-8">
                                <AccordionSection
                                    title="Υποχρεωτικά Μαθήματα"
                                    isOpen={openSections[`${semester}-required`]}
                                    onClick={(e) => toggleSection(semester, 'required', e)}
                                >
                                    {courseData[semester].required.map(course => (
                                        <div key={course}>
                                            <input
                                                type="checkbox"
                                                checked={isSubjectSelected(semester, course)}
                                                onChange={() => handleSubjectToggle(semester, course)}
                                            />
                                            {course}
                                        </div>
                                    ))}
                                </AccordionSection>
                                <AccordionSection
                                    title="Προαιρετικά Μαθήματα"
                                    isOpen={openSections[`${semester}-optional`]}
                                    onClick={(e) => toggleSection(semester, 'optional', e)}
                                >
                                    {courseData[semester].optional.map(course => (
                                        <div key={course}>
                                            <input
                                                type="checkbox"
                                                checked={isSubjectSelected(semester, course)}
                                                onChange={() => handleSubjectToggle(semester, course)}
                                            />
                                            {course}
                                        </div>
                                    ))}
                                </AccordionSection>
                                <AccordionSection
                                    title="Εργαστήρια"
                                    isOpen={openSections[`${semester}-labs`]}
                                    onClick={(e) => toggleSection(semester, 'labs', e)}
                                >
                                    {courseData[semester].labs.map(course => (
                                        <div key={course}>
                                            <input
                                                type="checkbox"
                                                checked={isSubjectSelected(semester, course)}
                                                onChange={() => handleSubjectToggle(semester, course)}
                                            />
                                            {course}
                                        </div>
                                    ))}
                                </AccordionSection>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const StepTwo = ({ selectedSubjects, onSubjectDeselect }) => {
    const handleDeselectSubject = (subjectKey) => {
        onSubjectDeselect(subjectKey);
    };

    // This function will help to group the subjects by semester
    const groupSubjectsBySemester = (selectedSubjects) => {
        return selectedSubjects.reduce((acc, subjectKey) => {
            const [semester, subject] = subjectKey.split('-');
            if (!acc[semester]) acc[semester] = [];
            acc[semester].push(subject);
            return acc;
        }, {});
    };

    const subjectsBySemester = groupSubjectsBySemester(selectedSubjects);

    return (
        <div>
            <div className="text-red-500 text-center mb-4">
                Τα παρακάτω μαθήματα αποθηκεύτηκαν προσωρινά. Πατήστε επόμενο για να προχωρήσετε σε Οριστική Υποβολή.
            </div>
            <h2>Selected Subjects</h2>
            {Object.entries(subjectsBySemester).map(([semester, subjects]) => (
                <div key={semester}>
                    <h3>Εξάμηνο {semester}</h3>
                    <ul className="pl-4"> {/* Add padding to the left of the list */}
                        {subjects.map((subject) => {
                            const subjectKey = `${semester}-${subject}`;
                            return (
                                <li key={subjectKey} className="list-inside list-disc"> {/* This will style list items with bullets */}
                                    <input
                                        type="checkbox"
                                        checked
                                        onChange={() => handleDeselectSubject(subjectKey)}
                                    />
                                    {subject}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};



const StepThree = ({ selectedSubjects }) => {
    const navigate = useNavigate();
    // Helper function to group subjects by semester
    const groupSubjectsBySemester = (selectedSubjects) => {
        return selectedSubjects.reduce((acc, subjectKey) => {
            const [semester, subject] = subjectKey.split('-');
            if (!acc[semester]) acc[semester] = [];
            acc[semester].push(subject);
            return acc;
        }, {});
    };

    // Helper function to check if both odd and even semesters are selected
    const hasMixedSemesterSelection = (subjectsBySemester) => {
        const semesters = Object.keys(subjectsBySemester);
        let hasOdd = false;
        let hasEven = false;
        semesters.forEach(semester => {
            if (parseInt(semester) % 2 === 0) hasEven = true;
            else hasOdd = true;
        });
        return hasOdd && hasEven;
    };

    const subjectsBySemester = groupSubjectsBySemester(selectedSubjects);
    const totalSubjects = selectedSubjects.length;
    const mixedSemesters = hasMixedSemesterSelection(subjectsBySemester);

    // Function to navigate to the verification page
    const handleOkClick = () => {
        console.log("Ok button clicked");  // Debug log
        navigate('/student');
    };

    // Decide the message based on the conditions
    let message;
    if (mixedSemesters) {
        message = "Δεν είναι δυνατή η δήλωση μαθημάτων και από τα δύο είδη εξαμήνων (ζυγά και μονά).";
    } else if (totalSubjects > 10) {
        message = "Έχετε επιλέξει περισσότερα από 10 μαθήματα.";
    } else {
        message = "Η οριστική σας δήλωση έχει καταχωρηθεί.";
    }

    return (
        <div>
            <div className={`text-center p-4 ${mixedSemesters || totalSubjects > 10 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {message}
            </div>

            {/* If no error, show the selected subjects */}
            {!mixedSemesters && totalSubjects <= 10 && Object.entries(subjectsBySemester).map(([semester, subjects]) => (
                <div key={semester} className="mt-4">
                    <h3 className="font-semibold">Εξάμηνο {semester}</h3>
                    <ul className="list-disc pl-5">
                        {subjects.map(subject => (
                            <li key={`${semester}-${subject}`}>{subject}</li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Show the Okay button based on conditions */}
            {!mixedSemesters && totalSubjects <= 10 && (
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleOkClick}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Εντάξει
                    </button>
                </div>
            )}
        </div>
    );
};



export default DeclarationPage