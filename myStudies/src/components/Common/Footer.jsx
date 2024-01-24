import React from "react";

import universityLogo from "../../assets/UniLogo.png";

const Footer = () => {
    return (
        <footer className="bg-gray-50 rounded-t-xl mt-20 pt-2 pb-10 shadow-xl hover:shadow-2xl">
            <div className="mx-auto max-w-screen-xl m-10">
                <div className="md:flex md:justify-between">
                    <div>
                        <a href="https://www.uoa.gr" className="flex items-center">
                            <img src={universityLogo} alt="Univeristy Logo" className="h-14 me-3" />
                            <span className="text-lg font-thin"> ΕΘΝΙΚΟ & ΚΑΠΟΔΙΣΤΡΙΑΚΟ <br/> ΠΑΝΕΠΙΣΤΉΜΙΟ ΑΘΗΝΩΝ </span>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 sm:gap-16 sm:grid-cols-2">
                        <div>
                            <h2 className="text-sm font-semibold uppercase mb-6"> Οδηγίες </h2>

                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4"> 
                                    <a href="/connection-help" className="hover:underline"> Οδηγίες Σύνδεσης </a>
                                </li>

                                <li className="mb-4">
                                    <a href="/common-questions" className="hover:underline"> Συχνές Ερωτήσεις </a>
                                </li>

                                <li className="mb-4">
                                    <a href="/admin-contact" className="hover:underline "> Επικοινωνία με τον Διαχειριστή </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold uppercase mb-6"> New in </h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a href="/mobile-app" className="hover:underline"> Mobile Εφαρμογή για <br/> Προπτυχιακούς Φοιτητές </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 my-6" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center"> © 2024 Team 8 ~ / Anna - Chris - Orestis / </span>

                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="https://github.com/annegog/myStudies" className="text-gray-500 hover:text-gray-900">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                            </svg>
                            
                            <span className="sr-only"> GitHub repo </span>
                        </a>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;