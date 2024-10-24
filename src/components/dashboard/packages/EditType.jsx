import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Axios } from "@/lib/api/Axios";
import toast from "react-hot-toast";

export default function EditTypeModal({
  selected,
  setReload=null,
  isModalOpenEditType,
  closeModal,
  setIsModalOpenEditType,
  setModalEditType,
}) {
  const [pricingItems, setPricingItems] = useState(selected?.pricing || [
    { numUser: "", pricePerUser: "" },
  ]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    pricing: Yup.array().of(
      Yup.object({
        numUser: Yup.string().required("Number of users is required"),
        pricePerUser: Yup.number().required("Price per user is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: selected?.name || '',
      pricing: pricingItems,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await Axios.patch(
          `/type-package/${selected?._id}`,{
              ...values
          }
        );
        toast.success("Type added successfully");
        setReload && setReload((prev) => !prev);
        closeModal()
        setModalEditType(null)
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "An error occurred. Please try again."
        );
      }
      setIsModalOpenEditType(perv => !perv); // إغلاق الـ Modal بعد الحفظ
    },
  });

  // إضافة عنصر جديد للتسعير
  const addPricingItem = () => {
    setPricingItems([...pricingItems, { numUser: "", pricePerUser: "" }]);
    formik.setFieldValue("pricing", [
      ...formik.values.pricing,
      { numUser: "", pricePerUser: "" },
    ]);
  };

  // تعديل قيمة التسعير
  const handlePricingChange = (index, field, value) => {
    const updatedPricing = [...pricingItems];
    updatedPricing[index][field] = value;
    setPricingItems(updatedPricing);
    formik.setFieldValue("pricing", updatedPricing);
  };

  return (
    <Modal show={isModalOpenEditType} onClose={() => setIsModalOpenEditType(false)}>
      <Modal.Header>Add New Type</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <label className="block font-bold">Name:</label>
            <TextInput
              name="name"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className={`${
                formik.errors.name &&
                formik.touched.name &&
                "ring-2 rounded-lg ring-red-500"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block font-bold">Pricing:</label>
            {pricingItems.map((item, index) => (
              <div key={index} className="flex space-x-2 my-2">
                <TextInput
                  type="text"
                  placeholder="Number of users"
                  value={item.numUser}
                  onChange={(e) =>
                    handlePricingChange(index, "numUser", e.target.value)
                  }
                />
                <TextInput
                  type="number"
                  placeholder="Price per user"
                  value={item.pricePerUser}
                  onChange={(e) =>
                    handlePricingChange(index, "pricePerUser", e.target.value)
                  }
                />
              </div>
            ))}
            <Button onClick={addPricingItem}>Add Pricing</Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={formik.handleSubmit}>Save</Button>
        <Button color="gray" onClick={()=> setIsModalOpenEditType(perv => !perv)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
