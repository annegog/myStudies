import React from "react";
import Footer from "../components/Footer";
import NestedList from "../components/NestedList";
import Navbar from "../components/Navbar_students";
import SecondNavbar from "../components/SecondNavbar";

export default function Courses() {
    return (
        <div>
            <Navbar />
            <SecondNavbar />
            <div className="mt-10 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32">
                <h2 className="text-2xl font-thin justify-center text-center mb-1">Πρόγραμμα Σπουδών</h2>
                <NestedList />
            </div>
            <Footer />
        </div>
    )
}