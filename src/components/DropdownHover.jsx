"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";


const subMenu = ["Packages", "Daytours"];

const DropdownHover = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);

  const handleCategoryClick = (country, submenu, category) => {
    const link = `/${country.toLowerCase()}/${submenu.toLowerCase()}/${category
      .toLowerCase()
      // .replace(/ /g, " ")
    }`;
    router.push(link);
  };


  const {data:dataLocation} = useFetch('/location')
  const {data:dataCategories} = useFetch('/package/allCategorys');

  useEffect(() => {
    if (dataCategories?.data?.categories) setCategories([...new Set(dataCategories.data.categories.map(e=> e.toLowerCase()))]);
    if (dataLocation?.data?.locations) setCountries(dataLocation.data.locations);
  }, [dataLocation, dataCategories])


  // لإغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };



  }, []);

  return (
    <div className="relative inline-block text-start dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-start block py-2 pl-3 pr-4 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-secondary-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
      >
        DESTINATIONS
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute start-0 z-10 mt-2 w-full md:w-48"
        >
          {countries.map((country) => (
            <div
              key={country.country}
              className="group relative w-full md:w-48"
              onMouseEnter={() => setHoveredCountry(country.country)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <button className="block w-full text-left px-4 py-2 text-sm bg-primary-500 rounded-full my-1 text-white hover:bg-yellow-300">
                {country.country}
              </button>

              {hoveredCountry === country.country && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full md:top-0 md:start-full w-full md:w-48 z-10 bg-white md:bg-transparent rounded-lg shadow-lg px-2 py-2 md:py-0"
                >
                  {subMenu.map((submenu) => (
                    <div
                      key={submenu}
                      className="group relative"
                      onMouseEnter={() => setHoveredSubMenu(submenu)}
                      onMouseLeave={() => setHoveredSubMenu(null)}
                    >
                      <button className="block w-full text-left px-4 py-2 text-sm bg-primary-500 rounded-full my-1 text-white hover:bg-yellow-300">
                        {submenu}
                      </button>

                      {hoveredSubMenu === submenu && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full md:top-0 md:start-full w-full md:w-48 z-10 bg-white md:bg-transparent rounded-lg shadow-lg px-2 py-2 md:py-0"
                        >
                          {categories.map((category) => (
                            <div
                              key={category}
                              className="cursor-pointer bg-primary-500 rounded-full my-1 text-white hover:bg-yellow-300 px-4 py-2"
                              onClick={() =>
                                handleCategoryClick(country.country, submenu, category)
                              }
                            >
                              {category}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DropdownHover;
