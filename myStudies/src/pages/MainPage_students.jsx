import React from "react";
import Navbar from "../components/Navbar_students";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import Donut from "../components/Donut";

export default function MainPageS() {

  const end_date = '01/04/2024';
  const last_decl = '18/03/2025';
  const open = true;
  const dilosi = false;

  return (
    <div>
      <Navbar />
      <SecondNavbar />
      <div className="mt-10 px-4 lg:px-16 xl:px-32">
        {open && !dilosi && (
          <div className="justify-center items-center text-center">
            <h2 className="text-xl font-semibold leading-none text-orange-400 pe-1 ">
              Έχουν ανοίξει οι δηλώσεις μαθημάτων.
              <br />
              Όλοι οι φοιτητές καλούνται να πραγματοποιήσουν την δήλωση τους εως
              και τις {end_date}.
            </h2>
            <div className="mt-2 md:justify-items-center gap-5">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-lg px-6 py-2 text-center"
              >
                Δήλωση Μαθημάτων
              </button>
            </div>
          </div>
        )}
        {open && dilosi && (
          <div className="justify-center items-center text-center">
          <h2 className="text-xl font-semibold leading-none text-green-400 pe-1 ">
          Έχει πραγματοποιηθεί Δήλωση Μαθημάτων στις {last_decl}, μπορεί να γίνει τροποποίηση της.
          </h2>
          <h2 className="text-xl font-bold leading-none text-red-800 pe-1 ">Η γραμματεία θα λάβει υπόψη της μόνο την τελευταία Δήλωση.
</h2>
          <div className="mt-2 md:justify-items-center gap-5">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-lg px-6 py-2 text-center"
            >
              Τροποποίηση Δήλωσης Μαθημάτων
            </button>
          </div>
        </div>
        )}
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
