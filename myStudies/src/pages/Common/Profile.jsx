import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../components/UserContext";

import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import NavBarOptions from "../../components/Common/NavBarOptions";

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const { id } = useParams();

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

    const formatBirthDate = (dateString) => {
        if (!dateString) {
            return "-";
        }

        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('el-GR', options);
    };

    return (
        <div>
            <Navbar />
            <NavBarOptions userType={`${user.role}`} userId={id} />
            <div className="mt-4 px-4 lg:px-16 w-full">
                <div className="bg-gray-50 rounded-3xl p-4 m-16 flex flex-wrap justify-between items-center shadow-md hover:shadow-2xl">
                    <div className="object-contain object-center w-[120px] overflow-hidden shrink-0 max-w-full mt-2 rounded-[50%] ml-8">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                    </div>
                    
                    <div className="ml-16 lg:mt-0 flex-grow text-center lg:text-left">
                        <h2 className="text-black text-xl font-light"> Όνομα: {userData.first_name} {userData.last_name} </h2>
                        <h2 className="mt-2 text-black text-xl font-light"> E-mail: {userData.email} </h2>
                        <h2 className="mt-2 text-black text-xl font-light"> Ιδιότητα: {userData.role === "student" ? "Εκπαιδευόμενος" : "Καθηγητής"} </h2>
                    </div>

                    <div className="mt-16 lg:mt-0 flex-grow text-center lg:text-left">
                        <h2 className="text-black text-xl font-light"> Αριθμός μητρώου: {userData.username} </h2>
                        <h2 className="mt-2 text-black text-xl font-light"> Σχολή - Τμήμα: {userData.university} </h2>
                        <h2 className="mt-2 text-black text-xl font-light"> Μέλος από: {registrationDate} </h2>
                    </div>

                    <div>
                        <button className="text-sm text-center bg-transparent py-1 px-2 mb-24 mr-3 rounded-3xl border"> Επεξεργασία </button>
                    </div>
                </div>

                <div className="flex flex-col justify-between ml-20">
                    <div className="flex justify-between m-4 items-start">
                        <div className="text-black text-xl cursor-pointer font-medium self-stretch shrink basis-auto" onClick={() => setShowInfoFilters(!showInfoFilters)}>
                            <span> {showInfoFilters ? "▲" : "▼"} Προσωπικά Στοιχεία </span>
                            {showInfoFilters && (
                                <div className="bg-gray-50 justify-center m-2 p-4 w-full rounded-3xl shadow-md hover:shadow-2xl">
                                    <div className="justify-start text-black text-xl font-light whitespace-nowrap">
                                        <button className="text-sm text-center bg-transparent py-1 px-2 ml-80 rounded-3xl border"> Επεξεργασία </button>
                                        <p className="mb-2">Όνομα Πατέρα: {userData.father}</p>
                                        <p className="mb-2">Όνομα Μητέρας: {userData.mother}</p>
                                        <p className="mb-2">Ημερομηνία Γέννησης: {formatBirthDate(userData.birth_date)} </p>
                                        <p className="mb-2">Οικογενειακή Κατάσταση: {userData.family === "married" ? "Παντρεμένος/η" : "Άγαμος/η"} </p>
                                        <p className="mb-2">Αριθμός Αδελφών: {userData.siblings === "" ? "-" : userData.siblings}</p>
                                        <p className="mb-2">Εκπλήρωση Στρατιωτικής Θητείας: {userData.army === "yes" ? "Ναι" : "Όχι"}</p>
                                        <p className="mb-2">Τόπος Γέννησης: {userData.birth_location}</p>
                                        <p className="mb-2">Αριθμός Ταυτότητας: {userData.ID} </p>
                                        <p className="mb-2">Εκδούσα Αρχή: {userData.ID_location} </p>
                                        <p className="mb-2">AMKA: {userData.AMKA}</p>
                                    </div>
                                </div> 
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between m-4 items-end">
                        <div className="text-black text-xl cursor-pointer font-medium self-stretch shrink basis-auto" onClick={() => setShowMoreInfoFilters(!showMoreInfoFilters)}>
                            <span> {showMoreInfoFilters ? "▲" : "▼"} Πληροφορίες Επικοινωνίας </span>
                            {showMoreInfoFilters && (
                                <div className="bg-gray-50 grow m-2 justify-center p-4 rounded-3xl max-md:px-5 max-md:pr-5 shadow-md hover:shadow-2xl">
                                    <div className="justify-start text-black text-xl font-light whitespace-nowrap p-2">
                                        <p className="mt-2 mb-2"> Μόνιμη Διεύθυνση Κατοικίας: {userData.home === "" ? "-" : userData.home} </p>
                                        <p className="mt-2 mb-2"> Μόνιμη Πόλη Κατοικίας: {userData.city === "" ? "-" : userData.city} </p>
                                        <p className="mt-2 mb-2"> Τηλέφωνο Μόνιμης Κατοικίας: {userData.phone  === "" ? "-" : userData.phone} </p>
                                        <p className="mt-2 mb-2"> ΤΚ Μόνιμης Κατοικίας: {userData.postal === "" ? "-" : userData.postal} </p>
                                        <p className="mt-2 mb-2"> Προσωρινή Διεύθυνση Κατοικίας: {userData.temp_home === "" ? "-" : userData.temp_home} </p>
                                        <p className="mt-2 mb-2"> Προσωρινή Πόλη Κατοικίας: {userData.temp_city === "" ? "-" : userData.temp_city} </p>
                                        <p className="mt-2 mb-2"> Τηλέφωνο Προσωρινής Κατοικίας:{userData.temp_phone === "" ? "-" : userData.temp_phone} </p>
                                        <p className="mt-2 mb-2"> ΤΚ Προσωρινής Κατοικίας: {userData.postal_temp === "" ? "-" : userData.postal_temp} </p>
                                        <p className="mt-2 mb-2"> Διεύθυνση Ηλεκτρονικού Ταχυδρομείου: {userData.email === "" ? "-" : userData.email} </p>
                                    </div>
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