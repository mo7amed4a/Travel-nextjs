import Link from "next/link";
import PackageComponent from "@/components/packages/packageComponent";
import { Axios, baseURL } from "@/lib/api/Axios";
import SubHeader from "@/components/global/sub-header";
import PaginationApp from "@/components/global/pagination";
import EmptyData from "@/components/global/empty";
import { titleApp } from "@/constant/data";
import CountryTypeSelector from "@/components/packages/Filter";

export async function generateMetadata({ params }) {
  return {
    title: "Package page | " + titleApp,
    description: "description page package",
    keywords: "keyword page package",
  };
}

export default async function PackagesPage({ searchParams }) {
  const { page, limit } = searchParams;

  let section;
  try {
    section = await Axios.get(`/pages/packages/sections`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  section = section?.data?.data?.sections[0];

  let data;
  try {
    data = await Axios.get(
      `/package?pageNumber=${page || 1}&PACKAGE_PER_PAGE=${limit || 10}`
    );
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  const { totalPages } = data?.data;
  const { packages } = data?.data?.data;

  // let sub_header;
  // try {
  //   sub_header = await Axios.get(`/pages/packages/sections`);

  // } catch (error) {
  //   console.error("Error fetching package data:", error);
  //   return notFound();
  // }

  // const SectionData = sub_header?.data?.data?.sections[0]

  return (
    packages && (
      <div>
        {section && section?.title && (
          <SubHeader
            title={section?.title}
            desc={section?.content}
            img={baseURL + section?.images[0]?.url}
          />
        )}
        {/* {SectionData && <SubHeader title={SectionData?.title} desc={SectionData?.content} 
      img={baseURL + SectionData?.images[0]?.url} />} */}
        <div className="mt-8">
          <CountryTypeSelector />
        </div>
        {packages?.length === 0 ? (
          <EmptyData text="Packages is empty" />
        ) : (
          <div className="space-y-10 relative">
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-8 px-4 mx-auto max-w-[1100px]">
                {packages?.map((item, index) => (
                  <Link href={`/packages/${item.slug}`} key={index}>
                    <PackageComponent packageItem={item} />
                  </Link>
                ))}
              </div>
              {/* <PaginationApp 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={data.totalPages}
            /> */}
              <PaginationApp
                page={parseInt(page || 1)}
                totalPages={totalPages}
                limit={limit || 10}
                url="/packages"
              />
            </section>
          </div>
        )}
      </div>
    )
  );
}
