import React from "react";

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

    return (
        <div>
            <Navbar/>
            <NavBarOptions userType="student"/>
            <main className="main-content flex justify-center" >
                <div className="w-full max-w-4xl">
                    <div className="flex items-center justify-center mt-8 space-x-4">
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
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Status;