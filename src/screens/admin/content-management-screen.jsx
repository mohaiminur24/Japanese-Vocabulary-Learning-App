import React, { useState } from "react";
import SectionWrapper from "../../components/common/section-wrapper";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateLesson, useGetLessons } from "../../react-query/lessons";
import Swal from "sweetalert2";

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
  const [isOpen, setIsOpen] = useState(false);
  const createLessons = useCreateLesson();
  const lessons = useGetLessons();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await createLessons.mutateAsync(values);
      if(res.success){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your lessons has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "something went wrong!",
          showConfirmButton: false,
          timer: 1500
        });
      }
      
      setIsOpen(false);
      resetForm();
    },
  });


  console.log(lessons);
  

  return (
    <div>
      <SectionWrapper>
        <div className="p-6 space-y-6">
          <div className="flex justify-end space-x-4">
            {/* Add Lesson Section */}
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
              Add Lesson
            </button>

            {/* Add Vocabulary Section */}
            <button
              className="btn btn-success"
              onClick={() => navigation("/lessons/add-vocabulary")}
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
      <Modal
        title={"Create New Lession"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form onSubmit={formik.handleSubmit} className="p-6">
          {/* Title Field */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>
          {/* Description Field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mr-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-semibold hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
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
