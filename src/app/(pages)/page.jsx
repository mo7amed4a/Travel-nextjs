
import Holidaypackage from "@/components/Home/Holidaypackege/Holidaypackege";
import GalleryPage from "@/components/Home/Ourtourgalery/Ourtourgalery";
import Resentpostes from "@/components/Home/Resentpostes/Resentpostes";
import TravelSection from "@/components/Home/Travel/Travel";
import TravelofferSection from "@/components/Home/Traveloffer/Traveloffer";

import DestinationSection from "@/components/Home/DestinationSection";
import SliderApp from "@/components/Home/Slider";
import PackageSection from "@/components/Home/PackageSection";

export default function Home() {
   
    return (
        <div className="-mt-36">
             <SliderApp />
             <DestinationSection />
            <PackageSection />
        <TravelSection/>
        <TravelofferSection/>
        <GalleryPage />
         <Resentpostes/>
        <Holidaypackage/>
        </div>
    );
}
