import React from "react";

import { useParams } from "react-router-dom";

import Footer from "../../../components/Common/Footer";
import Navbar from "../../../components/Common/Navbar";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Status = () => {
    const { id } = useParams();
    return (
        <div>
            <Navbar />
            <NavBarOptions userType="student" userId={id} />
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4"> Certification Status Page </h2>
            </div>
            <Footer />
        </div>
    );
};

export default Status;