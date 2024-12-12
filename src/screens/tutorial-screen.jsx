import React, { useState } from "react";
import SectionWrapper from "../components/common/section-wrapper";
import Modal from "../components/common/modal";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGetProfile } from "../react-query/auth";
import Loading from "../components/common/loading";
import { useCreateTutorial, useGetTutorial } from "../react-query/tutorial";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters long")
    .required("Description is required"),
  youtubeLink: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
      "Must be a valid YouTube URL"
    )
    .required("YouTube link is required"),
});

const TutorialScreen = () => {
  const tutorialData = useGetTutorial();
  const [isOpen, setOpen] = useState(false);
  const profile = useGetProfile();
  const tutorial = useCreateTutorial();

  const initialValues = {
    title: "",
    description: "",
    youtubeLink: "",
  };
  

  if (profile.isLoading || tutorialData.isLoading) return <Loading />;

  // Form submission handler
  const handleSubmit = async(values) => {
    const res = await tutorial.mutateAsync(values);
    if(res.success){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setOpen(false)
  };

  return (
    <div>
      <SectionWrapper>
        <div className="flex justify-end space-x-4">
          {profile.data.role === 1 && (
            <button
              className="btn btn-success btn-outline"
              onClick={() => setOpen(true)}
            >
              Add Video
            </button>
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-8 bg-gray-50">
          {tutorialData.data.map((video) => (
            <div
              key={video.id}
              className="bg-white shadow-md hover:shadow-lg rounded-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div className="relative w-full h-48">
                <iframe
                  className="w-full h-full rounded-t-xl"
                  src={video.embedLink}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mt-3">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
      {/*add modal is here*/}
      <Modal
        isOpen={isOpen}
        title="Add Youtube Video"
        onClose={() => setOpen(false)}
      >
        <div className="max-w-md mx-auto p-6 rounded-l">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                {/* Title Field */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    className="w-full px-4 bg-transparent py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Description Field */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* YouTube Link Field */}
                <div className="mb-4">
                  <label
                    htmlFor="youtubeLink"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    YouTube Link
                  </label>
                  <Field
                    name="youtubeLink"
                    type="text"
                    placeholder="Enter YouTube embed link"
                    className="w-full px-4 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage
                    name="youtubeLink"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 mt-5 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default TutorialScreen;
