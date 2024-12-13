import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import {
  useUpdateVocabulary,
  useVocabulary,
} from "../../react-query/vocabulary";
import { useGetLessons } from "../../react-query/lessons";
import Loading from "../../components/common/loading";
import Swal from "sweetalert2";

export default function UpdateVocabulary() {
  const navigation = useNavigate();
  const { id } = useParams();
  const vocabulary = useVocabulary(id);
  const lessons = useGetLessons();
  const update = useUpdateVocabulary();

  const formik = useFormik({
    initialValues: {
      id: "",
      word: "",
      meaning: "",
      pronunciation: "",
      whenToSay: "",
      lessonNo: "",
    },
    validationSchema: Yup.object({
      word: Yup.string().required("Word is required"),
      meaning: Yup.string().required("Meaning is required"),
      pronunciation: Yup.string().required("Pronunciation is required"),
      whenToSay: Yup.string().required("This field is required"),
      lessonNo: Yup.string().required("Lesson number is required"),
    }),
    onSubmit: async (values) => {
      const res = await update.mutateAsync(values);
      if (res.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "update successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigation("/lessons/content-management");
    },
  });

  useEffect(() => {
    if (!vocabulary.data) return;
    formik.setFieldValue("id", vocabulary.data._id);
    formik.setFieldValue("word", vocabulary.data.word);
    formik.setFieldValue("meaning", vocabulary.data.meaning);
    formik.setFieldValue("pronunciation", vocabulary.data.pronunciation);
    formik.setFieldValue("whenToSay", vocabulary.data.whenToSay);
    formik.setFieldValue("lessonNo", vocabulary.data.lessonNo);
  }, [vocabulary.data]);

  if (lessons.isLoading || vocabulary.isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen py-20">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg bg-white bg-opacity-90 rounded-lg shadow-lg p-8 backdrop-filter backdrop-blur-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Add Vocabulary
        </h2>

        {/* Word Field */}
        <div className="mb-4">
          <label
            htmlFor="word"
            className="block text-gray-700 font-semibold mb-2"
          >
            Word
          </label>
          <input
            type="text"
            id="word"
            name="word"
            value={formik.values.word}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.word && formik.errors.word
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.word && formik.errors.word && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.word}</p>
          )}
        </div>

        {/* Meaning Field */}
        <div className="mb-4">
          <label
            htmlFor="meaning"
            className="block text-gray-700 font-semibold mb-2"
          >
            Meaning
          </label>
          <textarea
            id="meaning"
            name="meaning"
            value={formik.values.meaning}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.meaning && formik.errors.meaning
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.meaning && formik.errors.meaning && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.meaning}</p>
          )}
        </div>

        {/* Pronunciation Field */}
        <div className="mb-4">
          <label
            htmlFor="pronunciation"
            className="block text-gray-700 font-semibold mb-2"
          >
            Pronunciation
          </label>
          <input
            type="text"
            id="pronunciation"
            name="pronunciation"
            value={formik.values.pronunciation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.pronunciation && formik.errors.pronunciation
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.pronunciation && formik.errors.pronunciation && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.pronunciation}
            </p>
          )}
        </div>

        {/* When To Say Field */}
        <div className="mb-4">
          <label
            htmlFor="whenToSay"
            className="block text-gray-700 font-semibold mb-2"
          >
            When to Say
          </label>
          <input
            type="text"
            id="whenToSay"
            name="whenToSay"
            value={formik.values.whenToSay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.whenToSay && formik.errors.whenToSay
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.whenToSay && formik.errors.whenToSay && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.whenToSay}
            </p>
          )}
        </div>

        {/* Lesson Number Field */}
        <div className="mb-4">
          <label
            htmlFor="lessonNo"
            className="block text-gray-700 font-semibold mb-2"
          >
            Lesson Number
          </label>
          <select
            id="lessonNo"
            name="lessonNo"
            value={formik.values.lessonNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 border rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.lessonNo && formik.errors.lessonNo
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="" label="Select a lesson" />
            {lessons.data.map((x) => {
              return <option value={x._id} label={x.title} />;
            })}
          </select>
          {formik.touched.lessonNo && formik.errors.lessonNo && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.lessonNo}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Update Vocabulary
        </button>
      </form>
    </div>
  );
}
