"use client";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Axios } from "@/lib/api/Axios";
import toast from "react-hot-toast";
import { UserContext } from "@/Context/Usercontext";
import Link from "next/link";
import Cookies from 'js-cookie';

export default function LoginPage() {
    const { setAuthorization, setUserdata } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    async function login(values) {
        try {
            const response = await Axios.post(`/auth/login`, values);
            if (response.data.status === "SUCCESS") {
                const user = { ...response.data.data.user, password: undefined };
                const token = response.data.token;
                Cookies.set("Userdata", JSON.stringify(user), { expires: 7 });
                Cookies.set("Authorization", token, { expires: 7 });
                setUserdata(user);
                setAuthorization(token);
                toast.success("Login successful");
                setTimeout(() => {
                    window.location.href = "/";
                }, 500);
            } else {
                setErrorMessage(
                    response.data.message || "Login failed. Please try again."
                );
            }
        } catch (error) {
            const errorMsg = error.response
                ? error.response.data.message
                : "An unexpected error occurred.";
            toast.error(errorMsg);
            setErrorMessage(errorMsg);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        
        validationSchema: validationSchema,
        onSubmit: login,
    });

    return (
        <div className="shadow-2xl rounded bg-white p-4 w-full mx-4 md:w-3/4 lg:w-2/4 xl:w-1/4">
            <form className="flex flex-col space-y-5" onSubmit={formik.handleSubmit}>
                <h1 className="py-3 md:py-5">
                    <Link href="/" className="flex items-center justify-center">
                        <img src="/images/logoapp.png" alt="Logo" className="w-32" />
                    </Link>
                </h1>

                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm pb-1 text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps("email")}
                        className={`border ${
                            formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded p-2`}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm pb-1 text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...formik.getFieldProps("password")}
                        className={`border ${
                            formik.touched.password && formik.errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded p-2`}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className="w-full pt-2 flex justify-center">
                    <button
                        type="submit"
                        className="py-3 px-4 bg-secondary-500 w-full text-center text-white font-semibold hover:bg-secondary/90 duration-100"
                    >
                        Login
                    </button>
                </div>

                <div className="flex justify-between w-full text-secondary-500 text-xs md:text-base">
                    <Link href="/auth/signup">You don't have an account?</Link>
                    <Link href="/auth/forgot-password">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}
