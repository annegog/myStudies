import React from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";

import { UserContext } from "../../../components/UserContext";

import Navbar from "../../../components/Common/Navbar";
import Footer from "../../../components/Common/Footer";

const CommonQuestions = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    
    const handleBack = () => {
        navigate(`/student/${id}`); 
    };
    
    const [userRole, setUserRole] = useState("student")
    const [openQuestions, setOpenQuestions] = useState({});

    const toggleQuestion = (index) => {
        setOpenQuestions(prevOpenQuestions => ({
            ...prevOpenQuestions,
            [index]: !prevOpenQuestions[index]
        }));
    };
    
    const questionsStudents = [
        {
            question: "Πως μπορώ να αλλάξω το e-mail μου;",
            steps: [
                "Κάντε κλικ στον <strong> Αριθμό Μητρώου </strong> στο επάνω μέρος της σελίδας.",
                "Επιλέξτε πάνω δεξιά την επιλογή <strong> Αλλαγή </strong>.",
                "Αλλάξτε το e-mail σας.",
                "Πατήστε <strong> Οκ </strong>."
            ]
        },
        {
            question: "Πως μπορώ να επιστρέψω στο πρόγραμμα σπουδών μου;",
            steps: [
                "Κάντε κλικ στo <strong> Πρόγραμμα Σπουδών </strong>.",
            ]
        },
        {
            question: "Πως μπορώ να εντοπίσω ένα μάθημα μέσα στο πρόγραμμα σπουδών;",
            steps: [
                "Κάντε κλικ στο <strong> Πρόγραμμα Σπουδών </strong>.",
                "Μπορείτε να εντοπίσετε το μάθημα σύμφωνα με το εξάμηνο που παρέχεται.",
            ]
        },
        {
            question: "Πως μπορώ να αλλάξω δω το προφίλ μου;",
            steps: [
                "Κάντε κλικ στον <strong> Αριθμό Μητρώου </strong> σας στο πάνω μέρος της σελίδας.",
                "Για να δείτε περισσότερες πληροφορίες πατήστε <strong> Προσωπικά Στοιχεία </strong> ή <strong> Πληροφορίες επικοινωνίας </strong>." 
            ]
        },
        {
            question: "Πως μπορώ να καταθέσω αίτηση για παροψή πιστοποιητικού;",
            steps: [
                "Κάντε κλικ στα <strong> ΠΙΣΤΟΠΟΙΗΤΙΚΑ </strong>.",
                "Επιλέξτε το είδος πιστοποιητικού θέλετε.",
                "Συμπληρώστε τον αριθμό των αντιγράφων που θέλετε.",
                "Κάντε κλικ στο <strong> Αίτηση </strong> για να πραγματοποιηθεί η αίτηση του πιστοποιητικού."
            ]
        },
        {
            question: "Πως μπορώ να κάνω δήλωση ενός μαθήματος;",
            steps: [
                "Όταν ανοίξουν οι δηλώσεις θα εμφανιστεί το κουμπί για την δήλωση των μαθημάτων στη κεντρική σελίδα.",
                "Κάντε κλικ στη <strong> Δήλωση Μαθημάτων </strong>.",
                "Επιλέξτε τα μαθήματα που επιθυμείτε να δώσετε σύμφωνα με το εξάμηνο που παρέχονται.",
                "Πατήστε <strong> Επόμενο </strong>.",
                "Θα εμφανιστούν τα μαθήματα που δηλώσατε.",
                "Μπορείτε να αφαιρέσετε σε περίπτωση λάθους/αλλάξατε γνώμη.",
                "Πατήστε <strong> Οριστική Δήλωση </strong>."
            ]
        },
        {
            question: "Πως μπορώ να κάνω τροποποίηση της δήλωσης μου;",
            steps: [
                "Κάντε κλικ στο <strong> Τροποποίηση Δήλωσης Μαθημάτων </strong> στη κεντρική σελίδα όσο είναι ανοιχτές οι δηλώσεις και έχει πραγματοποιηθεί τουλάχιστον μια δήλωση.",
                "Επιλέξτε τα μαθήματα που επιθυμείτε να δώσετε σύμφωνα με το εξάμηνο που παρέχονται.",
                "Πατήστε <strong> Επόμενο </strong>.",
                "Θα εμφανιστούν τα μαθήματα που δηλώσατε.",
                "Μπορείτε να αφαιρέσετε σε περίπτωση λάθοyς/αλλάξατε γνώμη.",
                "Πατήστε <strong> Οριστική Δήλωση </strong>."
            ]
        },
        {
            question: "Πως μπορώ να δω τα μαθήματα που έχω δηλώσει για το εξάμηνο ή σε προηγούμενα εξάμηνα;",
            steps: [
                "Κάντε κλικ στο <strong> ΙΣΤΟΡΙΚΟ ΔΗΛΩΣΕΩΝ ΜΑΘΗΜΑΤΩΝ </strong>.",
                "Κατευθυνθείτε σύμφωνα με το εξάμηνο που επιθυμείτε να εντοπίσετε.",
                "Σε περίπτωση που δεν έχει περάσει η τελική ημερομηνία των δηλώσεων θα σας εμφανιστεί το μήνυμα δήλωσης στο πάνω μέρος.",
            ]
        },
        {
            question: "Πως μπορώ να δω τους βαθμούς μου;",
            steps: [
                "Κάντε κλικ στο <strong> ΒΑΘΜΟΛΟΓΙΟ </strong>.",
                "Κατευθυνθείτε σύμφωνα με το εξάμηνο που επιθυμείτε να εντοπίσετε.",
                "Σε περίπτωση που θέλετε φίλτρα μπορείτε να επιλέξετε ή ακόμα να κάνετε και <strong> Aναζήτηση </strong> ενός μαθήματος."
            ]
        },
    ];

    const questionsProfessors = [
        {
            question: "Πως μπορώ να αλλάξω το e-mail μου;",
            steps: [
                "Κάντε κλικ στον <strong> Αριθμό Μητρώου </strong> στο επάνω μέρος της σελίδας.",
                "Επιλέξτε πάνω δεξιά την επιλογή <strong> Αλλαγή </strong>.",
                "Αλλάξτε το e-mail σας.",
                "Πατήστε <strong> Οκ </strong>."
            ]
        },
        {
            question: "Πως μπορώ να αλλάξω δω το προφίλ μου;",
            steps: [
                "Κάντε κλικ στον <strong> Αριθμό Μητρώου </strong> σας στο πάνω μέρος της σελίδας.",
                "Για να δείτε περισσότερες πληροφορίες κάντε κλικ στα <strong> Προσωπικά Στοιχεία </strong> ή στις <strong> Πληροφορίες επικοινωνίας </strong>." 
            ]
        },
        {
            question: "Πως δηλώνονται οι βαθμολογίες;",
            steps: [
                "Κάντε κλικ στο <strong> ΒΑΘΜΟΛΟΓΙΟ </strong>.",
                "Κάντε κλικ στο <strong> Δημιουργία Βαθμολογίου </strong>.",
                "Καταχωρήστε του βαθμούς και πατήστε <strong> Οριστικοποίηση </strong>.",
                "Eπίσης υπάρχει το δικαίωμα για προσωρινή αποθήκευση παντώντας <strong> Προσωρινή Αποθήκευση </strong> ή μαζική μεταφόρτωσης βαθμών πατώντας <strong> Μεταφόρτωση Αρχείου για μαζική βαθμολόγιση </strong>.",
            ]
        },
        {
            question: "Πως μπορώ να δω το ιστορικό των βαθμολογιών;",
            steps: [
                "Κάντε κλικ στο <strong> ΒΑΘΜΟΛΟΓΙΟ </strong>.",
                "Κάντε κλικ στο <strong> Προβολή Βαθμολογίου </strong>.",
                "Επιλέξτε ποια εξεταστική περίοδο θέλετε."
            ]
        },
    ];
    
    return (
        <div>
            <Navbar/>
            <div className="m-10 flex flex-col items-center px-40 py-12 rounded-lg max-md:px-5">
                {userRole === "student" ? (
                    questionsStudents.map((data, index) => (
                        <div key={index} className="w-full">
                            <button className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full py-2"
                                onClick={() => toggleQuestion(index)}
                            > {data.question} {" "} <span> {openQuestions[index] ? "▲" : "▼"} </span> </button>

                            {openQuestions[index] && (
                                <div className="bg-gray-50 text-black text-base italic max-w-full shadow-md hover:shadow-xl cursor-pointer bg-opacity-30 w-fit justify-center items-stretch p-5 py-3 rounded-2xl self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                                    <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                                        {data.steps.map((step, stepIndex) => (
                                            <li key={stepIndex} dangerouslySetInnerHTML={{ __html: step }}/>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))
                ) : userRole === "professor" && (
                    questionsProfessors.map((data, index) => (
                        <div key={index} className="w-full">
                            <button className="text-blue-900 text-xl font-semibold self-start max-md:max-w-full py-3"
                                onClick={() => toggleQuestion(index)}
                            > {data.question} {" "} <span> {openQuestions[index] ? "▲" : "▼"} </span> </button>

                            {openQuestions[index] && (
                                <div className="bg-gray-50 text-black text-base italic max-w-full shadow-md hover:shadow-xl cursor-pointer bg-opacity-30 w-fit justify-center items-stretch p-5 py-3 rounded-2xl self-start max-md:max-w-full max-md:pl-5 max-md:pr-8">
                                    <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                                        {data.steps.map((step, stepIndex) => (
                                            <li key={stepIndex} dangerouslySetInnerHTML={{ __html: step }}/>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))
                )}

                <button type="button" className="text-center text-white font-medium bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none rounded-lg text-base mt-36 px-5 py-3" 
                    onClick={handleBack}
                > Επιστοφή στην Αρχική Σελίδα </button>
            </div>
            <Footer />
        </div >
    );
};

export default CommonQuestions;