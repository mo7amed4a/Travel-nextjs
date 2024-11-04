"use client";

import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Axios } from "@/lib/api/Axios";

import dynamic from "next/dynamic";
import AddLocation from "@/components/packages/AddLocation";
import SelectLocation from "@/components/packages/SelectLocation";
import Link from "next/link";
import { titleToSlug } from "@/utils/title";
const RichBlog = dynamic(() => import("@/components/blog/RichBlog"), {
  ssr: false,
});

const PackageSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  titleOutSide: Yup.string().required("title out side is required"),
  description: Yup.string().required("Description is required"),
  descriptionOutSide: Yup.string().required("Description out side is required"),
  duration: Yup.object().shape({
    day: Yup.number().required("Day is required").min(1),
    nights: Yup.number().required("Nights are required").min(1),
  }),
  location: Yup.string().required("Location is required"),
  category: Yup.string().required("Category is required"),
  descriptionMeta: Yup.string().required("descriptionMeta is required"),
  keywords: Yup.string().required("Keywords are required"), // إضافة الحقل هنا
  program: Yup.object().shape({
    title: Yup.string().required("Program title is required"),
    description: Yup.string().required("Program description is required"),
    programItem: Yup.array()
      .of(
        Yup.object().shape({
          day: Yup.number().required("Day is required").min(1),
          description: Yup.string().required(
            "Program item description is required"
          ),
        })
      )
      .required("At least one program item is required"),
  }),
});

