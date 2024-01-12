import React from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NavBarOptions from "../../components/NavBarOptions";

const Status = () => {
    return (
        <div>
            <Navbar/>
            <NavBarOptions userType="student"/>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4"> Certification History Page </h2>
            </div>
            <Footer/>
        </div>
    );
};

export default Status;