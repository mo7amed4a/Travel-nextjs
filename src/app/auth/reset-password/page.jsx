'use client'
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Axios } from "@/lib/api/Axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function ResetPasswordPage() {
  const router = useRouter()
  const validationSchema = Yup.object({
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
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await Axios.post(`/auth/reset-password`, {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        if (response.data.status === "success") {
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
    <div className="shadow-lg rounded-lg bg-white p-6 w-full mx-4 md:w-3/4 lg:w-2/4 xl:w-1/3">
      <form className="flex flex-col space-y-5" onSubmit={formik.handleSubmit}>
        <h1 className="py-3 md:py-5">
          <Link href="/" className="flex items-center justify-center">
            <img src="/images/logoapp.png" alt="Logo" className="w-32" />
          </Link>
        </h1>

        {/* Email */}
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

        {/* Password */}
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
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Confirm Password */}
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

        {/* Submit Button */}
        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600"
          >
            Reset Password
          </button>
        </div>
      </form>
      <div className="flex justify-between w-full text-secondary-500 text-xs md:text-base">
        <Link href={"/auth/login"}>Do you want to login?</Link>
        <Link href="/auth/signup">You don't have an account?</Link>
      </div>
    </div>
  );
}
