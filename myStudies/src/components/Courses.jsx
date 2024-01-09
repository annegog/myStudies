import React, { useState } from "react";

const AccordionSection = ({ title, children, isOpen, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="text-left w-full text-lg py-2 focus:outline-none"
      >
        {title}
      </button>
      {isOpen && <div className="content bg-gray-100 p-4">{children}</div>}
    </div>
  );
};

const Courses = () => {
  const [activeSemester, setActiveSemester] = useState(null);
  const [openSections, setOpenSections] = useState({});

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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
