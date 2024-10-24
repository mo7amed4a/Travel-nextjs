import React from "react";
export default function DestinationSection() {
  return (
    <>
      <div
        className="container mx-auto overflow-x-hidden"
        style={{ marginTop: "200px" }}
      >
        <div>
          <div className="flex items-center justify-center sm:justify-start">
            <div className="w-24 bg-red-500 h-[3px] inline-block"></div>
            <p className="ml-2" style={{ color: "red" }}>
              POPULAR DESTINATION
            </p>
          </div>

          <div
            className="w-[90%] flex flex-col sm:flex-row mb-[50px] text-center sm:text-left items-center sm:items-start"
            style={{ justifyContent: "space-between" }}
          >
            <h2
              className="font-bold mb-4 sm:mb-0"
              style={{
                fontSize: "40px",
              }}
            >
              TOP NOTCH DESTINATION
            </h2>

            <p>
              Aperiam sociosqu urna praesent, tristique, corrupti <br />{" "}
              condimentum asperiores platea ipsum ad arcu. Nostrud. Aut <br />{" "}
              nostrum, ornare quas provident laoreet nesciunt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* عنصر الصورة الأول */}
          <div
            className="col-span-6 md:col-span-3 bg-blue-500 text-white shadow-lg overflow-hidden flex items-end relative"
            style={{
              backgroundImage: `url(${"/images/wallll2.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "490px",
              border: "8px white solid",
            }}
          >
            {/* الطبقة الشفافة الداكنة */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="p-4 relative z-10">
              <span className="bg-blue-600 text-white px-2 py-1 rounded">
                THAILAND
              </span>
              <h3 className="mt-2 text-lg font-semibold">Disney Land</h3>
              <div className="flex mt-2">⭐⭐⭐⭐⭐</div>
            </div>
          </div>

          {/* عنصر الصورة الثاني */}
          <div
            className="col-span-6 md:col-span-3 bg-red-500 text-white shadow-lg overflow-hidden flex items-end relative"
            style={{
              backgroundImage: `url(${"/images/wallll2.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "490px",
              border: "8px white solid",
            }}
          >
            {/* الطبقة الشفافة الداكنة */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="p-4 relative z-10">
              <span className="bg-red-600 text-white px-2 py-1 rounded">
                NORWAY
              </span>
              <h3 className="mt-2 text-lg font-semibold">Besseggen Ridge</h3>
              <div className="flex mt-2">⭐⭐⭐⭐⭐</div>
            </div>
          </div>

          {/* العمود الجديد ذو العرض الكامل */}
          <div className="flex flex-col w-[95vw] md:w-[500px]">
            {/* عنصر الصورة الثالث */}
            <div
              className="bg-green-500 text-white shadow-lg overflow-hidden flex items-end relative"
              style={{
                backgroundImage: `url(${"/images/wallll2.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "300px",
                border: "8px white solid",
              }}
            >
              {/* الطبقة الشفافة الداكنة */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="p-4 relative z-10">
                <span className="bg-green-600 text-white px-2 py-1 rounded">
                  NEW ZEALAND
                </span>
                <h3 className="mt-2 text-lg font-semibold">Oxolotan City</h3>
                <div className="flex mt-2">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* عنصر الصورة الرابع */}
            <div
              className="bg-purple-500 text-white shadow-lg overflow-hidden flex items-end mt-6 relative"
              style={{
                backgroundImage: `url(${"/images/wallll2.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "300px",
                border: "8px white solid",
              }}
            >
              {/* الطبقة الشفافة الداكنة */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="p-4 relative z-10">
                <span className="bg-purple-600 text-white px-2 py-1 rounded">
                  NEW SECTION
                </span>
                <h3 className="mt-2 text-lg font-semibold">
                  This is a new section
                </h3>
                <div className="flex mt-2">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex  justify-center text-center mt-6">
        <button className="bg-red-500 text-white  px-3.5 py-2.5">
          MORE DESTINATION
        </button>
      </div>
    </>
  );
}
