
import Holidaypackage from "@/components/Home/Holidaypackege/Holidaypackege";
import GalleryPage from "@/components/Home/Ourtourgalery/Ourtourgalery";
import Resentpostes from "@/components/Home/Resentpostes/Resentpostes";
import TravelSection from "@/components/Home/Travel/Travel";
import TravelofferSection from "@/components/Home/Traveloffer/Traveloffer";

import DestinationSection from "@/components/Home/DestinationSection";
import SliderApp from "@/components/Home/Slider";
import PackageSection from "@/components/Home/PackageSection";
import { Axios } from "@/lib/api/Axios";

export default async function Home() {

  let slider;
  try {
    slider = await Axios.get(`/pages/slider/sections`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }
  slider = slider?.data?.data?.sections[0];

  let destination;
  try {
    destination = await Axios.get(`/pages/destination/sections`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }
  destination = destination?.data?.data?.sections[0];

  let packageSectionData;
  try {
    packageSectionData = await Axios.get(`/pages/packageSectionData/sections`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }
  packageSectionData = packageSectionData?.data?.data?.sections[0];

  let blogSectionData;
  try {
    blogSectionData = await Axios.get(`/pages/blogSectionData/sections`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }
  blogSectionData = blogSectionData?.data?.data?.sections[0];

  return (
    <div className="md:-mt-40">
      <SliderApp slides={slider?.images} />
      <DestinationSection dataSection={destination} />
      <PackageSection packageSectionData={packageSectionData} />
      <TravelSection />
      <TravelofferSection />
      <GalleryPage />
      <Resentpostes blogSectionData={blogSectionData} />
      {/* <Holidaypackage/> */}
    </div>
  );
}
