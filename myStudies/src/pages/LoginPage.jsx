import React from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <div>
      <Navbar/>
     <div className="min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
        <div className="md:w-2/4 text-left ml-4">
          <h2 className="text-5xl font-semibold leading-tight">Καλως ήρθατε</h2>
          <p className="text-lightText mt-2 text-start">
            στη διαδικτυακή γραμματεία του Εθνικού και
            Καποδιστριακού Πανεπιστιμίου Αθηνών!
          </p>
        </div>
      </div>
     <Login/>
     </div>
     <Footer/>
    </div>
  );
};

export default LoginPage;
