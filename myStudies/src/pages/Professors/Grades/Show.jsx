import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Create = () => {
    return (
        <div>
            <Navbar/>
            <NavBarOptions userType={"professor"}/>
            
            <Footer/>
        </div>
    );
};

export default Create;