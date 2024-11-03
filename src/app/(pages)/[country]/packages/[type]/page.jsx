import Link from "next/link";
import PackageComponent from "@/components/packages/packageComponent";
import { Axios } from "@/lib/api/Axios";
import SubHeader from "@/components/global/sub-header";
import PaginationApp from "@/components/global/pagination";
import EmptyData from "@/components/global/empty";
import CountryTypeSelector from "@/components/packages/Filter";

export default async function PackagesPage({ params, searchParams }) {
  // const headersList = headers();
  // const domain = headersList.get('host') || "";
  // const fullUrl = headersList.get('referer') || "";

  const { page, limit } = searchParams;
  const { country, type } = params;

  let queryParams = `/package?pageNumber=${page || 1}&PACKAGE_PER_PAGE=${
    limit || 10
  }`;

  if (country) {
    queryParams += `&location=${country}`;
  }

  if (type) {
    queryParams += `&category=${type}`;
  }

  let data;
  try {
    data = await Axios.get(queryParams);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  const { totalPages } = data?.data;

  const { packages } = data?.data?.data;

  //   let sub_header;
  //   try {
  //     sub_header = await Axios.get(`/pages/packages/sections`);

  //   } catch (error) {
  //     console.error("Error fetching package data:", error);
  //   }

  //   const SectionData = sub_header?.data?.data?.sections[0]

  return (
    <div>
      <SubHeader title="Packages" desc="Packages page" />

      {/* {SectionData && <SubHeader title={SectionData?.title} desc={SectionData?.content} 
      img={baseURL + SectionData?.images[0]?.url} />} */}
      <CountryTypeSelector />
      {packages?.length === 0 ? (
        <EmptyData text="Packages is empty" />
      ) : (
        <div className="space-y-10 relative">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-8 px-4 mx-auto max-w-[1100px]">
              {packages?.map((item, index) => (
                  <PackageComponent packageItem={item} key={index} />
              ))}
            </div>
            <PaginationApp
            
              page={parseInt(page || 1)}
              totalPages={totalPages}
              limit={limit || 10}
              url={`/${country}/packages/${type}`}
            />
          </section>
        </div>
      )}
    </div>
  );
}
