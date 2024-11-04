import SubHeader from "@/components/global/sub-header";
import SliderApp from "@/components/Home/Slider";
import BookingForm from "@/components/packages/bookingForm";
import { TabForPackageDetail } from "@/components/packages/TabForPackageDetail";
import { titleApp } from "@/constant/data";
import { Axios, baseURL } from "@/lib/api/Axios";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  // read route params
  const slug = (await params).slug;

  let data;
  try {
    data = await Axios.get(`/package/${slug}`);
  } catch (error) {
    console.error("Error fetching post data2:", error);
  }

  const item = data?.data?.data?.package;
  if (item === undefined) {
    return notFound()
  }
  return item && {
    title: item?.title + " | " + titleApp,
    description: item?.descriptionMeta,
    keywords: item?.keyword,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg'],
    // },
  };
}

export default async function PackagesDetailsPage({ params }) {
  const slug = await params.slug;

  let section;
  try {
    section = await Axios.get(`/pages/package/sections`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  section = section?.data?.data?.sections[0];

  let data;
  try {
    data = await Axios.get(`/package/${slug}`);
  } catch (error) {
    // console.error("Error fetching package data:", error);
  }

  const item = data?.data?.data?.package;

  if (item === undefined) {
    return notFound()
  }

  return item && (
    <div className="space-y-10 mt-40">
      {/* {section && section?.title && (
        <SubHeader
          title={section?.title}
          desc={section?.content}
          img={baseURL + section?.images[0]?.url}
        />
      )} */}
      <section className="grid grid-cols-1 xl:grid-cols-6 container-app gap-5 pb-10">
        <section className="md:col-span-4 space-y-10">
          <article className="space-y-5">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold me-4">
              {item.title}
            </h1>
            <figure className="w-full bg-[url(/images/img17.jpg)] bg-cover bg-center relative h-80 md:h-[500px]">
              {item.image.length > 0 &&
                (item.image.length === 1 ? (
                  <SliderApp
                    slides={item.image}
                    size="small"
                    props={{
                      indicators: false,
                      leftControl: " ",
                      rightControl: " ",
                    }}
                  />
                ) : (
                  <SliderApp
                    slides={item.image}
                    size="small"
                    props={{
                      indicators: false,
                    }}
                  />
                ))}
              <div className="absolute top-[93%] inset-x-0 z-10 py-3 bg-secondary-500 text-white text-sm flex justify-center items-center">
                <ul className="flex justify-between [&>li>i]:pe-2 [&>li]:ps-4 divide-x gap-x-4">
                  <li>
                    <i className="far fa-clock"></i>
                    <span>{item.duration.day} days</span> /
                    <span> {item.duration.nights} night</span>
                  </li>
                  <li>
                    {/* <i className="fas fa-user-friends"></i>
                    People: 5 */}
                    {item.category}
                  </li>
                  <li>
                    <i className="fas fa-map-marked-alt"></i>
                    {item.location}
                  </li>
                </ul>
              </div>
            </figure>
          </article>
          <TabForPackageDetail packageData={item} />
        </section>
        <div className="md:col-span-2 relative">
          <div className="sticky top-40 space-y-10">
            {item?.typePackages?.length > 0 && (
              <div className="bg-primary-500 py-5 flex flex-col justify-center items-center space-y-3 text-white">
                <div className=" bg-primary-500 p-1.5 text-white">
                  <h3>
                    <span className="text-2xl font-bold">
                      $
                      {item?.typePackages?.length > 0 &&
                        item?.typePackages[0]?.pricing[0]?.pricePerUser}
                    </span>
                    /{" "}
                    {item?.typePackages?.length > 0 &&
                      item?.typePackages[0]?.pricing[0]?.numUser}
                  </h3>
                  <span className="flex text-xl items-center">
                    {/* <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStarBorder /> */}
                  </span>
                </div>
              </div>
            )}

            <BookingForm id={item._id} />
          </div>
        </div>
      </section>
    </div>
  );
}
