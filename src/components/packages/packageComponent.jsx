import { baseURL } from "@/lib/api/Axios";
import Link from "next/link";

export default function PackageComponent({ packageItem }) {
  return (
    <div className="flex flex-col justify-between h-full">
      <figure className="w-full relative">
        {packageItem?.typePackages?.length > 0 && <div className="absolute top-[20px] end-0 bg-primary-500 p-1.5 text-white">
          <h6 className="text-sm">
            <span className="font-bold text-xl">
              ${packageItem?.typePackages?.length > 0 && packageItem?.typePackages[0]?.pricing[0]?.pricePerUser}
            </span>{" "}
            / {packageItem?.typePackages?.length > 0 && packageItem?.typePackages[0]?.pricing[0]?.numUser}
          </h6>
        </div>}
        <Link href={`/packages/${packageItem.slug}`}>
          {packageItem?.image?.length != 0 ? (
            packageItem?.image?.length >= 1 && (
              <img
                src={baseURL + packageItem?.image[0].url}
                alt="destination"
                className="w-full h-72 object-cover"
              />
            )
          ) : (
            <img
              src={"/images/img17.jpg"}
              alt="destination"
              className="w-full h-72"
            />
          )}
        </Link>
        <div className="mx-1 absolute top-[93%] left-[0.5%] right-[0.5%] z-10 px-2 py-3 bg-secondary-500 text-white text-[10px] sm:text-xs">
          <ul className="grid grid-cols-12 [&>li>i]:pe-2 [&>li]:ps-2 divide-x">
            <li className="flex items-center col-span-3">
              <i className="far fa-clock"></i>
              <span>{packageItem?.duration?.day}D</span>/
              <span>{packageItem?.duration?.nights}N</span>
            </li>
            <li className="truncate col-span-6" >
              {/* <i className="fas fa-user-friends"></i> */}
              {packageItem?.category}
            </li>
            <li className="flex items-center col-span-3 md:-me-7">
              <i className="fas fa-map-marker-alt"></i>
              <span >{packageItem?.location?.split('-')[0]}</span>
            </li>
          </ul>
        </div>
      </figure>
      <div className="pt-8 px-4 flex flex-col justify-between h-full">
        <div className="space-y-3">
          <Link href={`/packages/${packageItem?.slug}`}>
            <h3 className="font-bold text-xl line-clamp-2">{packageItem?.titleOutSide}</h3>
          </Link>
          {/* <div className="flex gap-x-2 text-gray-400 text-xs">
              <span>(25 reviews)</span>
              <div className="text-primary" title="Rated 5 out of 5">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star text-gray-300" aria-hidden="true"></i>
              </div>
            </div> */}
          <p className="text-gray-700 line-clamp-3">{packageItem.descriptionOutSide}</p>
        </div>
          <div className="flex justify-between bottom-1">
            <Link
              href={`/packages/${packageItem?.slug}`}
              className="w-full text-center p-3 border hover:bg-primary-500 hover:text-white flex items-center gap-x-2 justify-center group "
            >
              <span className="">Book Now</span>
              <i className="fas fa-arrow-right text-primary-500 group-hover:text-white -mb-1"></i>
            </Link>
            {/* <a
                href="#"
                className="w-full text-center p-3 border-t flex items-center gap-x-2 justify-center group hover:text-secondary"
              >
                Wish List
                <i className="far fa-heart text-primary-500 group-hover:text-secondary"></i>
              </a> */}
          </div>
      </div>
    </div>

  );
}
