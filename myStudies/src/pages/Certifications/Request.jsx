import React from "react";

import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import BreadCrump from "../../components/BreadCrump";
import Navbar from "../../components/Navbar_students";
import NavBarOptions from "../../components/NavBarOptions";

const Status = () => {
    const certificateSteps = [
        {number: 1, title: "Επιλογή", active: true}, 
        {number: 2, title: "Αντίγραφα", active: false},
        {number: 3, title: "Αίτηση", active: false },
    ];

    // const [selectedCertificate, setSelectedCertificate] = useState("");

    // const handleCertificateSelection = (selection) => {
    //     setSelectedCertificate(selection);
    // };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/student/certifications");
    };

    // const handleNext = () => {
    //     navigate("/student/certifications/status");
    // };

    return (
        <div className="Certification Request Page">
            <Navbar/>
            <NavBarOptions userType="student"/> {/* Instead of student string, giving the studentData.status */}
            <main className="main-content flex justify-center" >
                <div className="w-full max-w-4xl">
                    <div className="flex items-center justify-center mt-8 space-x-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center text-white font-bold"> 1 </div>
                            <div className="text-sm text-center mt-1"> Επιλογή </div> {/* Message for Step 1 */}
                        </div>

                        <div className="relative flex items-center">
                            <div className="w-10 h-1 bg-gray-300"></div>
                            <div className="w-4 h-4 bg-blue-500 transform rotate-45 absolute right-0 -mr-2"></div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-white font-bold"> 2 </div>
                            <div className="text-sm text-center mt-1"> Αντίγραφα </div> {/* Message for Step 2 */}
                        </div>

                        <div className="relative flex items-center">
                            <div className="w-10 h-1 bg-gray-300"></div>
                            <div className="w-4 h-4 bg-gray-300 transform rotate-45 absolute right-0 -mr-2"></div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-white font-bold"> 3 </div>
                            <div className="text-sm text-center mt-1"> Αίτηση </div> {/* Message for Step 3 */}
                        </div>
                    </div>
                </div>

                <div className="flex max-w-[740px] flex-col items-stretch px-5">
                    <div className="text-black text-center text-2xl w-full max-md:max-w-full">
                        Eπιλέξτε το πιστοποιητικό για το οποίο θέλετε να υποβάλετε αίτηση{" "}
                    </div>

                    <div className="flex w-full flex-col items-center mt-8 pl-8 pr-3 max-md:max-w-full max-md:pl-5">
                        <div className="bg-zinc-300 flex w-[632px] max-w-full items-stretch justify-between gap-5 pl-20 pr-5 py-2 rounded-3xl max-md:flex-wrap max-md:pl-5">
                            <div className="text-black text-center text-2xl w-[259px]">
                                Φοιτητικής Ιδιότητας
                            </div>

                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/46b88d0af8e8ba631d5be98b0b3d34f66ad0bc5f0b80353fc62c5b4b6d55f91d?"
                                className="aspect-[1.6] object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                            />
                        </div>

                        <div className="self-stretch flex items-stretch justify-between gap-5 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                            <button type="button" className="text-center text-white font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 "
                                onClick={handleBack}
                            > Προηγούμενο </button>

                            <button type="button" className="text-center text-white font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base px-5 py-3 "
                                // onClick={handleNext}
                            > Επόμενο </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Status;