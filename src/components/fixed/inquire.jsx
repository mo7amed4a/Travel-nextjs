"use client";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import FaqForm from "../faqs/faqForm";

export default function InquireApp() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-20 right-10 animate-pulse"
        onClick={() => setOpenModal(true)}
      >
        <FaQuestionCircle className="text-5xl bg-primary-500/70 text-white p-3 cursor-pointer rounded-full" />
      </div>
      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div>
            <h1 className="font-bold text-primary-500 pb-2">
              STILL HAVE A QUESTION?
            </h1>
            <FaqForm />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
