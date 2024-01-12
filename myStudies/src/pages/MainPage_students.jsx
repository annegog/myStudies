import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Donut from "../components/Donut";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavBarOptions from "../components/NavBarOptions";
import { UserContext } from "../components/UserContext";

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [end_date, setEnd_date] = useState("01/04/2024");
  const [declaration, setDeclaration] = useState(false);
  const last_decl = "18/03/2025";
  const [username, setUsername] = useState("ela");

  const { user } = useContext(UserContext);
  const {id} = useParams();

  // const navigate = useNavigate();

  // const Declare = () => {
  //     navigate("");
  // };

  // const Modification = () => {
  //     navigate("");
  // };

  useEffect(() => {
    if (id) {
      // axios.get("/student/" + id).then((response) => {
      //   console.log(response);
      //   setUsername(response.data.username);
      //   console.log(username);
      // });
    }
  }, [id]);

  return (
    <div>
      <Navbar/>
      <NavBarOptions userType={"student"} />
      <div className="mt-10 px-4 lg:px-16 xl:px-32">
        {open && !declaration && (
          <div className="justify-center items-center text-center">
            <h2 className="text-xl font-semibold leading-none text-orange-400 pe-1">
              Έχουν ανοίξει οι δηλώσεις μαθημάτων. <br /> Όλοι οι φοιτητές
              καλούνται να πραγματοποιήσουν την δήλωση τους εως και τις{" "}
              {end_date}.
            </h2>

            <div className="mt-2 md:justify-items-center gap-5">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-lg px-6 py-2 text-center"
                // onClick={Declare}
              >
                Δήλωση Μαθημάτων
              </button>
            </div>
          </div>
        )}

        {open && declaration && (
          <div className="justify-center items-center text-center">
            <h2
              style={{ marginTop: "0.5rem" }}
              className="text-xl font-semibold leading-none text-green-400 pe-1"
            >
              Έχει πραγματοποιηθεί Δήλωση Μαθημάτων στις {last_decl}, μπορεί να
              γίνει τροποποίηση της.
            </h2>

            <h2
              style={{ marginTop: "0.5rem" }}
              className="text-xl font-bold leading-none text-red-800 pe-1"
            >
              Η γραμματεία θα λάβει υπόψη της μόνο την τελευταία Δήλωση.
            </h2>

            <div
              style={{ marginTop: "0.5rem" }}
              className="mt-2 md:justify-items-center gap-5"
            >
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-lg px-6 py-2 text-center"
                // onClick={Modification}
              >
                Τροποποίηση Δήλωσης Μαθημάτων
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 md:px-16 xl:px-32">
          <Donut />
          <div className="flex flex-col justify-center items-center space-y-20">
            <div
              style={{ width: "100%" }}
              className="p-10 bg-white rounded-lg text-center mt-5"
            >
              <h2 className="text-xl font-bold leading-none text-gray-900 pe-1 mb-5">
                Μέσος Όρος
              </h2>
              <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
                <div className="flex justify-between items-center pt-5"></div>
                <p className="text-lg"> 6.48 </p>
              </div>
            </div>

            <div
              style={{ width: "100%" }}
              className="p-10 bg-white rounded-lg text-center"
            >
              <h2 className="text-xl font-bold leading-none text-gray-900 pe-1 mb-2">
                Περασμένα Μαθήματα
              </h2>
              <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
                <div className="flex justify-between items-center pt-5"></div>
                <p className="text-lg"> 4 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;