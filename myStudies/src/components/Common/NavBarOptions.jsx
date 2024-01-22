import React from "react";

const Options = ({ userType }) => {
    const studentOptions = [
        {path: "/student/grades", label: "ΒΑΘΜΟΛΟΓΙΟ"},
        {path: "/student/courses", label: "ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ"},
        {path: "/student/certifications", label: "ΠΙΣΤΟΠΟΙΗΤΙΚΑ"},
        {path: "/student/declarations", label: "ΙΣΤΟΡΙΚΟ ΔΗΛΩΣΕΩΝ ΜΑΘΗΜΑΤΩΝ"},
    ]

    const teacherOptions = [
        {path: "/professor/grades", label: "ΒΑΘΜΟΛΟΓΙΟ"},
    ]

    const links = userType === "student" ? studentOptions : teacherOptions;

    return(
        <div className="Options Navigation Bar">
            <nav className="bg-blue-300 items-center w-full z-30 top-0 border border-gray-300 relative rounded-b-xl">
                <div className="max-w-screen-xl flex justify-between mx-auto p-4">
                    <div className="flex w-full items-stretch justify-between gap-2 max-md:max-w-full max-md:flex-wrap">
                        {links.map((link, index) => (
                            <div key = {index}>
                                <a href = {link.path} className = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    > {link.label} 
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Options;