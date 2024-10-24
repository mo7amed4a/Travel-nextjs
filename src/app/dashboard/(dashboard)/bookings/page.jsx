'use client';
import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import useFetch from "@/hooks/useFetch";
import { Axios } from "@/lib/api/Axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import TableBooking from "@/components/dashboard/TableBooking";
import PaginationClient from "@/components/global/paginationDashboard";

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, setReload } = useFetch(
    `/bookings?pageNumber=${currentPage}&BOOKING_PER_PAGE=10` // تحديث الرابط إلى API الخاص بالبيانات
  );

  const bookings = data?.data?.bookings;

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    number: Yup.string().required("Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await Axios.patch(`/bookings/${selectedBooking._id}`, {
          name: values.name,
          email: values.email,
          number: values.number,
        });
        setReload((prev) => !prev);
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    formik.setValues({
      name: booking.name,
      email: booking.email,
      number: booking.number,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpenDelete(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await Axios.delete(`/bookings/${selectedBooking._id}`);
      setReload((prev) => !prev);
      setIsModalOpenDelete(false);
      toast.success("Booking deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    bookings && (
      <div className="w-full">
        <TableBooking
          title={"Bookings"}
          values={bookings}
          Buttons={(booking) => (
            <>
              {/* <Button onClick={() => handleEditClick(booking)}>Edit</Button> */}
              <Button color={"failure"} onClick={() => handleDeleteClick(booking)}>
                Delete
              </Button>
            </>
          )}
          description={"Bookings List"}
          className="w-full"
        />
        <PaginationClient
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages || 1}
        />

        {selectedBooking && (
          <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Modal.Header>Edit Booking</Modal.Header>
            <Modal.Body className="space-y-4">
              <TextInput
                type="text"
                name="name"
                placeholder="Enter name here"
                onChange={formik.handleChange}
                value={formik.values.name}
                className={`${
                  formik.errors.name && formik.touched.name && "ring-2 rounded-lg ring-red-500"
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm pt-1">{formik.errors.name}</div>
              )}
              <TextInput
                type="text"
                name="email"
                placeholder="Enter email here"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={`${
                  formik.errors.email && formik.touched.email && "ring-2 rounded-lg ring-red-500"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm pt-1">{formik.errors.email}</div>
              )}
              <TextInput
                type="text"
                name="number"
                placeholder="Enter number here"
                onChange={formik.handleChange}
                value={formik.values.number}
                className={`${
                  formik.errors.number && formik.touched.number && "ring-2 rounded-lg ring-red-500"
                }`}
              />
              {formik.touched.number && formik.errors.number && (
                <div className="text-red-500 text-sm pt-1">{formik.errors.number}</div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={formik.handleSubmit}>Save</Button>
              <Button color="failure" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {selectedBooking && (
          <Modal
            show={isModalOpenDelete}
            onClose={() => setIsModalOpenDelete(false)}
          >
            <Modal.Header>Delete Booking</Modal.Header>
            <Modal.Body>Do you want to delete this booking?</Modal.Body>
            <Modal.Footer>
              <Button color="failure" onClick={deleteHandler}>
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
