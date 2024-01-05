import React, { useState } from "react";

const SecondNavbar = () => {
  return (
    <nav className="bg-blue-200 items-center w-full z-30 top-0 border border-gray-200 relative">
      <div className="max-w-screen-xl flex justify-between mx-auto p-4">
        <div className="flex w-full  items-stretch justify-between gap-2 max-md:max-w-full max-md:flex-wrap">
          <div>
            <a
              href="/student/courses"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              aria-current="page"
            >
              ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ
            </a>{" "}
          </div>

          <div>
            <a
              href="/student/grades"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              ΒΑΘΜΟΛΟΓΙΟ
            </a>
          </div>
          <div>
            <a
              href="/student/certifications"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              ΠΙΣΤΟΠΟΙΗΤΙΚΑ
            </a>
          </div>
          <div>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              ΙΣΤΟΡΙΚΟ ΔΗΛΩΣΕΩΝ ΜΑΘΗΜΑΤΩΝ
            </a>
          </div>
          {/* </ul> */}
        </div>
      </div>
    </nav>
  );
};

export default SecondNavbar;
