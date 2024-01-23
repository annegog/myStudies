import React from "react";

import Login from "../../components/Login";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";

const LoginPage = () => {
    return (
        <div className="bg-gray-50">
            <Navbar/>
            <main className="Main Login">
                <div className="min-h-[70vh]">
                    <div className="flex flex-col items-center md:flex-row md:justify-between md:mx-32 m-10">
                        <div className="text-left md:w-2/4">
                            <h className="text-5xl font-semibold leading-tight"> Καλως ήρθατε </h>
                            <h2 className="text-light text-start"> στη δικτυακή περιοχή των γραμματειών του Εθνικού και Καποδιστριακού Πανεπιστημίου Αθηνών </h2>
                        </div>
                    </div>
                    <Login/>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default LoginPage;