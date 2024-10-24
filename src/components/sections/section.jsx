"use client";
import { Axios } from "@/lib/api/Axios";
import { Button, TextInput, FileInput, Label } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function SectionComponents() {
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({ file, description: "" }));
    setImages(newImages);
  };

  const handleDescriptionChange = (index, description) => {
    const updatedImages = [...images];
    updatedImages[index].description = description;
    setImages(updatedImages);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const addLinkField = () => {
    setLinks([...links, { label: "", url: "" }]);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("العنوان مطلوب"),
    content: Yup.string().required("المحتوى مطلوب"),
    order: Yup.number().required("الترتيب مطلوب"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("order", values.order);

    // Ensure images array is handled properly
    if (images.length > 0) {
      (images || []).forEach((image, index) => {
        formData.append(`images`, image.file);
        formData.append(`images[${index}][description]`, image.description);
      });
    }

    // Ensure links array is handled properly
    if (links.length > 0) {
      (links || []).forEach((link, index) => {
        formData.append(`links[${index}][label]`, link.label);
        formData.append(`links[${index}][url]`, link.url);
      });
    }

    console.log("Submitted values: ", {
      title: values.title,
      content: values.content,
      order: values.order,
      images,
      links,
    });

    try {
      const response = await Axios.post(`/pages/packages/sections`, formData);
      toast.success("Submission successful");
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMsg);
    }

    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          content: "",
          order: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <div className="md:w-2/4 flex flex-col space-y-10 items-center">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-500">
              Section Form
            </h2>
            <Form className="grid grid-cols-1 gap-4 w-full p-6 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col gap-4">
                <Field
                  name="title"
                  as={TextInput}
                  placeholder="العنوان"
                  sizing="lg"
                  className="text-right"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="content"
                  as={TextInput}
                  placeholder="المحتوى"
                  sizing="lg"
                  className="text-right"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="order"
                  type="number"
                  as={TextInput}
                  placeholder="الترتيب"
                  sizing="lg"
                  className="text-right"
                />
                <ErrorMessage
                  name="order"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* File Input for Multiple Images */}
                <div className="flex flex-col mb-4">
                  <Label htmlFor="file-upload" value="Upload Images" />
                  <FileInput
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    helperText="Upload multiple images"
                  />
                </div>

                {/* Dynamic Description Inputs Based on Images */}
                {(images || []).map((image, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Label value={`وصف الصورة ${index + 1}`} />
                    <TextInput
                      placeholder="وصف الصورة"
                      value={image.description}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}

                {/* Link Fields */}
                {(links || []).map((link, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Label value={`الرابط ${index + 1}`} />
                    <TextInput
                      placeholder="وصف الرابط"
                      value={link.label}
                      onChange={(e) =>
                        handleLinkChange(index, "label", e.target.value)
                      }
                    />
                    <TextInput
                      placeholder="الرابط"
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(index, "url", e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addLinkField}
                  className="w-full py-2 bg-blue-500 text-white"
                >
                  أضف رابط آخر
                </Button>
              </div>

              <div className="col-span-full flex justify-center">
                <Button
                  type="submit"
                  color="primary"
                  className="w-full font-bold py-3 text-white bg-green-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
