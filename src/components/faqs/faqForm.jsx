"use client"

import * as Yup from "yup";
import { useFormik } from "formik";
import { Axios } from "@/lib/api/Axios";
import toast from "react-hot-toast";

export default function FaqForm() {
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        question: Yup.string().required("Question is required"),
      });
    
      const formik = useFormik({
        
        initialValues: {
          name: "",
          email: "",
          phone: "",
          question: ""
        },
        validationSchema,
        onSubmit: async (values) => {
          try {
            const res = await Axios.post(`/faq`, {
              name: values.name,
              email: values.email,
              phone: values.phone.toString(),
              question: values.question,
            });
            toast.success(res?.data?.message);
          }
          catch (error) {
            toast.error(error?.response?.data?.message);
          }
        },
      });

  return (
    <form
    onSubmit={formik.handleSubmit}
    className="flex flex-col space-y-5 py-2 [&>div>input]:text-black [&>div>textarea]:text-black"
  >
    <div className="text-start">
      <input
        type="text"
        name="name"
        placeholder="Your Name*"
        onChange={formik.handleChange}
        value={formik.values.name}
        className={`w-full ${formik.errors.name && formik.touched.name && 'border border-red-500'}`}
    
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="text-red-500 text-sm pt-1">
          {formik.errors.name}
        </div>
      ) : null}
    </div>
    <div className="text-start">
      <input
        type="email"
        name="email"
        placeholder="Your email*"
        onChange={formik.handleChange}
        value={formik.values.email}
        className={`w-full ${formik.errors.email && formik.touched.email && 'border border-red-500'}`}
    
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-500 text-sm pt-1">
          {formik.errors.email}
        </div>
      ) : null}
    </div>
    <div className="text-start">
      <input
        type="number"
        name="phone"
        placeholder="Your phone*"
        onChange={formik.handleChange}
        value={formik.values.phone}
        className={`w-full ${formik.errors.phone && formik.touched.phone && 'border border-red-500'}`}
    
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div className="text-red-500 text-sm pt-1">
          {formik.errors.phone}
        </div>
      ) : null}
    </div>
    <div className="text-start">
      <textarea
        name="question"
        placeholder="Enter your question*"
        onChange={formik.handleChange}
        value={formik.values.question}
        className={`w-full ${formik.errors.question && formik.touched.question && 'border border-red-500'}`}
    
      ></textarea>
      {formik.touched.question && formik.errors.question ? (
        <div className="text-red-500 text-sm pt-1">
          {formik.errors.question}
        </div>
      ) : null}
    </div>
    <div className="flex justify-start">
      <button
        type="submit"
        className="bg-primary-500 text-white inline-block font-bold p-3 cursor-pointer"
      >SUBMIT QUESTIONS</button>
    </div>
  </form>
  )
}
