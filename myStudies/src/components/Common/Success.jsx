import React from "react";

import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import NavBarOptions from "../../components/Common/NavBarOptions";

const Success = () => {
    return (
        <div className="Success">
            <Navbar/>
            <NavBarOptions userType="student"/> {/* Instead of student string, giving the studentData.status */}
            <main className="Main Context of Success">
                <div className="font-bold">

                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Success;