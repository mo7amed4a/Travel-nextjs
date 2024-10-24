'use client';
import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import useFetch from "@/hooks/useFetch";
import { Axios } from "@/lib/api/Axios";
import * as Yup from "yup";
import { Form, Formik } from "formik"; 
import toast from "react-hot-toast";
import PaginationClient from "@/components/global/paginationDashboard";
import TableBooking from "@/components/dashboard/TableBooking";

import dynamic from 'next/dynamic';
const RichBlog = dynamic(() => import("@/components/blog/RichBlog"), {
  ssr: false,
});

export default function GetAllBlogs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, setReload } = useFetch(
    `/posts?pageNumber=${currentPage}&POST_PER_PAGE=10`
  );

  const posts = data?.data?.posts;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"), // إضافة تحقق للعنوان
    description: Yup.string().required("Description is required"), // إضافة تحقق للوصف
  });

  const handleEditClick = (post) => {
    setSelectedFaq(post);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (post) => {
    setSelectedFaq(post);
    setIsModalOpenDelete(true);
  };

  const deleteHandel = async () => {
    try {
      const res = await Axios.delete(`/posts/${selectedFaq._id}`);
      setReload((prev) => !prev);
      setIsModalOpenDelete(false);
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    posts && (
      <div className="w-full">
        <TableBooking
          title={"Blogs"}
          values={posts}
          Buttons={(post) => (
            <>
              <Button onClick={() => handleEditClick(post)}>Edit</Button>
              <Button color={"failure"} onClick={() => handleDeleteClick(post)}>
                Delete
              </Button>
            </>
          )}
          description={"Blogs List"}
          className="w-full"
        />
        <PaginationClient
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages || 1}
        />

        {selectedFaq && (
          <Modal size="6xl" show={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Modal.Header>Edit blog</Modal.Header>
            <Modal.Body className="space-y-4">
              <div className="my-2 space-y-1">
                <p>
                  <span className="font-bold">Title:</span> {selectedFaq.title}
                </p>
              </div>

              <Formik
                initialValues={{
                  title: selectedFaq.title || "", // تعيين القيم من selectedFaq
                  description: selectedFaq.description || "", // تعيين القيم من selectedFaq
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  
                  try {
                    const res = await Axios.patch(`/posts/${selectedFaq._id}`, {
                      title: values.title,
                      description: values.description,
                    });
                    setReload((prev) => !prev);
                    setIsModalOpen(false);
                    toast.success("Blog edited successfully");
                  } catch (error) {
                    toast.error(error?.response?.data?.message);
                  }
                }}
              >
                {({ setFieldValue, values, errors, touched }) => (
                  <Form>
                    <TextInput
                      type="text"
                      name="title"
                      placeholder="Enter title here"
                      onChange={(e) => setFieldValue("title", e.target.value)} // استخدام setFieldValue مباشرة
                      value={values.title}
                      className={`${
                        errors.title && touched.title && "ring-2 rounded-lg ring-red-500"
                      }`}
                    />
                    <div className="my-2"></div>
                    <RichBlog
                      setFieldValue={setFieldValue}
                      description={values.description}
                    />
                    {touched.description && errors.description && (
                      <div className="text-red-500 text-sm pt-1">
                        {errors.description}
                      </div>
                    )}
                    <Modal.Footer>
                      <Button type="submit">Save</Button>
                      <Button color="failure" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        )}

        {selectedFaq && (
          <Modal
            show={isModalOpenDelete}
            onClose={() => setIsModalOpenDelete(false)}
          >
            <Modal.Header>Delete blog</Modal.Header>
            <Modal.Body>Do you want to delete this blog?</Modal.Body>
            <Modal.Footer>
              <Button color="failure" onClick={deleteHandel}>
                Delete
              </Button>
              <Button onClick={() => setIsModalOpenDelete(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    )
  );
}
