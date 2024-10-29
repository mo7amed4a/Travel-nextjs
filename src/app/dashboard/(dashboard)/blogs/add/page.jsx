"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, FileInput, Label } from "flowbite-react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Axios } from "@/lib/api/Axios";
import toast from "react-hot-toast";

import dynamic from "next/dynamic";
import { titleToSlug } from "@/utils/title";
const RichBlog = dynamic(() => import("@/components/blog/RichBlog"), {
  ssr: false,
});

const AddBlog = () => {
  const LocalStorageName_ = "blog description";
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("titleOutSide", values.titleOutSide);
    formData.append("descriptionOutSide", values.descriptionOutSide);

    formData.append("title", values.title);
    formData.append("slug", titleToSlug(values.slug));
    formData.append("description", values.description);
    formData.append("category", values.category);

    values.tags.forEach((tag) => formData.append("tags[]", tag));

    images.forEach((image) => formData.append("images", image));

    try {
      const response = await Axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // resetForm();
      setImages([]);
      toast.success("Blog added successfully");
      localStorage.removeItem(LocalStorageName_);
    } catch (error) {
      console.error(
        "Error uploading data:",
        error.response ? error.response.data : error.message
      );
      toast.error(error?.response?.data?.message);
    } finally {
      // setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between gap-6 my-10">
        <section className="w-full">
          <Card className="w-full">
            <Formik
              initialValues={{
                title: "",
                slug: "",
                description: "",
                category: "",
                tags: [""],
                descriptionOutSide: "",
                titleOutSide: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => {
                useEffect(() => {
                  setFieldValue("slug", titleToSlug(values.title));
                }, [values.title, setFieldValue]);
                return (
                  <Form className="flex flex-col">
                    <div className="flex flex-col mb-4">
                      <label htmlFor="titleOutSide" className="mb-2">
                        Title Out Side
                      </label>
                      <Field
                        type="text"
                        id="titleOutSide"
                        name="titleOutSide"
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <label htmlFor="descriptionOutSide" className="mb-2">
                        Description Out Side
                      </label>
                      <Field
                        type="text"
                        id="descriptionOutSide"
                        name="descriptionOutSide"
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <label htmlFor="title" className="mb-2">
                        Title
                      </label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <label htmlFor="slug" className="mb-2">
                        Url
                      </label>
                      <Field
                        type="text"
                        id="slug"
                        name="slug"
                        value={values.slug}
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex flex-col mb-4">
                      <label htmlFor="category" className="mb-2">
                        Category
                      </label>
                      <Field
                        type="text"
                        id="category"
                        name="category"
                        value={values.category}
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>
                    

                    <div className="flex flex-col mb-4 ">
                      <label htmlFor="description" className="mb-2">
                        Description
                      </label>
                      <RichBlog
                        name={LocalStorageName_}
                        setFieldValue={setFieldValue}
                        description={values.description} // تمرير القيمة
                      />
                    </div>

                    

                    <FieldArray name="tags">
                      {({ push, remove }) => (
                        <div className="flex flex-col mb-4">
                          <label className="mb-2">Tags</label>
                          {values.tags.map((tag, index) => (
                            <div key={index} className="flex items-center mb-2">
                              <Field
                                name={`tags.${index}`}
                                className="p-2 border border-gray-300 rounded mr-2"
                                placeholder="Enter a tag"
                              />
                              {values.tags.length > 1 && (
                                <Button
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button type="button" onClick={() => push("")}>
                            Add Tag
                          </Button>
                        </div>
                      )}
                    </FieldArray>

                    <div className="flex flex-col mb-4">
                      <Label htmlFor="file-upload" value="Upload Image" />
                      <FileInput
                        id="file-upload"
                        onChange={handleImageChange}
                        helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                        multiple
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AddBlog;
