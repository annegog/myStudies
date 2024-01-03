import React, { useState } from "react";
import { Link } from "react-scroll";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/uni_logo.png";

const Navbar_students = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <nav class="bg-blue-200 items-center w-full z-30 top-0 relative">
      <div className="flex flex-row justify-between p-5 px-5 md:px-32 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="text-justify">
          <Link to="/" className=" font-semibold text-2xl p-1 cursor-pointer">
            myStudies
          </Link>
          <div className="text-xs leading-none text-left p-1">
            <p>ΕΘΝΙΚΟ & ΚΑΠΟΔΙΣΤΡΙΑΚΟ ΠΑΝΑΠΙΣΤΉΜΙΟ ΑΘΗΝΩΝ</p>
          </div>
        </div>

        <div className="hidden items-end md:justify-items-end md:flex gap-5 font-medium p-1 text-lg">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#3f6591] transition-all cursor-pointer"
          >
            Αρχική Σελίδα
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#3f6591] transition-all cursor-pointer"
          >
            Profile
          </Link>
        </div>

        <div className="flex items-end md:justify-items-end gap-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Αποσύνδεση
          </button>
        </div>

        <div className="flex md:hidden" onClick={handleChange}>
          <div className="p-2">
            <AiOutlineMenu size={22} />
          </div>
        </div>
      </div>

      <div
        className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col absolute bg-[#ffffff] left-0 top-20 font-medium text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 z-50`}
      >
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-[#3f6591] transition-all cursor-pointer"
        >
          Αρχική Σελίδα
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-[#3f6591] transition-all cursor-pointer"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar_students;
