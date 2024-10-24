"use client";

import useFetch from "@/hooks/useFetch";
import { Axios, baseURL } from "@/lib/api/Axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [imageDeleteSrc, setImageDeleteSrc] = useState(null);
  const { data, loading, error, setReload } = useFetch(`/ImagesPlogs`);

  const openModal = (image) => {
    setIsOpenDelete((prev) => !prev);
    setImageDeleteSrc(image);
  };

  const handelDeleteImage = async () => {
    let url = imageDeleteSrc.split(baseURL);
    url.length > 1 ? (url = url[1]) : (url = imageDeleteSrc);
    try {
      const res = await Axios.post(`/ImagesPlogs/delete`, {
        imageName: url,
      });

      if (res?.data?.success === true) {
        toast.success("Image deleted successfully");
        setReload((prev) => !prev);
        setIsOpenDelete(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image deleted failed.");
    }
  };
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.images?.map((item, index) => {
          return (
            <div key={index} className="relative">
              <Button
                color="failure"
                onClick={()=>openModal(item)}
                className="absolute top-2 end-2"
              >
                Delete
              </Button>
              <img className="rounded-md" src={baseURL + item} />
            </div>
          );
        })}
      </div>
      <Modal
        show={isOpenDelete}
        onClose={() => setIsOpenDelete((prev) => !prev)}
      >
        <Modal.Header>Delete image</Modal.Header>
        <Modal.Body>
          <img src={baseURL + imageDeleteSrc} alt="image" />
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button color="failure" onClick={handelDeleteImage}>
            Delete
          </Button>
          <Button onClick={() => setIsOpenDelete(false)}>close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
