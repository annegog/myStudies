import React from "react";

import { useState } from "react";

import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import NavBarOptions from "../../../components/NavBarOptions";

const Grades = () => {
    return (
        <div>
            <Navbar/>
            <NavBarOptions userType={"professor"}/>


            <Footer/>
        </div>
    );
};

export default Grades;