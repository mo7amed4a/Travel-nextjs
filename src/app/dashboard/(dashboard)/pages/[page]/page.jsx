"use client";
import React, { useEffect, useState } from "react";
import { Axios } from "@/lib/api/Axios";
import { Button, Modal } from "flowbite-react";
import { AiOutlineDelete, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import toast from "react-hot-toast";
import TableBooking from "@/components/dashboard/TableBooking";
import Link from "next/link";

export default function Pages({ params }) {
  const { page } = params;
  const [sections, setSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/pages/${page}/sections`);
        setSections(res.data.data.sections);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the section visibility
    }));
  };

  const handleDeleteClick = (section) => {
    setSelectedSection(section);
    setIsModalOpenDelete(true);
  };

  const deleteSection = async () => {
    try {
      const res = await Axios.delete(
        `/pages/${page}/sections/${selectedSection._id}`
      );
      setSections((prev) =>
        prev.filter((sec) => sec._id !== selectedSection._id)
      );
      setIsModalOpenDelete(false);
      toast.success("Section deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="h-screen bg-gray-100 w-full">
        {sections.length > 0 ? (
          <TableBooking
            title={page + " sections"}
            description={page + " page section "}
            values={sections}
            Buttons={(item) => (
              <>
                {/* <Button color="failure" onClick={() => handleDeleteClick(item)}>
                  <AiOutlineDelete className="mr-2" /> Delete
                </Button> */}
                <Button as={Link} href={`${page}/edit/${item._id}`}>
                  Edit
                </Button>
              </>
            )}
          />
        ) : (
          <p>No sections available.</p>
        )}

      {selectedSection && (
        <Modal
          show={isModalOpenDelete}
          onClose={() => setIsModalOpenDelete(false)}
        >
          <Modal.Header>Delete Section</Modal.Header>
          <Modal.Body>Are you sure you want to delete this section?</Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={deleteSection}>
              Delete
            </Button>
            <Button onClick={() => setIsModalOpenDelete(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
