import React from "react";

import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import NavBarOptions from "../components/NavBarOptions";
import Navbar_students from "../components/Navbar_students";

const Grades = () => (
    <div className="flex flex-col items-start">
        <div className="flex justify-between gap-5 px-5 items-start">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/de527f15c9662b2292577c3def0117663c8f379b5d2d0704aa16ba70c1879390?"
                className="aspect-[1.77] object-contain object-center w-[23px] overflow-hidden shrink-0 max-w-full"
            />
            <div className="justify-center text-stone-400 text-opacity-80 text-xl font-medium grow shrink basis-auto mt-1"> ΙΣΤΟΡΙΚΟ ΒΑΘΜΟΛΟΓΙΩΝ </div>
        </div>

        <div className="bg-zinc-300 bg-opacity-10 self-stretch flex w-full items-stretch justify-between gap-5 mt-2.5 pr-20 pt-4 pb-10 rounded-3xl max-md:max-w-full max-md:flex-wrap max-md:pr-5">
            <div className="flex grow basis-[0%] flex-col max-md:max-w-full">
                <div className="self-stretch flex items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d72f8cd748adade737b8d69791bf9394f6156cee12ad730b1f26d36b96147371?"
                        className="aspect-[1.6] object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
                    />
                    <div className="justify-center text-black text-xl font-medium self-stretch grow shrink basis-auto max-md:max-w-full"> Εξεταστική Εαρινού Εξάμηνου 2024 - 2025 </div>
                </div>

                <div className="self-stretch flex flex-col items-stretch mt-5 pl-9 max-md:max-w-full max-md:pl-5">
                    <div className="justify-center text-orange-700 text-xl font-medium max-md:max-w-full"> Ηλεκτρομαγνητισμός, Οπτική, Σύγχρονη Φυσική (2ο) </div>
                    <div className="justify-center text-green-500 text-xl font-medium ml-3 mt-5 max-md:max-w-full"> Δομές δεδομένων και Τεχνικές Προγραμματισμού (2ο) </div>
                    <div className="justify-center text-orange-700 text-xl font-medium w-[615px] ml-3 mt-5 self-start max-md:ml-2.5"> Ανάλυση Ι (2ο) </div>
                    <div className="justify-center text-green-500 text-xl font-medium ml-3 mt-5 self-start max-md:ml-2.5"> Αρχιτεκτονική Υπολογιστών (2ο) </div>
                </div>
                
                <div className="self-stretch flex justify-between gap-5 mt-8 items-start max-md:max-w-full max-md:flex-wrap">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8da8b5dba2c8f8fd9699954293c7ebce6a53b360a6bac6f0cd2fa44812fce204?"
                        className="aspect-[1.5] object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="justify-center text-black text-xl font-medium grow shrink basis-auto max-md:max-w-full"> Εξεταστική Χειμερινού Εξάμηνου 2024 - 2025 </div>
                </div>

                <div className="flex flex-col items-stretch ml-12 mt-5 self-start max-md:ml-2.5">
                    <div className="justify-center text-green-500 text-xl font-medium"> Λογική Σχεδίαση (1ο) </div>
                    <div className="justify-center text-green-500 text-xl font-medium mt-5"> Γραμμική Άλγεβρα (1ο) </div>
                    <div className="justify-center text-red-400 text-xl font-medium mt-3"> Διακριτά Μαθηματικά (1ο) </div>
                </div>
            </div>

            <div className="flex basis-[0%] flex-col items-stretch mt-10 self-end max-md:hidden max-md:mt-10">
                <div className="justify-center text-orange-700 text-xl font-medium whitespace-nowrap"> 4 </div>
                <div className="justify-center text-green-500 text-xl font-medium whitespace-nowrap mt-6"> 6 </div>
                <div className="justify-center text-red-500 text-xl font-medium whitespace-nowrap mt-6"> 3 </div>
                <div className="justify-center text-green-500 text-xl font-medium whitespace-nowrap mt-6"> 7 </div>
                <div className="text-green-500 text-xl font-medium whitespace-nowrap mt-20 max-md:mt-10"> 8 </div>
                <div className="text-green-500 text-xl font-medium whitespace-nowrap mt-6"> 7 </div>
                <div className="justify-center text-red-500 text-xl font-medium whitespace-nowrap mt-4"> 2 </div>
            </div>
        </div>
    </div>
);

const Selection = ({title, description, imageSrc, secondImageSrc, customClass = ""}) => (
    <div className={`flex grow basis-[0%] flex-col items-stretch self-start ${customClass}`}>
        <div className="text-black text-center text-base font-medium">
            {title}:
        </div>

        <div className={`bg-sky-900 bg-opacity-60 flex items-stretch justify-between gap-5 mt-1.5 pl-5 pr-3.5 py-1 rounded-3xl max-md:max-w-full max-md:flex-wrap ${customClass}`}>
            <div className="bg-zinc-300 bg-opacity-50 flex items-stretch justify-between gap-4 px-3.5 py-1.5 rounded-3xl">
                <div className="text-white text-center text-xl font-medium">
                    {description}
                </div>
                
                <img
                    loading="lazy"
                    src={imageSrc}
                    className="aspect-[1.08] object-contain object-center w-3.5 overflow-hidden shrink-0 max-w-full self-start"
                />
            </div>

            {secondImageSrc && (
                <img
                    loading="lazy"
                    src={secondImageSrc}
                    className="aspect-[1.5] object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
            )}
        </div>
    </div>
);
  
const Options = () => (
    <div style={{marginTop: "1rem"}} className="self-stretch flex w-full items-start justify-between gap-5 mt-3 px-5 max-md:max-w-full max-md:flex-wrap">
        <Selection title="Προσπάθειες" description="Όλες" imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/20ca0acdaff4e2b82e8b347ff04ff1e818bebe77ff92385d246fcf9e096a37ba?" customClass="ml-2.5" />
        <Selection title="Εξεταστική Περίοδος" description="Όλες" imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/20ca0acdaff4e2b82e8b347ff04ff1e818bebe77ff92385d246fcf9e096a37ba?" customClass="pl-20" />
        <Selection title="Επιλεγμένα Μαθήματα" description="Όλα" imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/1bb43701a230c1e642df34da4331f567ea2ca9221efe319d49852430fbbedf7a?" secondImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/20ca0acdaff4e2b82e8b347ff04ff1e818bebe77ff92385d246fcf9e096a37ba?" />
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7e2529cf5c2d095d47c796e0e94cbdce44bce8f6fa83633ba3755ed89f821c3?"
            className="aspect-[1.12] object-contain object-center w-[55px] overflow-hidden self-stretch shrink-0 max-w-full"
        />
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6371e434ecc5d20794223b705b7e6081bd4a11c69646ba3e7f3852647b143cda?"
            className="aspect-[1.16] object-contain object-center w-11 overflow-hidden self-center shrink-0 max-w-full my-auto"
        />
    </div>
);

const GradePage = () => {
    return (
        <div>
            <Navbar_students/>
            <NavBarOptions userType={"student"}/>
            <SearchBar searchString={"Αναζήτηση Μαθημάτος"}/>
            <Options/>
            <Grades/>
            <Footer/>
        </div>
    );
}

export default GradePage;