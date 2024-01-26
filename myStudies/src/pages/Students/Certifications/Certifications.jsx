import React from "react";

import { useNavigate, useParams, Link } from "react-router-dom";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";
import paperWorkImage from "../../../assets/paper-work.png";
import NavBarOptions from "../../../components/Common/NavBarOptions";

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

        <div className="flex justify-center items-center px-6 mt-12 mb-36">
          <div className="grid grid-cols-3 mt-2 mb-2 gap-4">
            <button
              type="button"
              className="flex flex-col items-center justify-center text-center text-white font-medium bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-3xl text-base px-5 py-8 p-2 shadow-md hover:shadow-xl relative"
              onClick={handleRequest}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-12 h-12 mb-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>
              <span className="text-lg">Αίτηση για παροχή πιστοποιητικού</span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center justify-center text-center text-white font-medium bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-3xl text-base px-5 py-8 p-2 shadow-md hover:shadow-xl relative"
              onClick={handleStatus}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12 mb-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>

              <span className="text-lg">Εμφάνιση της Κατάστασης<br/> Αιτήσεων για Πιστοποιητικά</span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center justify-center text-center text-white font-medium bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-3xl text-base px-5 py-8 p-2 shadow-md hover:shadow-xl relative"
              onClick={handleHistory}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-12 h-12 mb-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <span className="text-lg">Ιστορικό Αιτήσεων</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default Certifications;