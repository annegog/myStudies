import * as React from "react";
import Navbar_students from "../components/Navbar_students";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";

export default function Grades(props) {
  return (
    <div>
      <Navbar_students />
      <SecondNavbar />
      <div className="flex flex-col items-center">
        <div className="bg-zinc-300 bg-opacity-40 flex w-[496px] max-w-full items-stretch justify-between gap-5 px-7 py-2.5 mt-2 rounded-3xl max-md:flex-wrap max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e821474ed44d18c4fa95b312b144fbe9a1723c4a3ec9419b7351b809018fa96?"
            className="aspect-[0.85] object-contain object-center w-[22px] overflow-hidden shrink-0 max-w-full"
          />
          <div className="justify-center text-stone-400 text-center text-xl font-medium self-center w-[366px] my-auto">
          <input placeholder="Αναζήτηση Μαθημάτος" className="bg-transparent bg-opacity-40 text-center text-xl font-medium"></input>
          </div>
        </div>
        {/* <div className="self-stretch flex w-full items-start justify-between gap-5 mt-3 px-5 max-md:max-w-full max-md:flex-wrap">
          <div className="self-stretch flex basis-[0%] flex-col items-start">
            <div className="justify-center text-black text-center text-base font-medium whitespace-nowrap ml-2.5">
              Προσπάθειες:
            </div>
            <div className="bg-sky-900 bg-opacity-60 flex items-stretch justify-between gap-5 mt-1.5 pl-20 pr-5 py-2 rounded-3xl max-md:pl-5">
              <div className="text-white text-center text-xl font-medium">
                Όλες
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/20ca0acdaff4e2b82e8b347ff04ff1e818bebe77ff92385d246fcf9e096a37ba?"
                className="aspect-[1.5] object-contain object-center w-6 overflow-hidden shrink-0 max-w-full self-start"
              />
            </div>
          </div>
          <div className="flex grow basis-[0%] flex-col items-stretch self-start">
            <div className="text-black text-center text-base font-medium">
              Εξεταστική Περίοδος:{" "}
            </div>
            <div className="bg-sky-900 bg-opacity-60 flex items-stretch justify-between gap-5 mt-1.5 pl-20 pr-5 py-2 rounded-3xl max-md:pl-5">
              <div className="text-white text-center text-xl font-medium">
                Όλες
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/20ca0acdaff4e2b82e8b347ff04ff1e818bebe77ff92385d246fcf9e096a37ba?"
                className="aspect-[1.5] object-contain object-center w-6 overflow-hidden shrink-0 max-w-full self-start"
              />
            </div>
          </div>
          <div className="flex grow basis-[0%] flex-col self-start items-start max-md:max-w-full">
            <div className="text-black text-center text-base font-medium whitespace-nowrap ml-5 max-md:ml-2.5">
              Επιλεγμένα Μαθήματα
            </div>
            <div className="bg-sky-900 bg-opacity-60 self-stretch flex w-full items-stretch justify-between gap-5 mt-1.5 pl-5 pr-3.5 py-1 rounded-3xl max-md:max-w-full max-md:flex-wrap">
              <div className="bg-zinc-300 bg-opacity-50 flex items-stretch justify-between gap-4 px-3.5 py-1.5 rounded-3xl">
                <div className="text-white text-center text-xl font-medium">
                  Όλα
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bb43701a230c1e642df34da4331f567ea2ca9221efe319d49852430fbbedf7a?"
                  className="aspect-[1.08] object-contain object-center w-3.5 overflow-hidden shrink-0 max-w-full self-start"
                />
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/20ca0acdaff4e2b82e8b347ff04ff1e818bebe77ff92385d246fcf9e096a37ba?"
                className="aspect-[1.5] object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
              />
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/770cc29548157d366e309a45f0770e240ec867d9e1fe3706bb3efa723bb9b5a8?"
            className="aspect-[1.16] object-contain object-center w-11 overflow-hidden shrink-0 max-w-full mt-2.5 self-start"
          />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
