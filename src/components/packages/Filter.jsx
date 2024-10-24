'use client';
import { useEffect, useState } from "react";
import { Button, Modal, Select } from "flowbite-react";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { IoFilterOutline } from "react-icons/io5";

const CountryTypeSelector = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [categories, setCategories] = useState([]);
  const [country, setCountry] = useState([]);

  const handleSelectCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = () => {
    console.log(selectedType);
    console.log(selectedCountry);
    router.push(`/${encodeURIComponent(selectedCountry)}/packages/${encodeURIComponent(selectedType)}`);
    // router.push(`/${selectedCountry}/packages/${selectedType}`)
    setModalOpen(false); 
  };

  const {data} = useFetch('/package/allCategorys')
  const {data:dataLocation} = useFetch('/location')

  useEffect(() => {
    setCategories(data?.data?.categories)
    setCountry(dataLocation?.data?.country)

  }, [data, dataLocation])
// console.log(data?.data?.categories);

  return (
    <div className="container mx-auto max-w-[1100px] px-4 mb-10">
      <Button onClick={() => setModalOpen(true)}>
        Filter Packages
        <IoFilterOutline className="ml-2 h-5 w-5" />
      </Button>

      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-4">
            <Select
              onChange={handleSelectCountry}
              placeholder="country"
              required
            >
              {
                country && country.length === 1 && <option >select country</option>
              }
              {
                country && country.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))
              }
            </Select>

            <Select
              onChange={handleSelectType}
              placeholder="package type"
              required
            >
              {
                categories && categories.length === 1 && <option >select</option>
              }
              {
                categories && categories.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))
              }
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Sreach</Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CountryTypeSelector;
