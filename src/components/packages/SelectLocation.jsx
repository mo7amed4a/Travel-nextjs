'use client';
import { useEffect, useState } from "react";
import { Select } from "flowbite-react";
import useFetch from "@/hooks/useFetch";

export default function SelectLocation ({setFieldValue}) {
  const [country, setCountry] = useState([]);

  const handleSelectCountry = (event) => {
    setFieldValue('location', event.target.value)
   };

  const {data:dataLocation} = useFetch('/location')

  useEffect(() => {
    setCountry(dataLocation?.data?.country)
  }, [dataLocation])

  return (
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
     
  );
};
