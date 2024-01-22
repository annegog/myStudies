import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import NavBarOptions from "../../components/Common/NavBarOptions";

import { UserContext } from "../../components/UserContext";

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
            <NavBarOptions userType={"student"} userId={id} />
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
                        <h2 className="text-black text-xl font-light">Όνομα: {userData.first_name} {userData.last_name}</h2>
                        <h2 className="mt-2 text-black text-xl font-light">E-mail: {userData.email}</h2>
                        <h2 className="mt-2 text-black text-xl font-light"> Ιδιότητα: {userData.role === "student" ? "Εκπαιδευόμενος" : "Καθηγητής"} </h2>
                    </div>
                    <div className="mt-4 lg:mt-0 flex-grow text-center lg:text-left">
                        <h2 className="text-black text-xl font-light">Αριθμός μητρώου: {userData.username}</h2>
                        <h2 className="mt-2 text-black text-xl font-light">Σχολή - Τμήμα: {userData.university}</h2>
                        <h2 className="mt-2 text-black text-xl font-light">Μέλος από: {registrationDate}</h2>
                    </div>
                </div>

                <div style={{ marginTop: "2rem" }} className="flex flex-col justify-between ">
                    <div className="flex justify-between gap-5 items-start">
                        <div className="text-black text-xl cursor-pointer font-medium self-stretch shrink basis-auto" onClick={() => setShowInfoFilters(!showInfoFilters)}>
                            <span>{showInfoFilters ? "▲" : "▼"} Προσωπικά Στοιχεία </span>
                            {showInfoFilters && (
                                <div style={{ marginTop: "2rem" }} className="bg-zinc-300 grow m-2 justify-center px-auto py-auto rounded-lg max-md:px-5 max-md:pr-5">
                                    <div className="justify-start text-black text-xl font-light whitespace-nowrap p-2">
                                        <p className="mt-2 mb-2">Όνομα Πατέρα: {userData.father}</p>
                                        <p className="mb-2">Όνομα Μητέρας: {userData.mother}</p>
                                        <p className="mb-2">Ημερομηνία Γέννησης: {formatBirthDate(userData.birth_date)} </p>
                                        <p className="mb-2">Οικογενειακή Κατάσταση: {userData.family} </p>
                                        <p className="mb-2">Αριθμός Αδελφών: {userData.siblings}</p>
                                        <p className="mb-2">Εκπλήρωση Στρατιωτικής Θητείας: {userData.army}</p>
                                        <p className="mb-2">Τόπος Γέννησης: {userData.birth_location}</p>
                                        <p className="mb-2">Αριθμός Ταυτότητας: {userData.ID} </p>
                                        <p className="mb-2">Εκδούσα Αρχή: {userData.ID_location} </p>
                                        <p className="mb-2">AMKA: {userData.AMKA}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between gap-5 items-end">
                        <div className="text-black text-xl cursor-pointer font-medium self-stretch shrink basis-auto" onClick={() => setShowMoreInfoFilters(!showMoreInfoFilters)}>
                            <span>{showMoreInfoFilters ? "▲" : "▼"} Πληροφορίες Επικοινωνίας </span>
                            {showMoreInfoFilters && (
                                <div style={{ marginTop: "2rem" }} className="bg-zinc-300 grow m-2 justify-center px-auto py-auto rounded-lg max-md:px-5 max-md:pr-5">
                                    <div className="justify-start text-black text-xl font-light whitespace-nowrap p-2">
                                        <p className="mt-2 mb-2"> Μόνιμη Διεύθυνση Κατοικίας: {userData.home} </p>
                                        <p className="mt-2 mb-2"> Μόνιμη Πόλη Κατοικίας: {userData.city} </p>
                                        <p className="mt-2 mb-2"> Τηλέφωνο Μόνιμης Κατοικίας: {userData.temp_phone} </p>
                                        <p className="mt-2 mb-2"> ΤΚ Μόνιμης Κατοικίας: {userData.postal} </p>
                                        <p className="mt-2 mb-2"> Προσωρινή Διεύθυνση Κατοικίας: {userData.temp_home} </p>
                                        <p className="mt-2 mb-2"> Προσωρινή Πόλη Κατοικίας: {userData.temp_city} </p>
                                        <p className="mt-2 mb-2"> Τηλέφωνο Προσωρινής Κατοικίας:{userData.temp_phone} </p>
                                        <p className="mt-2 mb-2"> ΤΚ Προσωρινής Κατοικίας: {userData.postal_temp} </p>
                                        <p className="mt-2 mb-2"> Διεύθυνση Ηλεκτρονικού Ταχυδρομείου: {userData.email} </p>
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