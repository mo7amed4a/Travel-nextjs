"use client";
import useFetch from "@/hooks/useFetch";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";

export default function SocialHeader() {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.length >= 1) {
      window.location.href = `/blogs?search=${searchText}`;
    }
  };

  const { data } = useFetch("/pages/social/sections");

  return (
    <>
      {/* Contact Information */}
      <ul className="flex gap-x-4 p-4">
        <li>
          <a
            href={`tel:${
              data?.data?.sections[0]?.links?.find(
                (entry) => entry.label === "mobile"
              )?.url
            }`}
            className="flex gap-x-1 items-center"
          >
            <i className="fas fa-phone-alt"></i>
            <span className="hidden md:block">
              {
                data?.data?.sections[0]?.links?.find(
                  (entry) => entry.label === "mobile"
                )?.url
              }
            </span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${
              data?.data?.sections[0]?.links?.find(
                (entry) => entry.label === "email"
              )?.url
            }`}
            className="flex gap-x-1 items-center"
          >
            <i className="fas fa-envelope"></i>
            <span className="hidden md:block">
              {
                data?.data?.sections[0]?.links?.find(
                  (entry) => entry.label === "email"
                )?.url
              }
            </span>
          </a>
        </li>
        <li>
          <a className="flex gap-x-1 items-center">
            <i className="fas fa-map-marker-alt"></i>
            <span className="hidden md:block">
                {data?.data?.sections[0]?.links?.find(
                  (entry) => entry.label === "location"
                )?.url}
            </span>
          </a>
        </li>
      </ul>
      {/* Social Media Links and Search Modal */}
      <ul className="flex justify-end gap-x-4 px-4">
        <li>
          <a
            href={
              data?.data?.sections[0]?.links?.find(
                (entry) => entry.label === "facebook"
              )?.url
            }
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a
            href={
              data?.data?.sections[0]?.links?.find(
                (entry) => entry.label === "linkedin"
              )?.url
            }
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a
            href={
              data?.data?.sections[0]?.links?.find(
                (entry) => entry.label === "x"
              )?.url
            }
          >
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a
            href={
              data?.data?.sections[0]?.links?.find(
                (entry) => entry.label === "instagram"
              )?.url
            }
          >
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li className="border-s ps-2">
          <a
            onClick={() => setOpenModal(!openModal)}
            className="fa fa-search cursor-pointer"
          ></a>
        </li>
      </ul>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Search</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="search" value="Search" />
            </div>
            <TextInput
              id="search"
              type="search"
              placeholder="Search.."
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          {searchText}
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSearch()}>Search</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
