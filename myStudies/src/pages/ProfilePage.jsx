import React from "react";
import Navbar from "../components/Navbar_students";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <SecondNavbar />
      <div className="mt-16 justify-center items-center md:justify-items-center gap-5 px-6 lg:px-16 xl:px-32 mb-36">
        <div className="border border-spacing-2 border-gray-700 rounded-xl p-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-10 h-10 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div className=" mr-6">aaaaaaaaa</div>
          <div>alallala</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
