import React, { useState } from "react";

const SecondNavbar = () => {
  return (
    <nav className="bg-blue-200 items-center w-full z-30 top-0 border border-gray-200 relative">
      <div className="max-w-screen-xl flex justify-between mx-auto p-4">
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="bg-blue-200 justify-center flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="/student/courses"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                ΒΑΘΜΟΛΟΓΙΟ
              </a>
            </li>
            <li>
              <a
                href="/student/certifications"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                ΠΙΣΤΟΠΟΙΗΤΙΚΑ
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                ΙΣΤΟΡΙΚΟ ΔΗΛΩΣΕΩΝ ΜΑΘΗΜΑΤΩΝ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SecondNavbar;
