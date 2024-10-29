import SubHeader from "@/components/global/sub-header";
import SliderApp from "@/components/Home/Slider";
import BookingForm from "@/components/packages/bookingForm";
import { TabForPackageDetail } from "@/components/packages/TabForPackageDetail";
import { titleApp } from "@/constant/data";
import { Axios } from "@/lib/api/Axios";

export async function generateMetadata({ params }) {
  // read route params
  const slug = (await params).slug;

  let data;
  try {
    data = await Axios.get(`/package/${slug}`);
  } catch (error) {
    console.error("Error fetching post data:", error);
  }

  const item = data.data.data?.package;

  return {
    title: item.title + " | " + titleApp,
    description: item.description,
    keywords: item.keyword,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg'],
    // },
  };
}

export default async function PackagesDetailsPage({ params }) {
  const slug = params.slug;

  let data;
  try {
    data = await Axios.get(`/package/${slug}`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  const item = data?.data?.data?.package;

  return (
    <div className="space-y-10">
      <SubHeader
        title="Package Details"
        desc="description page packages details"
        img="/images/slider-pattern.png"
      />
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
              <div className="absolute top-[93%] inset-x-0 z-10 py-3 bg-secondary text-white text-sm flex justify-center items-center">
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
          <div className="sticky top-20 space-y-10">
            {item?.typePackages?.length > 0 && (
              <div className="bg-primary py-5 flex flex-col justify-center items-center space-y-3 text-white">
                <div className=" bg-primary p-1.5 text-white">
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
