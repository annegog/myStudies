import React from "react";

import { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar_students";
import NavBarOptions from "../components/NavBarOptions";
import axios from 'axios'; // assuming you're using axios for HTTP requests

const ProfilePage = () => {
    const { user } = useContext(UserContext);

    // State for storing user data
    const [userData, setUserData] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/student/profile'); // Replace with your API endpoint
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    // Check if data is loaded
    if (!userData) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <Navbar />
            <NavBarOptions userType="student" />
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
                        <h2 className="mt-2 text-black text-xl font-light">Ιδιότητα: {userData.role}</h2>
                    </div>
                    <div className="mt-4 lg:mt-0 flex-grow text-center lg:text-left">
                        <h2 className="text-black text-xl font-light">Αριθμός μητρώου: {userData.ID}</h2>
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
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Ημερομηνία Γέννησης: {userData.birth_rate} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Οικογενειακή Κατάσταση: {userData.family} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Αριθμός Αδελφών: {userData.siblings} </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Εκπλήρωση Στρατιωτικής Θητείας: Όχι </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Πόλη/Χωριό Γέννησης: ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Αριθμός Ταυτότητας: ΑΚ336699 </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Εκδούσα Αρχή: Κερατσινίου </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> AMKA: 23060622553 </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between gap-5 items-start">
                        <div className="text-black text-xl cursor-pointer font-medium self-stretch grow shrink basis-auto" onClick={() => setShowMoreInfoFilters(!showMoreInfoFilters)}>
                            <span>{showMoreInfoFilters ? "▲" : "▼"} Πληροφορίες Επικοινωνίας </span>
                            {showMoreInfoFilters && (
                                <div style={{ marginTop: "2rem" }} className="bg-zinc-300 grow bg-opacity-50 flex flex-col w-full h-full justify-center items-center px-auto py-auto rounded-lg max-md:px-5 max-md:pr-5">
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap"> Μόνιμη Διεύθυνση Κατοικίας: Αιόλου 45 </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Μόνιμη Πόλη Κατοικίας: Αθήνα </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Τηλέφωνο Μόνιμης Κατοικίας: 6977553311 </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> ΤΚ Μόνιμης Κατοικίας: 55443 </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Προσωρινή Διεύθυνση Κατοικίας: - </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Προσωρινή Πόλη Κατοικίας: - </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Τηλέφωνο Προσωρινής Κατοικίας: - </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> ΤΚ Προσωρινής Κατοικίας: - </div>
                                    <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3"> Διεύθυνση Ηλεκτρονικού Ταχυδρομείου: - </div>
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