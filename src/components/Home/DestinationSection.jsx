import { Axios, baseURL } from "@/lib/api/Axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default async function DestinationSection() {
  
  let data;
  try {
    data = await Axios.get(`/package?PACKAGE_PER_PAGE=4&pageNumber=1`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  const {packages} = data?.data?.data;

  return (
    <>
      <div
        className="container mx-auto overflow-x-hidden"
        style={{ marginTop: "200px" }}
      >
        <div>
          <div className="flex items-center justify-center sm:justify-start">
            <div className="w-24 bg-red-500 h-[3px] inline-block"></div>
            <p className="ml-2" style={{ color: "red" }}>
              POPULAR DESTINATION
            </p>
          </div>

          <div
            className="w-[90%] flex flex-col sm:flex-row mb-[50px] text-center sm:text-left items-center sm:items-start"
            style={{ justifyContent: "space-between" }}
          >
            <h2
              className="font-bold mb-4 sm:mb-0"
              style={{
                fontSize: "40px",
              }}
            >
              TOP NOTCH DESTINATION
            </h2>

            <p>
              Aperiam sociosqu urna praesent, tristique, corrupti <br />{" "}
              condimentum asperiores platea ipsum ad arcu. Nostrud. Aut <br />{" "}
              nostrum, ornare quas provident laoreet nesciunt.
            </p>
          </div>
        </div>

       {packages && packages?.length > 0 && 
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 container max-w-7xl mx-auto">

{packages.map((item, index) => (
  <Link href={`/packages/${item?.slug}`} key={index}
    className="bg-purple-500 text-white shadow-lg overflow-hidden flex items-end relative"
    style={{
      // backgroundImage: `url(${decodeURIComponent(baseURL + item?.image[0]?.url)})`,
      // backgroundSize: "cover",
      // // backgroundPosition: "center",
      // backgroundRepeat: "no-repeat",
      height: "300px",
      border: "8px white solid",
    }}
  >
    {item?.image[0]?.url && <Image src={baseURL + item?.image[0]?.url} className="absolute object-cover w-full h-full inset-0 z-0" alt="Image" width={500} height={500} />}
    {/* الطبقة الشفافة الداكنة */}
    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
    <div className="p-4 relative z-10">
    <span className="bg-blue-600 text-white px-2 py-1 rounded capitalize">
      {item?.location?.split('-')[0]}
    </span>
    <h3 className="mt-2 text-lg font-semibold">{item?.location?.split('-')?.length > 1 && packages[0]?.location?.split('-')[1]}</h3>
    {/* <div className="flex mt-2">⭐⭐⭐⭐⭐</div> */}
  </div>
  </Link>
)) }


        </div>
        }
      </div>

      <div className=" flex  justify-center text-center mt-6">
        <button className="bg-red-500 text-white  px-3.5 py-2.5">
          MORE DESTINATION
        </button>
      </div>
    </>
  );
}
