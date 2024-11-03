'use client';
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Axios, baseURL } from "@/lib/api/Axios";
import toast from "react-hot-toast";
import { Label, TextInput, Textarea, Button, FileInput } from "flowbite-react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { page, id } = useParams();
  const [sectionData, setSectionData] = useState({
    title: "",
    content: "",
    order: 1,
    images: [],
    links: [],
  });

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const url = `/pages/${page}/sections`;
        const res = await Axios.get(url);
        if (res.data && res.data.data && res.data.data.sections) {
          const { title, content, order, images, links } =
            res.data.data.sections[0];
          const formattedImages = images.map((image) => ({
            url: image.url || "",
            title: image.title || "",
            description: image.description || "",
            file: null,
          }));
          setSectionData({
            title,
            content,
            order,
            images: formattedImages,
            links,
          });
        } else {
          toast.error("No data found");
        }
      } catch (error) {
        toast.error("Failed to fetch section data");
      }
    };

    fetchSectionData();
  }, [id, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: "",
      title: "",
      description: "",
      file,
    }));
    setSectionData((prev) => ({
      ...prev,
      images: [...newImages],
    }));
  };

  const handleImageDescriptionChange = (index, description) => {
    setSectionData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index].description = description;
      return { ...prev, images: updatedImages };
    });
  };

  const handleImageTitleChange = (index, title) => {
    setSectionData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index].title = title;
      return { ...prev, images: updatedImages };
    });
  };

  const handleLinkChange = (index, label, url) => {
    setSectionData((prev) => {
      const updatedLinks = [...prev.links];
      updatedLinks[index] = { label, url };
      return { ...prev, links: updatedLinks };
    });
  };

  const addNewLinkField = () => {
    setSectionData((prev) => ({
      ...prev,
      links: [...prev.links, { label: "", url: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `/pages/${page}/sections`;
      const formData = new FormData();

      formData.append("title", sectionData.title);
      formData.append("content", sectionData.content);
      formData.append("order", sectionData.order);

      sectionData.images.forEach((image, index) => {
        if (image.file) {
          formData.append(`images`, image.file);
        }
        formData.append(`images[${index}][title]`, image.title);
        formData.append(`images[${index}][description]`, image.description);
      });

      sectionData.links.forEach((link, index) => {
        formData.append(`links[${index}][label]`, link.label);
        formData.append(`links[${index}][url]`, link.url);
      });

      const response = await Axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Section updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update section");
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Edit {page.split("SectionData").join(" section")}</h1>
        <Button as={Link} href={`/dashboard/pages/${page}`}>Back</Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            name="title"
            value={sectionData.title || ""}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="content" value="Content" />
          <Textarea
            id="content"
            name="content"
            value={sectionData.content || ""}
            onChange={handleChange}
            placeholder="Enter content"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="images" value="Images" />
          <FileInput
            id="images"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
          {sectionData.images.map((image, index) => (
            <div key={index} className="mt-2 w-full">
              <TextInput
                placeholder="Image Title"
                value={image.title || ""}
                onChange={(e) => handleImageTitleChange(index, e.target.value)}
                className="w-full mt-2"
              />

              <TextInput
                placeholder="Image Description"
                value={image.description || ""}
                onChange={(e) =>
                  handleImageDescriptionChange(index, e.target.value)
                }
                className="w-full mt-2"
              />
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-semibold">Links</h2>
          {sectionData.links.map((link, index) => (
            <div key={index} className="flex space-x-4 mt-2 w-full">
              <TextInput
                placeholder="Label"
                value={link.label || ""}
                onChange={(e) =>
                  handleLinkChange(index, e.target.value, link.url)
                }
                className="w-full"
              />
              <TextInput
                placeholder="URL"
                value={link.url || ""}
                onChange={(e) =>
                  handleLinkChange(index, link.label, e.target.value)
                }
                className="w-full"
              />
            </div>
          ))}
          <Button onClick={addNewLinkField} type="button" className="mt-4">
            Add New Link
          </Button>
        </div>

        <Button type="submit" gradientDuoTone="cyanToBlue" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
}
