import React, { useState, useEffect } from "react";
import axios from "axios";

const AccordionSection = ({ title, courses, isOpen, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="text-left w-full text-lg py-2 focus:outline-none"
      >
        {title}
      </button>
      {isOpen && (
        <div className="content bg-gray-100 rounded-2xl p-4">
          {courses &&
            courses.map((course) => (
              <div key={course.id}>{/* Render course details here */}</div>
            ))}
        </div>
      )}
    </div>
  );
};

const Courses = () => {
  const [activeSemester, setActiveSemester] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const apiEndpoint = "/courses";
    axios
      .get(apiEndpoint)
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once


//   // Function to organize courses by semester, type, and direction/major
//   const organizeCourses = (courses) => {
//     const organizedData = {};

//     // Iterate over each course
//     courses.forEach((course) => {
//       const { semester, mandatory, lab, general, direction, major } = course;

//       // Create semester key if not exists
//       if (!organizedData[semester]) {
//         organizedData[semester] = {
//           required: [],
//           labs: [],
//           general: [],
//           directionA: [],
//           directionB: [],
//         };
//       }

//       // Place the course into the appropriate category based on its type
//       if (mandatory) {
//         organizedData[semester].required.push(course);
//       } else if (lab) {
//         organizedData[semester].labs.push(course);
//       } else if (general) {
//         organizedData[semester].general.push(course);
//       }

//       // Place the course into the appropriate direction category
//       if (direction === "A") {
//         organizedData[semester].directionA.push(course);
//       } else if (direction === "B") {
//         organizedData[semester].directionB.push(course);
//       }

//       // Add more conditions as needed for other types or categories
//     });

//     return organizedData;
//   };

//   // Example usage
//   const organizedCourses = organizeCourses(courseData);

//   // Now 'organizedCourses' will contain an object with courses organized by semester, type, and direction/major
//   console.log(organizedCourses);

  const toggleSemester = (semester) => {
    setActiveSemester(activeSemester === semester ? null : semester);
  };

  const toggleSection = (semester, section) => {
    const key = `${semester}-${section}`;
    setOpenSections({
      ...openSections,
      [key]: !openSections[key],
    });
  };

  return (
    <div className="semesters bg-slate-200 p-2 rounded-lg mt-8 space-y-4">
      {/* Semesters Buttons */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
        <div key={semester}>
          <button
            onClick={() => toggleSemester(semester)}
            className="flex flex-row text-left w-full text-lg py-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-6 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            Εξάμηνο {semester}
          </button>
          {activeSemester === semester && (
            <div className="flex flex-col space-y-2 pl-8">
              {/* Adjusted the left padding here */}
              <AccordionSection
                title="Υποχρεωτικά Μαθήματα"
                isOpen={openSections[`${semester}-required`]}
                onClick={() => toggleSection(semester, "required")}
              >
                {/* Content for Υποχρεωτικά Μαθήματα */}
              </AccordionSection>
              <AccordionSection
                title="Εργαστήρια"
                isOpen={openSections[`${semester}-labs`]}
                onClick={() => toggleSection(semester, "labs")}
              >
                {/* Content for Εργαστήρια */}
              </AccordionSection>
              <AccordionSection
                title="Γενικής Παιδείας"
                isOpen={openSections[`${semester}-general`]}
                onClick={() => toggleSection(semester, "general")}
              >
                {/* Content for Προαιρετικά Μαθήματα */}
              </AccordionSection>
              {semester >= 5 && (
                <div>
                  <AccordionSection
                    title="Κατεύθυνση Α"
                    isOpen={openSections[`${semester}-directionA`]}
                    onClick={() => toggleSection(semester, "directionA")}
                  ></AccordionSection>
                  <AccordionSection
                    title="Κατεύθυνση B"
                    isOpen={openSections[`${semester}-directionB`]}
                    onClick={() => toggleSection(semester, "directionB")}
                  ></AccordionSection>
                  <AccordionSection
                    title="Επιλογές Τμήματος"
                    isOpen={openSections[`${semester}-optional`]}
                    onClick={() => toggleSection(semester, "optional")}
                  ></AccordionSection>
                </div>
              )}
              {semester >= 7 && (
                <div>
                  <AccordionSection
                    title="Πτυχιακή-Πρακτική"
                    isOpen={openSections[`${semester}-internship`]}
                    onClick={() => toggleSection(semester, "internship")}
                  ></AccordionSection>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Courses;
