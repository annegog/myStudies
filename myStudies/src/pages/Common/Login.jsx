import React from "react";
import "../../index.css"
import Login from "../../components/Login";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import "../../index.css"

const LoginPage = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[70vh]">
                <div className="flex flex-col items-center md:flex-row md:justify-between md:mx-32 m-10">
                    <div className="text-left md:w-2/4">
                        <h1 className="text-5xl font-semibold leading-tight animated-text">
                            Καλώς ήρθατε
                        </h1>
                        <h2 className="text-light text-start animated-text">
                            στη δικτυακή περιοχή των γραμματειών του Εθνικού και Καποδιστριακού Πανεπιστημίου Αθηνών
                        </h2>
                    </div>
                </div>
                <Login />
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;