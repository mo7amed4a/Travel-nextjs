'use client';
import React, { useState } from "react";
import TableBooking from "@/components/dashboard/TableBooking";
import { Button, Modal } from "flowbite-react";
import useFetch from "@/hooks/useFetch";
import { Axios } from "@/lib/api/Axios";
import toast from "react-hot-toast";
import PaginationDashboard from "@/components/global/paginationDashboard";

export default function Users() {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, setReload } = useFetch(
    `/user?page=${currentPage}&limit=10`
  );

  const users = data?.data;



  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsModalOpenDelete(true);
  };

  const deleteHandel = async () => {
    try {
        const res = await Axios.delete(`/user/${selectedUser._id}`);
        setReload((prev) => !prev);
        setIsModalOpenDelete(false);
        toast.success("User deleted successfully");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
  };

  return (
    users && (
      <div className="w-full">
        <TableBooking
          title={"Users"}
          values={users}
          Buttons={(user) => (
            <>
             {!user?.isAdmin && <Button color={"failure"} onClick={() => handleDeleteClick(user)}>
                Delete
              </Button>}
            </>
          )}
          description={"Users List"}
          className="w-full"
        />
        <PaginationDashboard
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages}
        />

        {selectedUser && (
          <Modal
            show={isModalOpenDelete}
            onClose={() => setIsModalOpenDelete((e) => !e)}
          >
            <Modal.Header>Delete user</Modal.Header>
            <Modal.Body>Do you want delete this user?</Modal.Body>
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
