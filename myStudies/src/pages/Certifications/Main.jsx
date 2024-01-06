import React from "react";

// import { useHistory } from 'react-router-dom';

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar_students";
import NavBarOptions from "../../components/NavBarOptions";

const Certifications = () => {
    // const history = useHistory();

    // const Request = () => {
    //     history.push("/student/certifications/request");
    // };

    // const Status = () => {
    //     history.push("/student/certifications/status");
    // };

    // const History = () => {
    //     history.push("/student/certifications/history");
    // };

    return (
        <div>
            <Navbar/>
            <NavBarOptions userType = "student"/>
            <div className="mt-16 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 mb-36">
                <div className="grid grid-flow-row justify-center mt-2 mb-2 gap-4">
                    <button 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base px-4 py-3 text-center"
                        // onClick={Request}
                    >
                        Αίτηση για παροχή πιστοποιητικού
                    </button>

                    <button 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base px-4 py-3 text-center"
                        // onClick={Status}
                    > 
                        Εμφάνιση της κατάστασης αιτήσεων για πιστοποιητικά 
                    </button>

                    <button 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base px-4 py-3 text-center"
                        // onClick={History}
                    > 
                        Ιστορικό Αιτήσεων
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Certifications;