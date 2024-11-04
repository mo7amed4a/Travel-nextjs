'use client';
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Axios } from "@/lib/api/Axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
export default function SignUpPage() {
  const router = useRouter()
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await Axios.post(`/auth/register`, values);
        if (response.data.status === "SUCCESS") {
          router.push("/auth/login");
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        const err = error?.response?.data?.message || error?.message;
        toast.error(err);
      }
    },
  });

  return (
    <div className="shadow-lg rounded-lg bg-white px-6 pb-3 md:pb-6 md:pt-6  w-full mx-4 md:w-3/4 lg:w-2/4 xl:w-1/3">
      <form className="flex flex-col space-y-1 md:space-y-5" onSubmit={formik.handleSubmit}>
        <h1 className="py-3 md:py-5">
          <Link href="/" className="flex items-center justify-center">
            <img src="/images/logoapp.png" alt="Logo" className="w-32" />
          </Link>
        </h1>

        {/* First Name and Last Name */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName" className="text-sm pb-1 text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className={`border rounded p-2 ${
                formik.errors.firstName && formik.touched.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lastName" className="text-sm pb-1 text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className={`border rounded p-2 ${
                formik.errors.lastName && formik.touched.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm pb-1 text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`border rounded p-2 ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-sm pb-1 text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={`border rounded p-2 ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="confirmPassword"
              className="text-sm pb-1 text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className={`border rounded p-2 ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600"
          >
            Sign Up
          </button>
        </div>
        <div className="flex justify-between w-full text-secondary-500 text-xs md:text-base">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
          <Link href={"/auth/login"}>Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}
