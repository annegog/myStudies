import React from "react";
import Navbar from "../components/Navbar_students";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import Donut from "../components/donut";

export default function MainPageS() {
  return (
    <div>
      <Navbar />
      <SecondNavbar />
      <div className="mt-32"> {/* Added top margin to create space below SecondNavbar */}
        {/* Your other content goes here */}
      </div>
      <Donut />
      <Footer />
    </div>
  );
}
