import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

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
        <div className="content bg-white rounded-2xl p-4 shadow-xl">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="flex items-center text-black">
                <h2 className="text-lg font-medium">
                  {course.title}-{course.id_course}
                </h2>
                <button className="ml-2" onClick={() => onHistoryClick(course)}>
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
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </button>
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

  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleHistoryButtonClick = (course) => {
    setHistory(course);
    setHistoryModalOpen(true);
  };

  const [details, setDetails] = useState(null);
  const [history, setHistory] = useState(null);

  const handleDetailsButtonClick = (course) => {
    setDetails(course);
    setDetailsModalOpen(true);
  };
  const handleCloseHistoryModal = () => {
    setHistoryModalOpen(false);
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
    <div className="bg-gray-50 p-2 rounded-lg mt-8 space-y-4">
      {/* Semesters Buttons */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
        <div key={semester}>
          <button
            onClick={() => toggleSemester(semester)}
            className="flex flex-row text-left w-full text-lg py-2 focus:outline-none bg-white rounded-xl p-5 mb-4 shadow-lg"
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
          {`${activeSemester}` === `${semester}` && (
            <div className="flex flex-col pl-8">
              <AccordionSection
                title="Υποχρεωτικά Μαθήματα"
                isOpen={openSections[`${semester}-required`]}
                onSectionClick={() => toggleSection(semester, "required")}
                courses={organizedCourses[semester]?.required}
                onHistoryClick={handleHistoryButtonClick}
                onDetailsClick={handleDetailsButtonClick}
              />
              <AccordionSection
                title="Εργαστήρια"
                isOpen={openSections[`${semester}-labs`]}
                onSectionClick={() => toggleSection(semester, "labs")}
                courses={organizedCourses[semester]?.labs}
                onHistoryClick={handleHistoryButtonClick}
                onDetailsClick={handleDetailsButtonClick}
              />
              <AccordionSection
                title="Γενικής Παιδείας"
                isOpen={openSections[`${semester}-general`]}
                onSectionClick={() => toggleSection(semester, "general")}
                courses={organizedCourses[semester]?.general}
                onHistoryClick={handleHistoryButtonClick}
                onDetailsClick={handleDetailsButtonClick}
              />
              {semester >= 5 && (
                <div>
                  <AccordionSection
                    title="Κατεύθυνση Α"
                    isOpen={openSections[`${semester}-directionA`]}
                    onSectionClick={() => toggleSection(semester, "directionA")}
                    courses={organizedCourses[semester]?.directionA}
                    onHistoryClick={handleHistoryButtonClick}
                    onDetailsClick={handleDetailsButtonClick}
                  />
                  <AccordionSection
                    title="Κατεύθυνση B"
                    isOpen={openSections[`${semester}-directionB`]}
                    onSectionClick={() => toggleSection(semester, "directionB")}
                    courses={organizedCourses[semester]?.directionB}
                    onHistoryClick={handleHistoryButtonClick}
                    onDetailsClick={handleDetailsButtonClick}
                  />
                  <AccordionSection
                    title="Επιλογές Τμήματος"
                    isOpen={openSections[`${semester}-optional`]}
                    onSectionClick={() => toggleSection(semester, "optional")}
                    courses={organizedCourses[semester]?.optional}
                    onHistoryClick={handleHistoryButtonClick}
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
                    onHistoryClick={handleHistoryButtonClick}
                    onDetailsClick={handleDetailsButtonClick}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {/* History Modal */}
      <Dialog open={isHistoryModalOpen} onClose={handleCloseHistoryModal}>
        <DialogTitle>Ιστορικό</DialogTitle>
        <DialogContent>
          <DialogContentText>Content of the history modal...</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryModal}>ΚΛΕΙΣΙΜΟ</Button>
        </DialogActions>
      </Dialog>
      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onClose={handleCloseDetailsModal}>
        <DialogTitle>{details && details.title}</DialogTitle>
        <DialogContent>
          {details && (
            <div>
              <p>ID: {details.id_course}</p>
              <p>Semester: {details.semester}</p>
              <p>ECTS: {details.ects}</p>
              <p>Professors: {details.professors.join(", ")}</p>
              <p>Books: {details.books.join(", ")}</p>
              <p>Hours: {details.hours}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Courses;
