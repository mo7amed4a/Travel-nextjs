"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Axios } from "@/lib/api/Axios";

export default function AddLocation() {
  const [openModal, setOpenModal] = useState(false);
  
  const PackageCountrySchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    city: Yup.string(), // جعل city غير مطلوب
  });

  async function addPackageCountry(values, { resetForm }) {
    const packageCountry = {
      country: values.country,
      city: values.city || "", // إذا كانت المدينة غير موجودة، أرسل قيمة فارغة
    };

    try {
      const response = await Axios.post("/location", packageCountry);
      toast.success("Location created successfully!");
      resetForm();
      console.log(response);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      toast.error("Failed to create location.");
    }
  }

  return (
    <>
      <div>
        <Button onClick={() => setOpenModal(true)} color="primary">Add Location</Button>
      </div>
      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header className="-mb-4" />
        <Modal.Body className="pt-0">
          <div>
            <h1 className="font-bold text-primary">Add Location</h1>
            <Formik
              initialValues={{
                country: "",
                city: "",
              }}
              validationSchema={PackageCountrySchema}
              onSubmit={addPackageCountry}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form className="grid lg:grid-cols-6 gap-4 mt-5">
                  <section className="lg:col-span-full">
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-2">
                        <label htmlFor="country" className="mb-1 text-sm">
                          Country
                        </label>
                        <Field
                          type="text"
                          name="country"
                          className="p-1 border border-gray-300 rounded"
                        />
                        {errors.country && touched.country && (
                          <div className="text-red-500 text-xs">
                            {errors.country}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <label htmlFor="city" className="mb-1 text-sm">
                          City (optional)
                        </label>
                        <Field
                          type="text"
                          name="city"
                          className="p-1 border border-gray-300 rounded"
                        />
                        {errors.city && touched.city && (
                          <div className="text-red-500 text-xs">
                            {errors.city}
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="mt-2 bg-secondary-500 text-white p-2 rounded text-sm"
                      >
                        Add Location
                      </button>
                    </div>
                  </section>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
