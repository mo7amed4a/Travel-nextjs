'use client';
import { Tabs } from "flowbite-react";
import TypePackageComponent from "./TypePackageComponent";
import SliderApp from "../Home/Slider";
import ViewBlog from "../blog/ViewBlog";

export function TabForPackageDetail({ packageData }) {
  return (
    <Tabs
      aria-label="Default tabs"
      variant="default"
      className="[&>div:nth-child(2)]:border [&>div:nth-child(2)]:p-2"
    >
      <Tabs.Item title="DESCRIPTION" className="rounded-none">
        <div className="space-y-3">
          <ViewBlog html={packageData.description}/>
          {/* <p className="leading-relaxed"></p> */}
        </div>
      </Tabs.Item>
      <Tabs.Item title="PRICEING" className="rounded-none">
        <TypePackageComponent typePackages={packageData.typePackages} />
      </Tabs.Item>
      <Tabs.Item title="PROGRAM">
        <div className="space-y-3">
          <div className="text-4xl font-bold flex items-center space-x-4">
            <span className="text-sm">
              {"("} {packageData.duration.day} days {")"}
            </span>
          </div>
          <p>{packageData.program.description}</p>
          <div className="space-y-3">
            {packageData.program.programItem.map((pItem, index) => (
              <div key={index} className="flex items-center">
                <span className="min-w-16 h-16 relative z-10 rounded-full text-white text-lg bg-primary-500 flex flex-col -space-y-2 items-center justify-center">
                  {/* TODO : remove day and replace_oh b title day  */}
                  <small>day</small>
                  <b>{index + 1}</b>
                </span>
                <div className="py-10 bg-gray-100 w-full -ms-7 ps-12">
                  <h1 className="text-lg font-semibold">{pItem.day} day</h1>
                  <p className="line-clamp-3 hover:line-clamp-none pe-4">
                    {pItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tabs.Item>
      {/* <Tabs.Item disabled title="REVIEW">
        reviews
      </Tabs.Item> */}
      <Tabs.Item title="Map">
        <div className="h-64 md:h-96">
          {packageData.mapImages.length > 0 && (
            <SliderApp size="small" slides={packageData.mapImages} props={{ indicators: false }} />
          )}
        </div>
        {/* <iframe
          className="w-full h-[400px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5028607982685!2d31.232934515117892!3d30.042821081880927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f8ec6a83167%3A0x89e74fbb74002af0!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1695569089754!5m2!1sen!2seg"
          allowFullScreen=""
        ></iframe> */}
      </Tabs.Item>
    </Tabs>
  );
}
