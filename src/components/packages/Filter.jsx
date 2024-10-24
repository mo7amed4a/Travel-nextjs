'use client';
import { useState } from "react";
import { Button, Modal, Select } from "flowbite-react";

const CountryTypeSelector = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSelectCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Selected Country:", selectedCountry);
    console.log("Selected Type:", selectedType);
    setModalOpen(false); // إغلاق النافذة بعد الاختيار
  };

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>اختيار البلد والنوع</Button>

      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header>اختيار البلد والنوع</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-4">
            <Select
              onChange={handleSelectCountry}
              placeholder="اختر البلد"
              required
            >
              <option value="">اختر البلد</option>
              <option value="Egypt">مصر</option>
              <option value="Saudi Arabia">السعودية</option>
              <option value="Jordan">الأردن</option>
              {/* أضف المزيد من الخيارات حسب الحاجة */}
            </Select>

            <Select
              onChange={handleSelectType}
              placeholder="اختر النوع"
              required
            >
              <option value="">اختر النوع</option>
              <option value="Type1">نوع 1</option>
              <option value="Type2">نوع 2</option>
              <option value="Type3">نوع 3</option>
              {/* أضف المزيد من الخيارات حسب الحاجة */}
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>إرسال</Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CountryTypeSelector;
