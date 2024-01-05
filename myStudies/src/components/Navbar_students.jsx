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

        <div className="hidden md:justify-items-end md:flex gap-5 font-medium p-1 text-center my-auto text-lg flex-col items-stretch w-[48%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex items-stretch justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <div className="text-black text-center text-lg font-medium my-auto">
              <Link
                to="/student"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:text-[#3f6591] transition-all cursor-pointer"
              >
                Αρχική Σελίδα
              </Link>
            </div>
            <div className="text-black text-center text-lg font-medium my-auto">
              <Link
                to="/student/profile"
                spy={true}
                smooth={true}
                duration={500}
                className="hover:text-[#3f6591] transition-all cursor-pointer"
              >
                username
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
          </div>
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

{
  /* <div className="bg-zinc-300 z-[1] w-full pl-1.5 pr-10 pb-3 rounded-none max-md:max-w-full max-md:pr-5"> */
}
// <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//           <div className="flex flex-col items-stretch w-[52%] max-md:w-full max-md:ml-0">
//             <div className="grow max-md:max-w-full max-md:mt-10">
//               <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//                 <div className="flex flex-col items-stretch w-[32%] max-md:w-full max-md:ml-0">
//                   <div className="flex grow flex-col items-center max-md:mt-10">
//                     <img
//                       loading="lazy"
//                       srcSet="..."
//                       className="aspect-[0.66] object-contain object-center w-[71px] overflow-hidden max-w-full"
//                     />
//                     <div className="text-black text-center text-xs font-medium self-stretch">
//                       ΕΘΝΙΚΟΝ & ΚΑΠΟΔΙΣΤΡΙΑΚΟΝΠΑΝΕΠΙΣΤΗΜΙΟ ΑΘΗΝΩΝ
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-stretch w-[68%] ml-5 max-md:w-full max-md:ml-0">
//                   <div className="flex flex-col items-stretch my-auto max-md:mt-10">
//                     <div className="justify-center text-black text-4xl font-light">
//                       My Studies
//                     </div>
//                     <div className="justify-center text-black text-center text-xl font-light whitespace-nowrap mt-1.5">
//                       Γραμματείες Πανεπιστημίου Αθηνών
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-stretch w-[48%] ml-5 max-md:w-full max-md:ml-0">
//             <div className="flex items-stretch justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap max-md:mt-10">
//               <div className="text-black text-center text-lg font-medium my-auto">
//                 ΑΡΧΙΚΗ ΣΕΛΙΔΑ
//               </div>
//               <div className="text-black text-center text-lg font-medium my-auto">
//                 sdi202400001
//               </div>
//               <div className="justify-center text-white text-center text-xl font-medium whitespace-nowrap bg-sky-900 grow items-stretch pt-5 pb-3 px-7 rounded-xl max-md:px-5">
//                 Αποσύνδεση
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
