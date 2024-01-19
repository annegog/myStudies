import React from "react";
import axios from "axios";

import { useEffect, useState, useContext } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NavBarOptions from "../../components/NavBarOptions";

import { UserContext } from "../../components/UserContext";

const ProfilePage = () => {
    const { user } = useContext(UserContext);

    const name = "Δημήτρης Αντωνίου";
    const email = "sdi2400001@di.uoa.gr";
    const status = "Εκπαιδευόμενος";

    const ID = "1115202400001";
    const univeristy = "Πληροφορικής και Τηλεπικοινωνιών";
    const registrationDate = "Δευτέρα, 30 Σεπτεμβρίου 2024 - 10:00 π.μ."

    const [activeInfo, setActiveInfo] = useState(null);
    const [showInfoFilters, setShowInfoFilters] = useState(false);        // State to toggle info filter visibility
    const [showMoreInfoFilters, setShowMoreInfoFilters] = useState(false);

    const toggleInfo = (info) => {
        setActiveInfo(activeInfo === info ? null : info);
    };

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user profile data on mount
        axios.get('http://localhost:4000/student/profile', { withCredentials: true }) // withCredentials for cookies if needed
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data:', error);
            });
    }, []); // Empty array means it only runs once when the component mounts

    if (!userData) {
        return <div>Loading...</div>; // Or any other loading state representation
    }
    
    return (
        <div>
            <Navbar/>
            <NavBarOptions userType={"student"} />
            <div className="mt-4 px-4 lg:px-16 w-full">

                <div className="bg-zinc-300 rounded-3xl p-4 flex flex-wrap justify-between items-center">
                    <div className="object-contain object-center w-[120px] overflow-hidden shrink-0 max-w-full mt-2 rounded-[50%]">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </div>
                    <div className="flex-shrink-0 w-full lg:w-auto text-center lg:text-left">
                        {/* SVG Icon here */}
                    </div>
                    <div className="mt-4 lg:mt-0 flex-grow text-center lg:text-left">
                        <h2 className="text-black text-xl font-light">Όνομα: {userData.first_name}</h2>
                        <h2 className="mt-2 text-black text-xl font-light">E-mail: {userData.email}</h2>
                        <h2 className="mt-2 text-black text-xl font-light"> Ιδιότητα: {userData.role} </h2>
                    </div>
                    <div className="mt-4 lg:mt-0 flex-grow text-center lg:text-left">
                        <h2 className="text-black text-xl font-light">Αριθμός μητρώου: {userData.am}</h2>
                        <h2 className="mt-2 text-black text-xl font-light">Σχολή - Τμήμα: {userData.ID_location}</h2>
                        <h2 className="mt-2 text-black text-xl font-light">Μέλος από: {registrationDate}</h2>
                    </div>
                </div>

                <div style={{ marginTop: "2rem" }} className="flex w-[1200px] max-w-full items-stretch justify-between max-md:flex-wrap">
                    <div className="flex justify-between gap-5 items-start">
                        <div className="text-black text-xl cursor-pointer font-medium self-stretch grow shrink basis-auto" onClick={() => setShowInfoFilters(!showInfoFilters)}>
                            <span>{showInfoFilters ? "▲" : "▼"} Προσωπικά Στοιχεία </span>
                            {showInfoFilters && (
                                <div style={{ marginTop: "2rem" }} className="bg-zinc-300 grow bg-opacity-50 flex flex-col justify-center items-center px-auto py-auto rounded-lg max-md:px-5 max-md:pr-5">
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap"> Όνομα Πατέρα: {userData.father} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Όνομα Μητέρας: {userData.mother} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Ημερομηνία Γέννησης: {userData.birth_date} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Οικογενειακή Κατάσταση: {userData.family} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Αριθμός Αδελφών: {userData.siblings} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Εκπλήρωση Στρατιωτικής Θητείας: {userData.army}  </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Πόλη/Χωριό Γέννησης: {userData.birth_location} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Αριθμός Ταυτότητας:{userData.ID} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Εκδούσα Αρχή: {userData.ID_location} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> AMKA: {userData.AMKA} </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between gap-5 items-start">
                        <div className="text-black text-xl cursor-pointer font-medium self-stretch grow shrink basis-auto" onClick={() => setShowMoreInfoFilters(!showMoreInfoFilters)}>
                            <span>{showMoreInfoFilters ? "▲" : "▼"} Πληροφορίες Επικοινωνίας </span>
                            {showMoreInfoFilters && (
                                <div style={{ marginTop: "2rem" }} className="bg-zinc-300 grow bg-opacity-50 flex flex-col w-full h-full justify-center items-center px-auto py-auto rounded-lg max-md:px-5 max-md:pr-5">
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap"> Μόνιμη Διεύθυνση Κατοικίας: {userData.home} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Μόνιμη Πόλη Κατοικίας: {userData.city} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Τηλέφωνο Μόνιμης Κατοικίας: {userData.temp_phone} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> ΤΚ Μόνιμης Κατοικίας: {userData.postal} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Προσωρινή Διεύθυνση Κατοικίας: {userData.temp_home} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Προσωρινή Πόλη Κατοικίας: {userData.temp_city} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Τηλέφωνο Προσωρινής Κατοικίας:{userData.temp_phone} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> ΤΚ Προσωρινής Κατοικίας: {userData.postal_temp} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Διεύθυνση Ηλεκτρονικού Ταχυδρομείου: {userData.email} </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default ProfilePage;