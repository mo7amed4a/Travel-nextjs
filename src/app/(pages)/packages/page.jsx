// import SubHeader from "../../components/Sub-Header";

import Link from "next/link";
import PackageComponent from "@/components/packages/packageComponent";
import { Axios, baseURL } from "@/lib/api/Axios";
import SubHeader from "@/components/global/sub-header";
import PaginationApp from "@/components/global/pagination";
import EmptyData from "@/components/global/empty";
import { notFound } from "next/navigation";

export default async function PackagesPage({searchParams}) {
  const { page, limit} = searchParams;

  let data;
  try {
    data = await Axios.get(`/package?pageNumber=${page || 1}&
      ${limit || 10}`);
  } catch (error) {
    console.error("Error fetching package data:", error);
    return notFound();
  }

  if (data?.data.data?.packages?.length === 0) {
    return <EmptyData text="Packages is empty" />;
  }

  const {totalPages} = data?.data; 
  const { packages } = data?.data?.data;


  // let sub_header;
  // try {
  //   sub_header = await Axios.get(`/pages/packages/sections`);
  //   console.log(sub_header?.data?.data?.sections[0]);
    
  // } catch (error) {
  //   console.error("Error fetching package data:", error);
  //   return notFound();
  // }

  // const SectionData = sub_header?.data?.data?.sections[0]

  return (
    <div>
      <SubHeader title="Packages" desc="Packages page"  />
      {/* {SectionData && <SubHeader title={SectionData?.title} desc={SectionData?.content} 
      img={baseURL + SectionData?.images[0]?.url} />} */}
      <div className="space-y-10 relative">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-8 px-4 mx-auto max-w-[1100px]">
              {packages?.map((item, index) => (
                <Link href={`/packages/${item.id}`} key={index}> 
                  <PackageComponent packageItem={item} />
                </Link>
              ))}
            </div>
            {/* <PaginationApp 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={data.totalPages}
            /> */}
            <PaginationApp page={parseInt(page || 1)} totalPages={totalPages} limit={limit || 10} url="/packages"/>
          </section>
      </div>
    </div>
  );
}
