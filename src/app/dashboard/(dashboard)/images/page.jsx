"use client";

import ImageAndGrid from "@/components/images/ImagesGrid";
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
    <div className="w-full space-y-7">
      <div>
        <h2 className="text-xl font-bold">Images</h2>
        <p className="text-gray-500">Images for blog and package description</p>
      </div>

      <ImageAndGrid images={data?.images} openModal={openModal} />

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