export default function PackageEdit() {
  const LocalStorageName_ = "package description"
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [days, setDays] = useState(1);
  const [nights, setNights] = useState(1);

  const handleDaysChange = (e) => {
    const daysValue = parseInt(e.target.value, 10) || 0;
    setDays(daysValue);
  };

  const handleNightsChange = (e) => {
    const nightsValue = parseInt(e.target.value, 10) || 0;
    setNights(nightsValue);
  };

  async function addPackage(values, { resetForm }) {
    const packageData = {
      titleOutSide: values.titleOutSide,
      descriptionOutSide: values.descriptionOutSide,
      title: values.title,
      slug: titleToSlug(values.slug),
      description: values.description,
      duration: {
        day: days,
        nights: nights,
      },
      location: values.location,
      category: values.category,
      program: {
        title: values.program.title,
        description: values.program.description,
        programItem: values.program.programItem,
      },
      descriptionMeta: values.descriptionMeta,
      keyword: values.keywords,
    };

    try {
      const response = await Axios.post("/package", packageData);
      toast.success("Package created successfully!");
      localStorage.removeItem(LocalStorageName_)
      resetForm();
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      toast.error("Failed to create package.");
    }
  }

  

  return (
    <div className="container mx-auto mb-5">
      <div className="flex justify-end gap-x-5 -mb-4">
        <Button as={Link} href="/dashboard/packages/locations" color="light">Locations</Button>
        <AddLocation />
      </div>
      <Formik
        initialValues={{
          title: "",
          titleOutSide: "",
          slug: "",
          descriptionOutSide: "",
          description: "",
          duration: {
            day: 1,
            nights: 1,
          },
          location: "",
          category: "",
          program: {
            title: "",
            description: "",
            programItem: [{ day: 1, description: "" }],
          },
          descriptionMeta: "",
          keywords: "",
        }}
        validationSchema={PackageSchema}
        onSubmit={addPackage}
        
      >
        {({ values, setFieldValue, errors, touched }) => {
          useEffect(() => {
            setFieldValue("slug", titleToSlug(values.title))
          }, [values.title, setFieldValue]); 
          return(
          <Form className="grid lg:grid-cols-6 gap-6 mt-9">
            <section className="w-full lg:col-span-full">
              <Card>
                <div className="flex flex-col">
                  <div className="flex flex-col mb-4">
                    <label htmlFor="titleOutSide" className="mb-2">
                      Title Out Side
                    </label>
                    <Field
                      type="text"
                      name="titleOutSide"
                      className="p-2 border border-gray-300 rounded"
                    />
                    {errors.titleOutSide && touched.titleOutSide && (
                      <div className="text-red-500 text-sm">
                        {errors.titleOutSide}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col mb-4">
                    <label htmlFor="descriptionOutSide" className="mb-2">
                      Description Out Side
                    </label>
                    <Field
                      // as="textarea"
                      name="descriptionOutSide"
                      rows="5"
                      className="p-2 border border-gray-300 rounded resize-none"
                    />
                    {errors.descriptionOutSide &&
                      touched.descriptionOutSide && (
                        <div className="text-red-500 text-sm">
                          {errors.descriptionOutSide}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col mb-4">
                    <label htmlFor="title" className="mb-2">
                      Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="p-2 border border-gray-300 rounded"
                    />
                    {errors.title && touched.title && (
                      <div className="text-red-500 text-sm">{errors.title}</div>
                    )}
                  </div>

                  <div className="flex flex-col mb-4">
                    <label htmlFor="title" className="mb-2">
                      Url
                    </label>
                    <Field
                      type="text"
                      name="slug"
                      value={values.slug}
                      className="p-2 border border-gray-300 rounded"
                    />
                    {errors.title && touched.title && (
                      <div className="text-red-500 text-sm">{errors.title}</div>
                    )}
                  </div>

                  <div className="flex flex-col mb-4">
                    
                    <RichBlog
                      name={LocalStorageName_}
                      setFieldValue={setFieldValue}
                      description={values.description}
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500 text-sm">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 mb-4">
                    <div className="flex flex-col">
                      <label htmlFor="days" className="mb-2">
                        Days
                      </label>
                      <Field
                        type="number"
                        name="days"
                        value={days}
                        onChange={handleDaysChange}
                        className="p-2 border border-gray-300 rounded"
                        min={0}
                      />
                      {errors.days && touched.days && (
                        <div className="text-red-500 text-sm">
                          {errors.days}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="nights" className="mb-2">
                        Nights
                      </label>
                      <Field
                        type="number"
                        name="nights"
                        value={nights}
                        onChange={handleNightsChange}
                        className="p-2 border border-gray-300 rounded"
                        min={0}
                      />
                      {errors.nights && touched.nights && (
                        <div className="text-red-500 text-sm">
                          {errors.nights}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-col mb-4">
                      <label htmlFor="location" className="mb-2">
                        Location
                      </label>
                      <SelectLocation setFieldValue={setFieldValue} />
                      {errors.location && touched.location && (
                        <div className="text-red-500 text-sm">
                          {errors.location}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col mb-4">
                      <label htmlFor="category" className="mb-2">
                        Category
                      </label>
                      <Field
                        type="text"
                        name="category"
                        className="p-2 border border-gray-300 rounded"
                      />
                      {errors.category && touched.category && (
                        <div className="text-red-500 text-sm">
                          {errors.category}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col mb-4">
                    <label htmlFor="program.title" className="mb-2">
                      Program Title
                    </label>
                    <Field
                      type="text"
                      name="program.title"
                      className="p-2 border border-gray-300 rounded"
                    />
                    {errors.program?.title && touched.program?.title && (
                      <div className="text-red-500 text-sm">
                        {errors.program.title}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col mb-4">
                    <label htmlFor="program.description" className="mb-2">
                      Program Description
                    </label>
                    <Field
                      as="textarea"
                      name="program.description"
                      rows="3"
                      className="p-2 border border-gray-300 rounded resize-none"
                    />
                    {errors.program?.description &&
                      touched.program?.description && (
                        <div className="text-red-500 text-sm">
                          {errors.program.description}
                        </div>
                      )}
                  </div>

                  <FieldArray
                    name="program.programItem"
                    render={(arrayHelpers) => (
                      <div>
                        <label className="mb-2">Program days</label>
                        {values.program.programItem &&
                        values.program.programItem.length > 0
                          ? values.program.programItem.map((item, index) => (
                              <div key={index} className="flex gap-x-4 my-2">
                                <div>
                                  <Field
                                    type="number"
                                    name={`program.programItem.${index}.day`}
                                    placeholder={`Day ${index + 1}`}
                                    className="p-2 border border-gray-300 rounded w-20"
                                    min={1}
                                  />
                                  {errors.program?.programItem?.[index]?.day &&
                                    touched.program?.programItem?.[index]
                                      ?.day && (
                                      <div className="text-red-500 text-sm">
                                        {errors.program.programItem[index].day}
                                      </div>
                                    )}
                                </div>

                                <div className="w-full md:w-2/4">
                                  <div className="flex gap-x-4">
                                    <Field
                                      type="text"
                                      name={`program.programItem.${index}.description`}
                                      placeholder="Program description"
                                      className="p-2 border border-gray-300 rounded w-full"
                                    />
                                    <div className="flex items-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          values.program.programItem.length ===
                                          1
                                            ? (values.program.programItem[0].day = 1)
                                            : arrayHelpers.remove(index)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="size-6"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  {errors.program?.programItem?.[index]
                                    ?.description &&
                                    touched.program?.programItem?.[index]
                                      ?.description && (
                                      <div className="text-red-500 text-sm">
                                        {
                                          errors.program.programItem[index]
                                            .description
                                        }
                                      </div>
                                    )}
                                </div>
                              </div>
                            ))
                          : null}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              day: values.program.programItem.length + 1,
                              description: "",
                            })
                          }
                          className="mt-2 text-secondary-500 hover:text-secondary-700"
                        >
                          Add Program Item
                        </button>
                      </div>
                    )}
                  />

<div className="flex flex-col mb-4">
                    <label htmlFor="descriptionMeta" className="mb-2">
                    descriptionMeta
                    </label>
                    <Field
                    
                      name="descriptionMeta"
                      rows="5"
                      className="p-2 border border-gray-300 rounded resize-none"
                    />
                    {errors.descriptionMeta &&
                      touched.descriptionMeta && (
                        <div className="text-red-500 text-sm">
                          {errors.descriptionMeta}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col mt-4">
                    <label htmlFor="keywords" className="mb-2">
                      Keywords
                    </label>
                    <Field
                      as="textarea"
                      name="keywords"
                      rows="3"
                      className="p-2 border border-gray-300 rounded resize-none"
                    />
                    {errors.keywords && touched.keywords && (
                      <div className="text-red-500 text-sm">
                        {errors.keywords}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-4 bg-secondary-500 text-white p-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </Card>
            </section>
          </Form>
        )}}
      </Formik>
    </div>
  );
}
