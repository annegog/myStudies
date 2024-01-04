import React from "react";
import Navbar from "../components/Navbar_students";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import Donut from "../components/Donut";

export default function MainPageS() {
  return (
    <div>
      <Navbar />
      <SecondNavbar />
      <div className="mt-20 px-4 lg:px-16 xl:px-32">
        {" "}
        {/* Adjusted top margin and padding for responsiveness */}
        {/* Your other content goes here */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:px-16 xl:px-32">
        <Donut />
        <div className=" justify-center items-center space-y-6">
          <div className="p-8 bg-white rounded-lg text-center mt-8">
            <h2 className="text-xl font-bold leading-none text-gray-900 pe-1 mb-2">
              Μέσος Όρος
            </h2>
            <div class="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
              <div class="flex justify-between items-center pt-5"></div>
              <p className="text-lg">6.48</p>
            </div>
          </div>
          <div className="p-8 bg-white rounded-lg text-center">
            <h2 className="text-xl font-bold leading-none text-gray-900 pe-1 mb-2">
              Περασμένα Μαθήματα
            </h2>
            <div class="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
              <div class="flex justify-between items-center pt-5"></div>
              <p className="text-lg">4</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
