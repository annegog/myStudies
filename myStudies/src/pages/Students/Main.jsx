import React from "react";
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import Donut from "../../components/Tools/Donut";
import NavBarOptions from "../../components/Common/NavBarOptions";

import { UserContext } from "../../components/UserContext";

const MainPage = () => {
  const [declarationInfo, setDeclarationInfo] = useState({
    open: false,
    end_date: '',
    declaration: false,
    last_decl: '',
  });

  const { user } = useContext(UserContext);
  const {id} = useParams();

  const navigate = useNavigate();

  const Declare = () => {
      navigate('/student/declarations');
  };

  // const Modification = () => {
  //     navigate("");
  // };

  useEffect(() => {
    const fetchDeclarationStatus = async () => {
      try {
        if (user) {
          const response = await axios.get(`/declaration-season/${user._id}`);
          setDeclarationInfo(response.data);
          // console.log(user, response.data);
        }
      } catch (error) {
        console.error('Error fetching declaration status:', error);
      }
    };
  
    fetchDeclarationStatus();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', options);
};

  return (
    <div>
      <Navbar/>
      <NavBarOptions userType={"student"} />
      <div className="mt-10 px-4 lg:px-16 xl:px-32">
        {declarationInfo.open && !declarationInfo.declaration && (
          <div className="justify-center items-center text-center">
            <h2 className="text-xl font-semibold leading-none text-orange-400 pe-1">
              Έχουν ανοίξει οι δηλώσεις μαθημάτων. <br /> Όλοι οι φοιτητές
              καλούνται να πραγματοποιήσουν την δήλωση τους εως και τις{" "}
              {formatDate(declarationInfo.end_date)}.
            </h2>

            <div className="mt-2 md:justify-items-center gap-5">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-lg px-6 py-2 text-center"
                onClick={Declare}
              >
                Δήλωση Μαθημάτων
              </button>
            </div>
          </div>
        )}

        {declarationInfo.open && declarationInfo.declaration && (
          <div className="justify-center items-center text-center">
            <h2
              style={{ marginTop: "0.5rem" }}
              className="text-xl font-semibold leading-none text-green-400 pe-1"
            >
              Έχει πραγματοποιηθεί Δήλωση Μαθημάτων στις {declarationInfo.last_decl}, μπορεί να
              γίνει τροποποίηση της.
            </h2>

            <h2 style={{ marginTop: "0.5rem" }}
              className="text-xl font-bold leading-none text-red-800 pe-1">
              Η γραμματεία θα λάβει υπόψη της μόνο την τελευταία Δήλωση.
            </h2>

            <div style={{ marginTop: "0.5rem" }} className="mt-2 md:justify-items-center gap-5">
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
        <Donut ects={user.ects} />
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
                <p className="text-lg"> {user.s_courses} </p>
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