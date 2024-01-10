import React, { useState } from "react";
import Navbar_students from "../../components/Navbar_students";
import Footer from "../../components/Footer";
import NavBarOptions from "../../components/NavBarOptions";

const AccordionSection = ({ title, children, isOpen, onClick }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className="text-left w-full text-lg py-2 focus:outline-none"
            >
                {title}
            </button>
            {isOpen && <div className="content bg-gray-100 p-4">{children}</div>}
        </div>
    );
};

const DeclarationPage = () => {
    const [activeSemester, setActiveSemester] = useState(null);
    const [openSections, setOpenSections] = useState({});

    const toggleSemester = (semester) => {
        setActiveSemester(activeSemester === semester ? null : semester);
    };

    const toggleSection = (semester, section) => {
        const key = `${semester}-${section}`;
        setOpenSections({
            ...openSections,
            [key]: !openSections[key],
        });
    };

    return (
        <div className="declaration-page">
            <Navbar_students />
            <NavBarOptions userType={"student"} />
            <main className="main-content flex justify-center" >
                <div className="w-full max-w-4xl">
                    {<div className="flex items-center justify-center mt-8 space-x-4">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center text-white font-bold"> 1 </div>
                            <div className="text-sm text-center mt-1"> Επιλογή Μαθημάτων </div> {/* Message for Step 1 */}
                        </div>

                        {/* Arrow after Step 1 */}
                        <div className="relative flex items-center">
                            <div className="w-10 h-1 bg-gray-300"></div>
                            <div className="w-4 h-4 bg-blue-500 transform rotate-45 absolute right-0 -mr-2"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-white font-bold"> 2 </div>
                            <div className="text-sm text-center mt-1"> Επισκόπηση </div> {/* Message for Step 2 */}
                        </div>

                        {/* Arrow after Step 2 */}
                        <div className="relative flex items-center">
                            <div className="w-10 h-1 bg-gray-300"></div>
                            <div className="w-4 h-4 bg-gray-300 transform rotate-45 absolute right-0 -mr-2"></div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-white font-bold"> 3 </div>
                            <div className="text-sm text-center mt-1">Οριστική Υποβολή</div> {/* Message for Step 3 */}
                        </div>
                    </div>}
                    <div className="semesters mt-8 space-y-4">
                        {/* Semesters Buttons */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                            <div key={semester}>
                                <button
                                    onClick={() => toggleSemester(semester)}
                                    className="text-left w-full text-lg py-2 focus:outline-none"
                                >
                                    Εξάμηνο {semester}
                                </button>
                                {activeSemester === semester && (
                                    <div className="flex flex-col space-y-2 pl-8"> {/* Adjusted the left padding here */}
                                        <AccordionSection
                                            title="Υποχρεωτικά Μαθήματα"
                                            isOpen={openSections[`${semester}-required`]}
                                            onClick={() => toggleSection(semester, 'required')}
                                        >
                                            {/* Content for Υποχρεωτικά Μαθήματα */}
                                        </AccordionSection>
                                        <AccordionSection
                                            title="Εργαστήρια"
                                            isOpen={openSections[`${semester}-labs`]}
                                            onClick={() => toggleSection(semester, 'labs')}
                                        >
                                            {/* Content for Εργαστήρια */}
                                        </AccordionSection>
                                        <AccordionSection
                                            title="Προαιρετικά Μαθήματα"
                                            isOpen={openSections[`${semester}-optional`]}
                                            onClick={() => toggleSection(semester, 'optional')}
                                        >
                                            {/* Content for Προαιρετικά Μαθήματα */}
                                        </AccordionSection>
                                    </div>
                                )
                                }

                            </div>
                        ))}
                        {/* General buttons */}
                        <div className="flex justify-center space-x-2 mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Προηγούμενο
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Επόμενο
                            </button>
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </div >
    );
};

export default DeclarationPage;