import React, { useContext, useState } from "react";
import SectionWrapper from "../components/common/section-wrapper";
import { AuthContext } from "../components/auth-layout/auth-context";
import Modal from "../components/common/modal";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const videoData = [
  {
    id: 1,
    title: "60 Japanese Words for Everyday Life - Basic Vocabulary #3",
    description:
      "his series, we will teach you the core 800 Japanese words that you must know if you're a an absolute beginnerWith each new episodes in this series, we’ll include the previous lessons at the end.",
    embedLink: "https://www.youtube.com/embed/FCtHKQk2Dc0",
  },
  {
    id: 2,
    title: "80 Japanese Words for Everyday Life - Basic Vocabulary #4",
    description:
      "In this series, we will teach you the core 800 Japanese words that you must know if you're a an absolute beginnerWith each new episodes in this series, we’ll include the previous lessons at the end.",
    embedLink: "https://www.youtube.com/embed/EK4YZPd7XE8",
  },
  {
    id: 3,
    title:
      "Body Parts in Japanese | からだのパーツ】face/かお, body/からだ, mouth/くち, hand/てvocabulary",
    description:
      "You will learn different parts of the body with body parts pictures , English and Japanese. I read each words twice. The first time is normal and second is slower. ",
    embedLink: "https://www.youtube.com/embed/j6YuhK6T5f4",
  },
  {
    id: 4,
    title: "Japanese Vocabulary & Phrases | 40 Things You See Outside",
    description:
      "Whenever I want perfect enunciation and fairly easy to digest sentences, I come here !!! Plus Tanaka's radio voice is sooo soothing for my soul ",
    embedLink: "https://www.youtube.com/embed/YxHMFaz2_6w",
  },
  {
    id: 5,
    title: "100 Informal Japanese Phrases for Beginner",
    description: "100 Informal Japanese Phrases for Beginner",
    embedLink: "https://www.youtube.com/embed/ogqeb9TLO8A",
  },
];

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
  const { userRole } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    youtubeLink: "",
  };

  // Form submission handler
  const handleSubmit = (values) => {
    console.log("Form Data: ", values);
  };

  return (
    <div>
      <SectionWrapper>
        <div className="flex justify-end space-x-4">
          {userRole === 1 && (
            <button
              className="btn btn-success btn-outline"
              onClick={() => setOpen(true)}
            >
              Add Video
            </button>
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-8 bg-gray-50">
          {videoData.map((video) => (
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
