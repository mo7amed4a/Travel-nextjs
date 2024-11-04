"use client";
import { Axios } from "@/lib/api/Axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Label } from "flowbite-react";

export default function BookingForm({id}) {
     const validationSchema = Yup.object({
    name: Yup.string()
      .required("Full Name is required")
      .min(2, "Full Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    number: Yup.string().required("Number is required"),
    date: Yup.date()
      .required("Date is required")
      .nullable()
      .min(new Date(), "Date must be in the future"),
    message: Yup.string(),
    packageId: Yup.string().required("Package ID is required"),
    options: Yup.array()
      .of(Yup.string())
      .required("At least one option is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
  });

  async function booking(values) {
    try {
      const res = await Axios.post(`/bookings`, values);
      toast.success("Booking successful");
    } catch (error) {
      console.error(
        "Error booking:",
        error.response ? error.response.data : error
      );
      toast.error(error?.response?.data?.message);
    }
  }

  const initialValues = {
    name: "",
    email: "",
    number: "",
    message: "",
    date: null,
    packageId: id,
    options: [],
    city: "",
    country: "",
  };
  return (
    <div className="bg-gray-100 p-4 space-y-4">
      <div className="bg-secondary-500 text-center p-5 text-white text-xl font-semibold">
        Booking
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={booking}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border-gray-300"
                placeholder="Full Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border-gray-300"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                type="text"
                name="number"
                className="w-full p-2 border-gray-300"
                placeholder="Number"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                type="text"
                name="city"
                className="w-full p-2 border-gray-300"
                placeholder="City"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                type="text"
                name="country"
                className="w-full p-2 border-gray-300"
                placeholder="country"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                type="date"
                name="date"
                className="w-full p-2 border-gray-300"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as="textarea"
                name="message"
                className="w-full p-2 border-gray-300"
                placeholder="Enter your message"
              />
            </div>
            <p>Add Options</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="options"
                  value="tour guide"
                  onChange={() => {
                    const newValue = values.options.includes("tour guide")
                      ? values.options.filter(
                          (option) => option !== "tour guide"
                        )
                      : [...values.options, "tour guide"];
                    setFieldValue("options", newValue);
                  }}
                />
                <Label htmlFor="tourguide" className="flex">
                  Tour guide
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="options"
                  value="dinner"
                  onChange={() => {
                    const newValue = values.options.includes("dinner")
                      ? values.options.filter((option) => option !== "dinner")
                      : [...values.options, "dinner"];
                    setFieldValue("options", newValue);
                  }}
                />
                <Label htmlFor="dinner" className="flex">
                  dinner
                </Label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-secondary-500 text-white py-2 rounded"
            >
              Book Now
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
