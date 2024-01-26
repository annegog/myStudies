import React from "react";
import axios from "axios";

import { Checkbox } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../components/UserContext";

import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
import Success from "../../../components/Common/Success";
import Breadcrumb from "../../../components/Tools/Breadcrumb";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = (id) => {
    return (
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <Link to={`/student/${id}`} class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span> Αρχική Σελίδα </span>
                    </Link>
                </li>

                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium  dark:text-gray-400"> Δήλωση Μαθημάτων </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Declarations = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);

    console.log("Received ID in Grades:", id);

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [organizedCourses, setOrganizedCourses] = useState({});

    useEffect(() => {
        const apiEndpoint = "/api/courses";
        axios
            .get(apiEndpoint)
            .then((response) => {
                const organizedData = organizeCourses(response.data);
                setOrganizedCourses(organizedData);
            })
            .catch((error) => {
                console.error("Error fetching course data:", error);
            });
    }, []); // Empty dependency array ensures the effect runs only once

    // Function to organize courses by semester, type, and direction/major
    const organizeCourses = (courses) => {
        const organizedData = {};

        // Iterate over each course
        courses.forEach((course) => {
            const { semester, mandatory, lab, general, direction } = course;

            // Create semester key if not exists
            if (!organizedData[semester]) {
                organizedData[semester] = {
                    required: [],
                    labs: [],
                    general: [],
                    directionA: [],
                    directionB: [],
                };
            }

            if (mandatory) {
                organizedData[semester].required.push(course);
            } else if (lab) {
                organizedData[semester].labs.push(course);
            } else if (general) {
                organizedData[semester].general.push(course);
            }

            if (direction === "A") {
                organizedData[semester].directionA.push(course);
            } else if (direction === "B") {
                organizedData[semester].directionB.push(course);
            }
        });
        
        return organizedData;
    };

    const toggleSubjectSelection = (semester, subject) => {
        setSelectedSubjects((prevSubjects) => {
            const subjectKey = `${semester}-${subject}`;
            if (prevSubjects.includes(subjectKey)) {
                return prevSubjects.filter((s) => s !== subjectKey);
            } else {
                return [...prevSubjects, subjectKey];
            }
        });
    };

    // Function to deselect a subject
    const handleSubjectDeselect = (subjectKey) => {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subjectKey));
    };

    // Function to move to the next step
    const goToNextStep = () => {
        console.log("Attempting to go to the next step");
        setCurrentStep(currentStep + 1);
    };

    // Function to move to the previous step
    const goToPreviousStep = () => {
        console.log("Attempting to go to the previous step");
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        console.log("Current step is now:", currentStep);
    }, [currentStep]);

    useEffect(() => {
        console.log("Selected subjects:", selectedSubjects);
    }, [selectedSubjects]);

    let stepContent;
    switch (currentStep) {
        case 1:
            stepContent = (
                <StepOne
                    onSubjectSelect={toggleSubjectSelection}
                    selectedSubjects={selectedSubjects}
                    organizedCourses={organizedCourses}
                />
            );
            break;
        case 2:
            stepContent = (
                <StepTwo
                    selectedSubjects={selectedSubjects}
                    onSubjectDeselect={handleSubjectDeselect}
                />
            );
            break;
        case 3:
            stepContent = <StepThree selectedSubjects={selectedSubjects} />;
            break;
        default:
            stepContent = (
                <StepOne
                    onSubjectSelect={toggleSubjectSelection}
                    selectedSubjects={selectedSubjects}
                />
            );
    }

    const handleOkClick = async () => {
        const courses = selectedSubjects.map((subjectKey) => {
            const [semester, course] = subjectKey.split("-");
            return course;
        });

        try {
            await axios.post(`/save-declaration/${user._id}`, { courses: courses });
        } catch (error) {
            console.error("Error saving declaration:", error);
        }

        goToNextStep();
    };

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={"student"} userId={id} />
            <Path id={id} />
            <main className="main-content flex justify-center">
                {currentStep === 4 ? (
                    <Success userRole={"student"} action={"declaration"} userId={id} />
                ) : (
                    <div className="w-full max-w-4xl">
                        {/* Render Step Indicators */}
                        <Breadcrumb
                            currentStep={currentStep}
                            stepStrings={[
                                "Επιλογή Μαθημάτων",
                                "Επισκόπηση",
                                "Οριστική Υποβολή",
                            ]}
                        />
                        {/* Εδώ μπαίνει η λογική των βημάτων */}
                        {stepContent}
                        <div className="flex justify-center space-x-2 mt-4">
                            {/* Εμφάνιση του κουμπιού "Προηγούμενο" μόνο εάν δεν είμαστε στο πρώτο βήμα */}
                            {currentStep > 1 && (
                                <button
                                    onClick={goToPreviousStep}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-xl"
                                >
                                    {" "}
                                    Προηγούμενο{" "}
                                </button>
                            )}

                            {/* Update button text based on the current step */}
                            {currentStep === 3 ? (
                                <button
                                    onClick={handleOkClick}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-xl"
                                >
                                    {" "}
                                    Οριστική Υποβολή{" "}
                                </button>
                            ) : (
                                currentStep < 3 && (
                                    <button
                                        onClick={goToNextStep}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-xl"
                                    >
                                        {" "}
                                        Επόμενο{" "}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

const StepOne = ({ onSubjectSelect, selectedSubjects, organizedCourses }) => {
    const [activeSemester, setActiveSemester] = useState(null);
    const [openSections, setOpenSections] = useState({});

    const toggleSemester = (semester) => {
        console.log("Toggling semester", semester);
        setActiveSemester(activeSemester === semester ? null : semester);
    };

    const isSubjectSelected = (semester, subject) => {
        return selectedSubjects.includes(`${semester}-${subject}`);
    };

    const handleSubjectToggle = (semester, subject) => {
        console.log(`Toggling subject: ${semester}-${subject}`);
        onSubjectSelect(semester, subject);
    };

    const toggleSection = (semester, section, event) => {
        event.stopPropagation();
        const key = `${semester}-${section}`;
        console.log(`Toggling section: ${key}`);
        setOpenSections((prevSections) => ({
            ...prevSections,
            [key]: !prevSections[key],
        }));
    };

    const AccordionSection = ({ title, children, isOpen, onClick }) => {
        return (
            <div>
                <button
                    onClick={onClick}
                    className="text-left w-full text-lg py-2 focus:outline-none"
                >
                    {title}
                </button>
                {isOpen && (
                    <div className="content p-3 bg-white shadow-xl rounded-xl">{children}</div>
                )}
            </div>
        );
    };

    return (
        <div>
            <div className="semesters mt-8 space-y-4">
                {Object.keys(organizedCourses).map((semester) => (
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
                                    isOpen={
                                        openSections[`${semester}-required`] &&
                                        organizedCourses[semester]?.required
                                    }
                                    onClick={(e) => toggleSection(semester, "required", e)}
                                >
                                    {organizedCourses[semester]?.required?.map((course) => (
                                        <div key={course.id_course}>
                                            <Checkbox
                                                type="checkbox"
                                                checked={isSubjectSelected(semester, course.title)}
                                                onChange={() =>
                                                    handleSubjectToggle(semester, course.title)
                                                }
                                            />
                                            {course.title}
                                        </div>
                                    ))}
                                </AccordionSection>
                                <AccordionSection
                                    title="Γενικής Παιδείας"
                                    isOpen={
                                        openSections[`${semester}-general`] &&
                                        organizedCourses[semester]?.general
                                    }
                                    onClick={(e) => toggleSection(semester, "general", e)}
                                >
                                    {organizedCourses[semester]?.general?.map((course) => (
                                        <div key={course.id_course}>
                                            <Checkbox
                                                type="checkbox"
                                                checked={isSubjectSelected(semester, course.title)}
                                                onChange={() =>
                                                    handleSubjectToggle(semester, course.title)
                                                }
                                            />
                                            {course.title} - {course.id_course}
                                        </div>
                                    ))}
                                </AccordionSection>
                                <AccordionSection
                                    title="Εργαστήρια"
                                    isOpen={
                                        openSections[`${semester}-labs`] &&
                                        organizedCourses[semester]?.labs
                                    }
                                    onClick={(e) => toggleSection(semester, "labs", e)}
                                >
                                    {organizedCourses[semester]?.labs?.map((course) => (
                                        <div key={course.id_course}>
                                            <Checkbox
                                                type="checkbox"
                                                checked={isSubjectSelected(semester, course.title)}
                                                onChange={() =>
                                                    handleSubjectToggle(semester, course.title)
                                                }
                                            />
                                            {course.title} - {course.id_course}
                                        </div>
                                    ))}
                                </AccordionSection>
                                {semester >= 5 && (
                                    <div>
                                        <AccordionSection
                                            title="Κατεύθυνση Α"
                                            isOpen={
                                                openSections[`${semester}-directionA`] &&
                                                organizedCourses[semester]?.labs
                                            }
                                            onClick={(e) => toggleSection(semester, "directionA", e)}
                                        >
                                            {organizedCourses[semester]?.directionA?.map((course) => (
                                                <div key={course.id_course}>
                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={isSubjectSelected(semester, course.title)}
                                                        onChange={() =>
                                                            handleSubjectToggle(semester, course.title)
                                                        }
                                                    />
                                                    {course.title} - {course.id_course}
                                                </div>
                                            ))}
                                        </AccordionSection>
                                        <AccordionSection
                                            title="Κατεύθυνση B"
                                            isOpen={
                                                openSections[`${semester}-directionB`] &&
                                                organizedCourses[semester]?.labs
                                            }
                                            onClick={(e) => toggleSection(semester, "directionB", e)}
                                        >
                                            {organizedCourses[semester]?.directionB?.map((course) => (
                                                <div key={course.id_course}>
                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={isSubjectSelected(semester, course.title)}
                                                        onChange={() =>
                                                            handleSubjectToggle(semester, course.title)
                                                        }
                                                    />
                                                    {course.title} - {course.id_course}
                                                </div>
                                            ))}
                                        </AccordionSection>
                                        <AccordionSection
                                            title="Επιλογές Τμήματος"
                                            isOpen={
                                                openSections[`${semester}-optional`] &&
                                                organizedCourses[semester]?.labs
                                            }
                                            onClick={(e) => toggleSection(semester, "optional", e)}
                                        >
                                            {organizedCourses[semester]?.optional?.map((course) => (
                                                <div key={course.id_course}>
                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={isSubjectSelected(semester, course.title)}
                                                        onChange={() =>
                                                            handleSubjectToggle(semester, course.title)
                                                        }
                                                    />
                                                    {course.title} - {course.id_course}
                                                </div>
                                            ))}
                                        </AccordionSection>
                                    </div>
                                )}
                                {semester >= 7 && (
                                    <div>
                                        <AccordionSection
                                            title="Πτυχιακή-Πρακτική"
                                            isOpen={
                                                openSections[`${semester}-internship`] &&
                                                organizedCourses[semester]?.labs
                                            }
                                            onClick={(e) => toggleSection(semester, "internship", e)}
                                        >
                                            {organizedCourses[semester]?.internship?.map((course) => (
                                                <div key={course.id_course}>
                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={isSubjectSelected(semester, course.title)}
                                                        onChange={() =>
                                                            handleSubjectToggle(semester, course.title)
                                                        }
                                                    />
                                                    {course.title} - {course.id_course}
                                                </div>
                                            ))}
                                        </AccordionSection>
                                    </div>
                                )}
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
            <div className="text-red-500 text-center text-lg m-10">
                Τα παρακάτω μαθήματα αποθηκεύτηκαν προσωρινά. Πατήστε επόμενο για να προχωρήσετε σε Οριστική Υποβολή.
            </div>
            <h2 className="text-center text-xl font-medium">Επιλεγμένα Μαθήματα</h2>
            {Object.entries(subjectsBySemester).map(([semester, subjects]) => (
                <div key={semester}>
                    <h3 className="text-lg"> Εξάμηνο {semester}</h3>
                    <ul className="pl-4">
                        {subjects.map((subject) => {
                            const subjectKey = `${semester}-${subject}`;
                            return (
                                <li key={subjectKey} className="list-inside list-disc"> {/* This will style list items with bullets */}
                                    <Checkbox
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

    let message;
    if (mixedSemesters) {
        message = "Δεν είναι δυνατή η δήλωση μαθημάτων και από τα δύο είδη εξαμήνων (ζυγά και μονά).";
    } else if (totalSubjects > 10) {
        message = "Έχετε επιλέξει περισσότερα από 10 μαθήματα.";
    } else {
        message = "Πατήστε Οριστική Υποβολή.";
    }

    return (
        <div>
            <div className={`text-center p-4 m-20 text-lg bg-transparent ${mixedSemesters || totalSubjects > 10 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
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
            {/* {!mixedSemesters && totalSubjects <= 10 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleOkClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Εντάξει
          </button>
        </div>
      )} */}

        </div>
    );
};

export default Declarations;