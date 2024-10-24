import { Axios } from "@/lib/api/Axios";
import { Button } from "flowbite-react";
import PackageComponent from "@/components/packages/packageComponent";
import Link from "next/link";

export default async function PackageSection() {
  
  let data;
  try {
    data = await Axios.get(`/package?PACKAGE_PER_PAGE=3&pageNumber=1`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  const {packages} = data?.data?.data;

  return (
    <div className="mt-[100px]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center mb-4">
          <div className="w-24 bg-red-500 h-[3px] inline-block"></div>
          <p className="ml-2 text-red-500 uppercase font-semibold text-sm">
            Explore great places
          </p>
        </div>

        <h2 className="text-5xl font-bold mb-4">Popular Packages</h2>

        <p className="text-lg text-gray-600 max-w-2xl">
          Mollit voluptatem perspiciatis convallis elementum corporis quo
          veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing
          repudiandae eius cursus? Nostrum magnis maxime curae placeat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-8 px-4 mx-auto  max-w-[1100px]">
        {packages && packages
          ?.map((item, index) => (
            <PackageComponent packageItem={item} key={index} />
          ))}
      </div>

      <div className="flex justify-center text-center my-6 mx-4">
        <Button
          as={Link}
          href={"/packages"}
          className="rounded-none"
          color={"primary"}
          size={"xl"}
        >
          VIEW ALL PACKAGES
        </Button>
      </div>
    </div>
  );
}
