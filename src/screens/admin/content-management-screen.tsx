import React, { useState } from "react";
import SectionWrapper from "../../components/common/section-wrapper";
import { useNavigate } from "react-router-dom";

export default function ContentManagementScreen() {
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 5;
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const currentLessons = lessons.slice(startIndex, startIndex + lessonsPerPage);
  const totalPages = Math.ceil(lessons.length / lessonsPerPage);
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <SectionWrapper>
        <div className="p-6 space-y-6">
          <div className="flex justify-end space-x-4">
            {/* Add Lesson Section */}
            <button
              className="btn btn-primary"
              onClick={() => navigation("/lessons/dashboard")}
            >
              Add Lesson
            </button>

            {/* Add Vocabulary Section */}
            <button
              className="btn btn-success"
              onClick={() => navigation("/lessons/dashboard")}
            >
              Add Vocabulary
            </button>
          </div>
        </div>
        <div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="table table-auto">
                <thead>
                  <tr className="text-lg text-gray-700">
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Vocabulary Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLessons.map((x) => {
                    return (
                      <tr className="text-gray-600 font-extralight text-xs">
                        <th>{x.id}</th>
                        <td>{x.title}</td>
                        <td>{x.description}</td>
                        <td>{x.vocabularyCount}</td>
                        <td className="flex justify-center items-center space-x-2">
                          {/* Show Vocabulary */}
                          <button
                            className="btn btn-sm btn-success btn-outline"
                            onClick={() => navigation("/lessons/vocabulary")}
                          >
                            Vocabulary
                          </button>
                          {/* Edit Button */}
                          <button
                            className="btn btn-sm btn-accent"
                            onClick={() => {}}
                          >
                            Edit
                          </button>

                          {/* Delete Button */}
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => {}}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`btn ${
                  currentPage === 1 ? "btn-disabled" : "btn-primary btn-outline"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`btn ${
                  currentPage === totalPages
                    ? "btn-disabled"
                    : "btn-primary btn-outline"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

const lessons = [
  {
    id: 1,
    title: "Basic Greetings",
    description:
      "Learn essential Japanese greetings for everyday conversations.",
    vocabularyCount: 10,
  },
  {
    id: 2,
    title: "Numbers and Counting",
    description: "Master the numbers and counting system in Japanese.",
    vocabularyCount: 15,
  },
  {
    id: 3,
    title: "Family Members",
    description: "Understand how to refer to family members in Japanese.",
    vocabularyCount: 12,
  },
  {
    id: 4,
    title: "Food and Drinks",
    description: "Learn Japanese vocabulary for common foods and drinks.",
    vocabularyCount: 20,
  },
  {
    id: 5,
    title: "Shopping Phrases",
    description: "Useful phrases and vocabulary for shopping in Japan.",
    vocabularyCount: 18,
  },
  {
    id: 6,
    title: "Travel Essentials",
    description: "Important vocabulary for traveling in Japan.",
    vocabularyCount: 22,
  },
  {
    id: 7,
    title: "Workplace Terms",
    description: "Learn workplace-related vocabulary in Japanese.",
    vocabularyCount: 17,
  },
];
