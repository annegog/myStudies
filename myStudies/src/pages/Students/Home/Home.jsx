import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../components/UserContext";

import Donut from "../../../components/Tools/Donut";
import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";

const Path = () => {
    return (
        <nav class="flex items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium"> Αρχική Σελίδα </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Info = ({ infoString, infoDetails }) => {
    return (
        <div className="info-container text-center w-full p-10 rounded-2xl bg-gray-50 shadow-xl hover:shadow-2xl">
            <p className="text-xl font-bold m-2"> {infoString} </p>
            <div className="grid grid-cols-1 border-gray-200 border-t">
                <div className="flex justify-between items-center pt-5"/>
                <p className="text-4xl font-light"> {infoDetails} </p>
            </div>
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [declarationInfo, setDeclarationInfo] = useState({ open: false, end_date: "", declaration: false, last_decl: "" });
    
    useEffect(() => {
        const fetchDeclarationStatus = async () => {
        try {
            if (user) {
            const response = await axios.get(`/declaration-season/${user._id}`);
            setDeclarationInfo(response.data);
            }
        } catch (error) {
            console.error("Error fetching declaration status:", error);
        }
        };

        fetchDeclarationStatus();
    }, [user]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('el-GR', options);
    };
    
    const Declare = () => {
        navigate(`/student/declarations/${user._id}`);
    };

    return (
        <div>
        <Navbar />
        <NavBarOptions userType={"student"} userId={id} />
        <Path />
        <div className="px-4 lg:px-16 xl:px-32">
            {declarationInfo.open && !declarationInfo.declaration ? (
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-800"> Έχουν ανοίξει οι δηλώσεις μαθημάτων. <br /> Όλοι οι φοιτητές καλούνται να πραγματοποιήσουν την δήλωση τους εως και τις {" "}
                        {formatDate(declarationInfo.end_date)}.
                    </h2>

                    <div className="mt-2">
                        <button type="button" className="text-center text-lg text-white font-medium bg-blue-900 hover:bg-blue-700 rounded-xl px-6 py-2 shadow-md hover:shadow-2xl"
                            onClick={Declare}
                        > Δήλωση Μαθημάτων
                        </button>
                    </div>
                </div>
            ) : declarationInfo.open && declarationInfo.declaration && (
                <div className="text-center">
                    <h2 className="text-xl font-bold text-green-500"> Έχει πραγματοποιηθεί Δήλωση Μαθημάτων στις {formatDate(declarationInfo.last_decl)}, μπορεί να γίνει τροποποίηση της. </h2>
                    <h2 className="text-xl font-bold text-red-800"> Η γραμματεία θα λάβει υπόψη της μόνο την τελευταία Δήλωση. </h2>

                    <div className="mt-3 md:justify-items-center">
                        <button type="button" className="text-center text-lg text-white font-medium bg-blue-900 hover:bg-blue-700 rounded-xl px-6 py-2 shadow-md hover:shadow-2xl"
                            onClick={Declare}
                        > Τροποποίηση Δήλωσης Μαθημάτων
                        </button>
                    </div>
                </div>
            )}
        </div>

        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 md:px-16 xl:px-32">
                <Donut ects={user.ects} />
                <div className="flex flex-col justify-center items-center space-y-20">
                    <Info infoString={"Μέσος Όρος"} infoDetails={7.32} />
                    <Info infoString={"Περασμένα Μαθήματα"} infoDetails={user.s_courses} />
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Home;