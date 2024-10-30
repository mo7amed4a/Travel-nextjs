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
    // Set defaults if no selection is made
    const countryToNavigate = selectedCountry || country[0];
    const typeToNavigate = selectedType || categories[0];

    router.push(`/${encodeURIComponent(countryToNavigate)}/packages/${encodeURIComponent(typeToNavigate)}`);
    setModalOpen(false); 
  };

  const {data} = useFetch('/package/allCategorys');
  const {data: dataLocation} = useFetch('/location');

  useEffect(() => {
    if (data?.data?.categories) setCategories(data.data.categories);
    if (dataLocation?.data?.locations) setCountry(dataLocation.data.locations);

    // Set initial values if available
    setSelectedCountry(dataLocation?.data?.locations?.[0]?.country || null);
    setSelectedType(data?.data?.categories?.[0] || null);

  }, [data, dataLocation]);

  return country && country.length > 0 && categories && categories.length > 0 && (
    <div className="container mx-auto max-w-[1100px] px-4 mb-10">
      <Button onClick={() => setModalOpen(true)}>
        Filter Packages
        <IoFilterOutline className="ml-2 h-5 w-5" />
      </Button>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-4">
            <Select
              onChange={handleSelectCountry}
              placeholder="country"
              required
            >
              {country && country.length === 1 && <option>Select Country</option>}
              {country && country.map((item, index) => (
                <option key={index} value={item.country} className="capitalize">{item.country}-{item.city}</option>
              ))}
            </Select>

            <Select
              onChange={handleSelectType}
              placeholder="package type"
              required
              value={selectedType || ''}
            >
              {categories && categories.length === 1 && <option>Select Type</option>}
              {categories && categories.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Search</Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CountryTypeSelector;
