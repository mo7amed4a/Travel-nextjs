"use client";
import React, { useContext, useState } from "react";
import { Avatar , Button, FileInput, Modal, Table } from "flowbite-react";
import { Axios, baseURL } from "@/lib/api/Axios";
import { UserContext } from "@/Context/Usercontext";
import toast from "react-hot-toast";
import { formatISODate } from "@/utils/formatDate";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

const UserSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required")
});

export default function ProfilePage() {
  const { Userdata, setUserdata } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await Axios.post(`user/profile-photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const user = { ...response?.data?.user, password: undefined };
      Cookies.set("Userdata", JSON.stringify(user), { expires: 365 * 1, path: '/' });
      setUserdata(user);
      toast.success("Profile image updated successfully");
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      const response = await Axios.patch(`user`, values);
      const user = { ...response?.data?.data, password: undefined };
      Cookies.set("Userdata", JSON.stringify(user), { expires: 365 * 1, path: '/' });
      setUserdata(user);
      toast.success("User information updated successfully");
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return Userdata && (
    <div>
      <section
        className="px-2 bg-[#555555] h-[50vh] object-cover bg-no-repeat bg-bottom flex justify-start items-end font-bold"
        style={{ backgroundImage: "url(/images/slider-pattern.png)" }}
      >
        <div className="container bg-white rounded p-3 shadow-md mx-auto px-4 flex flex-col items-start [&>div]:px-0">
          <div className="flex justify-center md:justify-between w-full">
            <div className="relative">
              <Avatar
                size="xl"
                bordered
                img={
                  Userdata?.profilePhoto?.startsWith("http")
                    ? Userdata?.profilePhoto
                    : `${baseURL}${Userdata?.profilePhoto}`
                }
                rounded
              />
              <span
                onClick={() => setModalOpen(true)}
                className="cursor-pointer absolute bottom-0 end-0 bg-secondary/40 rounded-sm p-1 text-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1 w-full items-center md:items-start">
            <div className="flex gap-x-2 items-center">
              <h1 className="text-lg md:text-4xl pt-4 text-opacity-85">
                {Userdata?.firstName} {Userdata?.lastName}
              </h1>
              <span className="flex items-center h-full cursor-pointer" onClick={() => setUpdateModalOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mt-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-600">{Userdata?.email}</p>
          </div>
        </div>
      </section>
      <section className="mt-10 container mx-auto px-3 hi">
        <Table striped={true} hoverable>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>{Userdata?.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Is Admin</Table.Cell>
              <Table.Cell>{Userdata?.isAdmin ? "Yes" : "No"}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Role</Table.Cell>
              <Table.Cell>{Userdata?.role}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Created At</Table.Cell>
              <Table.Cell>{formatISODate(Userdata?.createdAt)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Updated At</Table.Cell>
              <Table.Cell>{formatISODate(Userdata?.updatedAt)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>

      {/* Modal for updating profile image */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Update Image</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitImage}>
            <FileInput onChange={handleImageChange} required />
            <Button type="submit" className="mt-4">
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <Modal.Header>Update User Information</Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              firstName: Userdata.firstName,
              lastName: Userdata.lastName
            }}
            validationSchema={UserSchema}
            onSubmit={handleUpdateUser}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium "
                  >
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    className="mt-1 p-2 block w-full rounded-md border border-secondary-500 shadow-sm focus:border-secondary-500 focus:ring-secondary"
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="text-red-500">{errors.firstName}</div>
                  ) : null}
                </div>
                <div className="mt-">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    name="lastName"
                    className="mt-1 p-2 block w-full rounded-md border border-secondary-500 shadow-sm focus:border-secondary-500 focus:ring-secondary"
                    />
                  {errors.lastName && touched.lastName ? (
                    <div className="text-red-500">{errors.lastName}</div>
                  ) : null}
                </div>
                <Button type="submit" className="mt-4">
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}
