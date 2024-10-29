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

export default function locations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedLocation, setSelectedFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, setReload } = useFetch(
    `/location?page=${currentPage}&limit=10`
  );

  const locations = data?.data?.locations;

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
        const res = await Axios.patch(`/locations/${selectedLocation._id}`, {
          answer: values.answer,
        });
        setReload((prev) => !prev);
        setIsModalOpen(false);
        toast.success("Location edited successfully");
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
      const res = await Axios.delete(`/location/${selectedLocation._id}`);
      setReload((prev) => !prev);
      setIsModalOpenDelete(false);
      toast.success("Location deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    locations && (
      <div className="w-full">
        <TableBooking
          title={"Locations"}
          values={locations}
          Buttons={(faq) => (
            <>
              {/* <Button onClick={() => handleEditClick(faq)}>Edit</Button> */}
              <Button color={"failure"} onClick={() => handleDeleteClick(faq)}>
                Delete
              </Button>
            </>
          )}
          description={"Locations list"}
          className="w-full"
        />
        <PaginationClient
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages || 1}
        />

        {selectedLocation && (
          <Modal show={isModalOpen} onClose={() => setIsModalOpen((e) => !e)}>
            <Modal.Header>Edit Location</Modal.Header>
            <Modal.Body>
              <div className="my-2 space-y-1">
                <p>
                  <span className="font-bold">Country:</span>{" "}
                  {selectedLocation.country}
                </p>
                <p>
                  <span className="font-bold">City:</span>{" "}
                  {selectedLocation.city}
                </p>
              </div>
              <TextInput
                type="text"
                name="country"
                placeholder="Enter your country here"
                onChange={formik.handleChange}
                value={formik.values.country}
                className={`${
                  formik.errors.country &&
                  formik.touched.country &&
                  "ring-2 rounded-lg ring-red-500"
                }`}
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.country}
                </div>
              ) : null}
              <TextInput
                type="text"
                name="country"
                placeholder="Enter your city here"
                onChange={formik.handleChange}
                value={formik.values.city}
                className={`${
                  formik.errors.city &&
                  formik.touched.city &&
                  "ring-2 rounded-lg ring-red-500"
                }`}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.city}
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

        {selectedLocation && (
          <Modal
            show={isModalOpenDelete}
            onClose={() => setIsModalOpenDelete((e) => !e)}
          >
            <Modal.Header>Delete Location</Modal.Header>
            <Modal.Body>Do you want delete this location?</Modal.Body>
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
