import React from "react";

export default function TravelSection() {
  const activities = [
    { name: "Adventure", destinations: "15 Destinations", icon: "🌄" },
    { name: "Trekking", destinations: "15 Destinations", icon: "🎒" },
    { name: "Camp Fire", destinations: "15 Destinations", icon: "🔥" },
    { name: "Off Road", destinations: "15 Destinations", icon: "🛣️" },
    { name: "Camping", destinations: "15 Destinations", icon: "🏕️" },
    { name: "Exploring", destinations: "15 Destinations", icon: "🗺️" },
  ];

  return (
    // <div className="container mx-auto  mt-[100px] p-6">
    //   <div className="flex flex-col items-center justify-center mb-8  text-center">
    //     <div className="flex items-center mb-4">
    //       <div className="w-24 bg-red-500 h-[3px] inline-block"></div>
    //       <p className="ml-2 text-red-500 uppercase font-semibold text-sm">
    //         TRAVEL BY ACTIVITY
    //       </p>
    //     </div>
    //     <h2 className="text-5xl font-bold mb-4">ADVENTURE & ACTIVITY</h2>
    //     <p className="text-lg text-gray-600 max-w-2xl">
    //       Mollit voluptatem perspiciatis convallis elementum corporis quo
    //       veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing
    //       repudiandae eius cursus? Nostrum magnis maxime curae placeat.
    //     </p>
    //   </div>

    //   <div className="flex flex-wrap justify-center gap-4">
    //     {activities.map((activity, index) => (
    //       <div
    //         key={index}
    //         className="w-[180px] h-[190px] text-center"
    //         style={{ border: "1px solid black" }}
    //       >
    //         <div className="text-[80px]">{activity.icon}</div>
    //         <h3 className="font-bold">{activity.name}</h3>
    //         <p>{activity.destinations}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="my-20">
    <section className="flex flex-col justify-center items-center space-y-4">
          <h3 className="flex items-center text-lg font-bold text-primary">
            <span className="w-20 h-0.5 inline-block bg-primary me-2"></span>TRAVEL
            BY ACTIVITY
          </h3>
          <h1 className="text-3xl font-bold">ADVENTURE & ACTIVITY</h1>
          <p className="text-gray-800 w-3/4 md:w-2/4 text-center">
            Mollit voluptatem perspiciatis convallis elementum corporis quo
            veritatis aliquid blandit, blandit torquent, odit placeat.
            Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae
            placeat.
          </p>
        </section>
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 container-app py-10">
            <div className="flex flex-col items-center border p-10">
              <div className="">
                <a href="#">
                  <img
                    src="/images/icon6.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-bold">
                  <a href="#">Adventure</a>
                </h4>
                <p className="text-sm">15 Destination</p>
              </div>
            </div>
            <div className="flex flex-col items-center border p-10">
              <div className="activity-icon">
                <a href="#">
                  <img
                    src="/images/icon10.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-bold">
                  <a href="#">Trekking</a>
                </h4>
                <p>12 Destination</p>
              </div>
            </div>
            <div className="flex flex-col items-center border p-10">
              <div className="activity-icon">
                <a href="#">
                  <img
                    src="/images/icon9.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-bold">
                  <a href="#">Camp Fire</a>
                </h4>
                <p>7 Destination</p>
              </div>
            </div>
            <div className="flex flex-col items-center border p-10">
              <div className="activity-icon">
                <a href="#">
                  <img
                    src="/images/icon8.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-bold">
                  <a href="#">Off Road</a>
                </h4>
                <p>15 Destination</p>
              </div>
            </div>
            <div className="flex flex-col items-center border p-10">
              <div className="activity-icon">
                <a href="#">
                  <img
                    src="/images/icon7.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-bold">
                  <a href="#">Camping</a>
                </h4>
                <p>13 Destination</p>
              </div>
            </div>
            <div className="flex flex-col items-center border p-10">
              <div className="activity-icon">
                <a href="#">
                  <img
                    src="/images/icon11.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-bold">
                  <a href="#">Exploring</a>
                </h4>
                <p>25 Destination</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
