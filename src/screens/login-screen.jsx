import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth-layout/auth-context";
import { useCreateNewUser, useLoginUser } from "../react-query/auth";
import Swal from "sweetalert2";

const LoginScreen = () => {
  const { setUserRole, setUser } = useContext(AuthContext);
  const login_user = useLoginUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const res = await login_user.mutateAsync(values);
      if (res.success) {
        localStorage.setItem("access-token", res.token);
        localStorage.setItem("user", JSON.stringify(res));
        setUserRole(res.role);
        setUser(res);
        navigate(res.role === 1 ? "lessons/dashboard" : "/lessons");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "wrong credential",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/vocabulary-word-cloud-concept-grey-background-88381567.jpg')",
        }}
      ></div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-gray-600"
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

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-gray-600"
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
          <h1 />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            disabled={login_user.isLoading}
          >
            {login_user.isLoading ? (
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
            {login_user.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Redirect to Registration */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <NavLink to="/registration" className="text-blue-500 hover:underline">
            Registration
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
