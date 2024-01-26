import React from "react";

import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import NavBarOptions from "../../../components/Common/NavBarOptions";
import paperWorkImage from "../../../assets/paper-work.png";

const Path = ({ id }) => {
    return (
        <nav class="flex flex-col items-center justify-center m-6">
            <ol class="flex flex-row items-center">
                <li class="flex flex-col items-center">
                    <Link to={`/student/${id}`} class="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        <span> Αρχική Σελίδα </span>
                    </Link>
                </li>
                <li class="flex flex-col items-center">
                    <div class="flex items-center justify-center">
                        <svg class="rtl:rotate-180 text-gray-500 w-3 h-3 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="text-sm text-gray-500 font-medium  dark:text-gray-400"> Πιστοποιητικά </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

const Certifications = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    
    const handleRequest = () => navigate(`/student/certifications/request/${id}`);
    const handleStatus = () => navigate(`/student/certifications/status/${id}`);
    const handleHistory = () => navigate(`/student/certifications/history/${id}`);

     return (
    <div>
      <Navbar />
      <NavBarOptions userType={"student"} userId={id} />
      <Path id={id} />

      {/* Image and buttons side by side */}
      <div className="flex justify-center items-center px-6 mt-8 mb-36">
        <div className="mr-8">
          <img className="rounded-2xl" src={paperWorkImage} alt="" />
        </div>
        <div className="grid grid-flow-row mt-2 mb-2 gap-4">
          <button
            type="button"
            className="text-center text-white font-medium bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-3xl text-base px-5 py-3 p-2 shadow-md hover:shadow-xl"
            onClick={handleRequest}
          >
            Αίτηση για παροχή πιστοποιητικού
          </button>

          <button
            type="button"
            className="text-center text-white font-medium bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-3xl text-base px-5 py-3 p-2 shadow-md hover:shadow-xl"
            onClick={handleStatus}
          >
            Εμφάνιση της κατάστασης αιτήσεων για πιστοποιητικά
          </button>

          <button
            type="button"
            className="text-center text-white font-medium bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-3xl text-base px-5 py-3 p-2 shadow-md hover:shadow-xl"
            onClick={handleHistory}
          >
            Ιστορικό Αιτήσεων
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Certifications