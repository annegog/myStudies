import React from "react";
import axios from "axios";

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import universityLogo from "../../assets/UniLogo.png";

import { UserContext } from "../UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleChange = () => {
    setMenu(!menu);
  };

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/login");
  }
  return (
    <nav className="bg-blue-200 items-center w-full z-30 top-0 relative">
      <div className="flex items-center justify-between p-5 px-5 md:px-32 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-b-xl">
        <div className="flex items-center">
          <img
            loading="lazy"
            src={universityLogo}
            alt="University Logo"
            className="h-20 w-auto mr-3"
          />
          <div>
            <Link to={user ? `/${user.role}/${user._id}` : "/login"} className="font-semibold text-2xl p-1 cursor-pointer">
              {" "}
              myStudies{" "}
            </Link>
            <div className="text-xs leading-none text-left p-1">
              <p> ΕΘΝΙΚΟ & ΚΑΠΟΔΙΣΤΡΙΑΚΟ ΠΑΝΑΠΙΣΤΉΜΙΟ ΑΘΗΝΩΝ </p>
            </div>
          </div>
        </div>

        {user && (
          <div className="hidden md:justify-items-end md:flex gap-5 font-medium p-1 text-center my-auto text-lg flex-col items-stretch w-[48%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex items-stretch justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:mt-10">
              <div className="text-black text-center text-lg font-medium my-auto">
                {user.role === "student" && (
                  <Link
                    to="/student/`$user._id`"
                    className="hover:text-[#3f6591] transition-all cursor-pointer"
                  >
                    Αρχική Σελίδα
                  </Link>
                )}
                {user.role === "professor" && (
                  <Link
                    to="/professor/`$user._id`"
                    className="hover:text-[#3f6591] transition-all cursor-pointer"
                  >
                    Αρχική Σελίδα
                  </Link>
                )}
              </div>

              <div className="text-black text-center text-lg font-medium my-auto">
                {user.role === "student" && (
                  <Link
                    to="/student/profile"
                    className="hover:text-[#3f6591] transition-all cursor-pointer"
                  >
                    {user.username}
                  </Link>
                )}
                {user.role === "professor" && (
                  <Link
                  to="/professor/profile"
                  className="hover:text-[#3f6591] transition-all cursor-pointer"
                >
                  {user.username}
                </Link>
                )}
              </div>

              <div className="flex items-end md:justify-items-end gap-5">
                <button
                  type="button" onClick={logout}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Αποσύνδεση
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
