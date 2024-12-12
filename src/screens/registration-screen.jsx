import React from "react";
import { useFormik } from "formik";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useCreateNewUser } from "../react-query/auth";
import Swal from "sweetalert2";

const RegistrationScreen = () => {
  const create_user = useCreateNewUser();
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      photo: null,
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      photo: Yup.mixed()
        .required("Photo is required")
        .test(
          "fileFormat",
          "Unsupported file format",
          (value) => value && ["image/jpeg", "image/png"].includes(value.type)
        ),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      values.photo = "";
      const res = await create_user.mutateAsync(values);
      if (res.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
       return navigation("/");
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("photo", event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Register
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full px-4 py-2 mt-1 border bg-transparent ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-2 mt-1 border bg-transparent ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Photo Upload Field */}
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-600"
            >
              Profile Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="w-full mt-1"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
            {formik.touched.photo && formik.errors.photo && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.photo}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full px-4 py-2 mt-1 border bg-transparent ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 flex items-center justify-center"
            disabled={create_user.isLoading}
          >
            {create_user.isLoading ? (
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8z"
                ></path>
              </svg>
            ) : null}
            {create_user.isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Navigation to Login */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink to="/" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegistrationScreen;
