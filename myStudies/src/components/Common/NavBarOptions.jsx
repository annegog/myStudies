import React from "react";

const Options = ({ userType, userId }) => {
    const studentOptions = [
        { path: `/student/grades/${userId}`, label: "ΒΑΘΜΟΛΟΓΙΟ" },
        { path: `/student/courses/${userId}`, label: "ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ" },
        { path: `/student/certifications/${userId}`, label: "ΠΙΣΤΟΠΟΙΗΤΙΚΑ" },
        { path: `/student/declarations/${userId}`, label: "ΙΣΤΟΡΙΚΟ ΔΗΛΩΣΕΩΝ ΜΑΘΗΜΑΤΩΝ" },
    ]

    const teacherOptions = [
        { path: `/professor/grades/${userId}`, label: "ΒΑΘΜΟΛΟΓΙΟ" },
    ]

    const links = userType === "student" ? studentOptions : teacherOptions;

    return (
        <nav className="bg-blue-400 items-center border border-gray-300 rounded-b-xl shadow-xl">
            <div className="max-w-screen-xl justify-between mx-auto p-3">
                <div className="flex flex-row w-full justify-between max-md:max-w-full max-md:flex-wrap">
                    {links.map((link, index) => (
                        <div key={index}>
                            <a href={link.path} className="text-black hover:text-gray-600">
                                {link.label}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Options;