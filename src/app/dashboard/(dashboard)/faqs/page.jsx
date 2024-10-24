"use client";
import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import useFetch from "@/hooks/useFetch";
import { Axios } from "@/lib/api/Axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import TableBooking from "@/components/dashboard/TableBooking";
import PaginationClient from "@/components/global/paginationDashboard";

export default function Answer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, setReload } = useFetch(
    `/faq/answer?page=${currentPage}&limit=10`
  );

  const faqs = data?.data?.faqs;

  const validationSchema = Yup.object({
    answer: Yup.string().required("Answer is required for edit"),
  });

  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await Axios.patch(`/faq/${selectedFaq._id}`, {
          answer: values.answer,
        });
        setReload((prev) => !prev);
        setIsModalOpen(false);
        toast.success("Answer edited successfully");
      } catch (error) {
        toast.error(error?.response?.data?.message);
    }
      
    },
  });

  const handleEditClick = (faq) => {
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (faq) => {
    setSelectedFaq(faq);
    setIsModalOpenDelete(true);
  };

  const deleteHandel = async () => {
    try {
      const res = await Axios.delete(`/faq/${selectedFaq._id}`);
      setReload((prev) => !prev);
      setIsModalOpenDelete(false);
      toast.success("FAQ deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    faqs && (
      <div className="w-full">
        <TableBooking
          title={"Faqs"}
          values={faqs}
          Buttons={(faq) => (
            <>
              <Button onClick={() => handleEditClick(faq)}>Edit</Button>
              <Button color={"failure"} onClick={() => handleDeleteClick(faq)}>
                Delete
              </Button>
            </>
          )}
          description={"Faqs list with answer"}
          className="w-full"
        />
        <PaginationClient
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages || 1}
        />

        {selectedFaq && (
          <Modal show={isModalOpen} onClose={() => setIsModalOpen((e) => !e)}>
            <Modal.Header>Edit FAQ</Modal.Header>
            <Modal.Body>
              <div className="my-2 space-y-1">
                <p>
                  <span className="font-bold">Question:</span>{" "}
                  {selectedFaq.question}
                </p>
                <p>
                  <span className="font-bold">Answer:</span>{" "}
                  {selectedFaq.answer}
                </p>
              </div>
              <TextInput
                type="text"
                name="answer"
                placeholder="Enter your FAQ question here"
                onChange={formik.handleChange}
                value={formik.values.answer}
                className={`${
                  formik.errors.answer &&
                  formik.touched.answer &&
                  "ring-2 rounded-lg ring-red-500"
                }`}
              />
              {formik.touched.answer && formik.errors.answer ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.answer}
                </div>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={formik.handleSubmit}>Save</Button>
              <Button color="failure" onClick={() => setIsModalOpen((e) => !e)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {selectedFaq && (
          <Modal
            show={isModalOpenDelete}
            onClose={() => setIsModalOpenDelete((e) => !e)}
          >
            <Modal.Header>Delete FAQ</Modal.Header>
            <Modal.Body>Do you want delete this faq?</Modal.Body>
            <Modal.Footer>
              <Button color="failure" onClick={deleteHandel}>
                Delete
              </Button>
              <Button onClick={() => setIsModalOpenDelete((e) => !e)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    )
  );
}
