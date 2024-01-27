import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const AccordionSection = ({
  title,
  courses,
  isOpen,
  onSectionClick,
  onHistoryClick,
  onDetailsClick,
}) => {
  return (
    <div>
      <button
        onClick={onSectionClick}
        className="text-left w-full text-lg py-2 focus:outline-none"
      >
        {title}
      </button>
      {isOpen && (
        <div className="flex flex-col content bg-gray-50 rounded-2xl p-4 shadow-md hover:shadow-xl">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="flex items-center text-black">
                <h2 className="text-lg font-medium mt-1 mb-1">
                  {course.title} - {course.id_course}
                </h2>
                <button className="ml-2" onClick={() => onDetailsClick(course)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p>No courses available for this section</p>
          )}
        </div>
      )}
    </div>
  );
};

const Courses = () => {
  const [activeSemester, setActiveSemester] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [organizedCourses, setOrganizedCourses] = useState({});

  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const [details, setDetails] = useState(null);

  const professorList = details && Array.isArray(details.professors)
    ? details.professors.join(", ")
    : details?.professors || 'No professors listed';

  const handleDetailsButtonClick = (course) => {
    setDetails(course);
    setDetailsModalOpen(true);
  };
  
  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
  };

  useEffect(() => {
    const apiEndpoint = "/api/courses";
    axios
      .get(apiEndpoint)
      .then((response) => {
        setCourseData(response.data);

        const organizedData = organizeCourses(response.data);
        setOrganizedCourses(organizedData);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // Function to organize courses by semester, type, and direction/major
  const organizeCourses = (courses) => {
    const organizedData = {};

    // Iterate over each course
    courses.forEach((course) => {
      const { semester, mandatory, lab, general, direction } = course;

      // Create semester key if not exists
      if (!organizedData[semester]) {
        organizedData[semester] = {
          required: [],
          labs: [],
          general: [],
          directionA: [],
          directionB: [],
        };
      }

      if (mandatory) {
        organizedData[semester].required.push(course);
      } else if (lab) {
        organizedData[semester].labs.push(course);
      } else if (general) {
        organizedData[semester].general.push(course);
      }

      if (direction === "A") {
        organizedData[semester].directionA.push(course);
      } else if (direction === "B") {
        organizedData[semester].directionB.push(course);
      }

      // Add more conditions as needed for other types or categories
    });

    return organizedData;
  };

  const toggleSemester = (semester) => {
    setActiveSemester((prevSemester) =>
      prevSemester === semester ? null : semester
    );
  };

  const toggleSection = (semester, section) => {
    const key = `${semester}-${section}`;
    setOpenSections((prevOpenSections) => {
      const newOpenSections = {
        ...prevOpenSections,
        [key]: !prevOpenSections[key],
      };
      return newOpenSections;
    });
  };

  return (
    <div className="p-2 rounded-lg mt-8 space-y-4">
      {/* Semesters Buttons */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
        <div key={semester}>
          <button
            onClick={() => toggleSemester(semester)}
            className="flex flex-row text-left w-full text-lg py-2 focus:outline-none bg-gray-50 rounded-xl p-5 mb-4 shadow-md hover:shadow-xl"
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
            <span>Εξάμηνο {semester}</span>
          </button>
          {`${activeSemester}` === `${semester}` && (
            <div className="flex flex-col pl-8 bg-gray-100 rounded-2xl pb-2">
              <AccordionSection
                title="Υποχρεωτικά Μαθήματα"
                isOpen={openSections[`${semester}-required`]}
                onSectionClick={() => toggleSection(semester, "required")}
                courses={organizedCourses[semester]?.required}
                onDetailsClick={handleDetailsButtonClick}
              />
              <AccordionSection
                title="Εργαστήρια"
                isOpen={openSections[`${semester}-labs`]}
                onSectionClick={() => toggleSection(semester, "labs")}
                courses={organizedCourses[semester]?.labs}
                onDetailsClick={handleDetailsButtonClick}
              />
              <AccordionSection
                title="Γενικής Παιδείας"
                isOpen={openSections[`${semester}-general`]}
                onSectionClick={() => toggleSection(semester, "general")}
                courses={organizedCourses[semester]?.general}
                onDetailsClick={handleDetailsButtonClick}
              />
              {semester >= 5 && (
                <div>
                  <AccordionSection
                    title="Κατεύθυνση Α"
                    isOpen={openSections[`${semester}-directionA`]}
                    onSectionClick={() => toggleSection(semester, "directionA")}
                    courses={organizedCourses[semester]?.directionA}
                    onDetailsClick={handleDetailsButtonClick}
                  />
                  <AccordionSection
                    title="Κατεύθυνση B"
                    isOpen={openSections[`${semester}-directionB`]}
                    onSectionClick={() => toggleSection(semester, "directionB")}
                    courses={organizedCourses[semester]?.directionB}
                    onDetailsClick={handleDetailsButtonClick}
                  />
                  <AccordionSection
                    title="Επιλογές Τμήματος"
                    isOpen={openSections[`${semester}-optional`]}
                    onSectionClick={() => toggleSection(semester, "optional")}
                    courses={organizedCourses[semester]?.optional}
                    onDetailsClick={handleDetailsButtonClick}
                  />
                </div>
              )}
              {semester >= 7 && (
                <div>
                  <AccordionSection
                    title="Πτυχιακή-Πρακτική"
                    isOpen={openSections[`${semester}-internship`]}
                    onSectionClick={() => toggleSection(semester, "internship")}
                    courses={organizedCourses[semester]?.internship}
                    onDetailsClick={handleDetailsButtonClick}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}

    <Dialog
      open={isDetailsModalOpen}
      onClose={handleCloseDetailsModal}
      className="rounded-xl"
    >
      <DialogTitle className="justify-center text-center rounded-t-md underline">
        {details && details.title} 
      </DialogTitle>
      <DialogContent className=" p-4">
        {details && (
          <div className="mt-2 text-lg font-medium">
            <p>Εξάμηνο: {details.semester}</p>
            <p className="mt-2">ECTS: {details.ects}</p>
            <p className="mt-2">Καθηγητής: {professorList}</p>
            <p className="mt-2">Προτεινόμενα Βιβλία: {details.books.join(", ")}</p>
            <p className="mt-2">Ώρες Διδασκαλίας: {details.hours}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions className=" text-white rounded-b-md">
        <button className="text-white bg-teal-600 px-4 py-2 rounded-xl hover:bg-teal-500" onClick={handleCloseDetailsModal}>Close</button>
      </DialogActions>
    </Dialog>

    </div>
  );
};

export default Courses;
