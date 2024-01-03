import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/uni_logo.png";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <div className="flex flex-row justify-between p-5 px-5 md:px-32 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="text-justify">
          <Link to="/" className=" font-semibold text-2xl p-1 cursor-pointer">
            myStudies
          </Link>
          <div className="text-xs leading-none text-left p-1">
            <p>ΕΘΝΙΚΟ & ΚΑΠΟΔΙΣΤΡΙΑΚΟ ΠΑΝΑΠΙΣΤΉΜΙΟ ΑΘΗΝΩΝ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
