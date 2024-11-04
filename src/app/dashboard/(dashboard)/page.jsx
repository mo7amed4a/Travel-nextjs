'use client';
import React from "react";
import useFetch from "@/hooks/useFetch";
import CountUp from "react-countup";
import TableBooking from "@/components/dashboard/TableBooking";

export default function DashboardPage() {
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useFetch("/posts");
  const postsLength = postsData?.totalPosts;
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetch("/user");
  const usersLength = usersData?.totalUsers;
  const {
    data: faqData,
    loading: faqLoading,
    error: faqError,
  } = useFetch("/faq/answer");
  const faqLength = faqData?.length;
  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
  } = useFetch("/bookings");
  const bookingsLength = bookingsData?.length;
  const {
    data: packageData,
    loading: packageLoading,
    error: packageError,
  } = useFetch("/package");
  const packageLength = packageData?.length;
  return (
    <main className="w-full py-5 space-y-5">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="bg-white shadow flex h-20">
          <div className="bg-secondary-500 w-20 h-full flex items-center justify-center text-white">
            <i className="text-4xl far fa-chart-bar"></i>
          </div>
          <div className="px-4 flex flex-col items-start justify-center">
            <CountUp
              start={0}
              end={packageLength}
              duration={2.75}
              separator=","
            >
              {({ countUpRef, start }) => (
                <div>
                  <p className="text-lg font-bold">Packages</p>
                  <span className="font-bold" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>
        <div className="bg-white shadow flex h-20">
          <div className="bg-green-500 w-20 h-full flex items-center justify-center text-white">
            <i className="text-4xl  far fa-dollar-sign"></i>
          </div>
          <div className="px-4 flex flex-col items-start justify-center">
            <CountUp start={0} end={postsLength} duration={2.75} separator=",">
              {({ countUpRef, start }) => (
                <div>
                  <p className="text-lg font-bold">Blogs</p>
                  <span className="font-bold" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>
        <div className="bg-white shadow flex h-20">
          <div className="bg-purple-700 w-20 h-full flex items-center justify-center text-white">
            <i className="text-4xl far fas fa-users"></i>
          </div>
          <div className="px-4 flex flex-col items-start justify-center">
            <CountUp start={0} end={usersLength} duration={2.75} separator=",">
              {({ countUpRef, start }) => (
                <div>
                  <p className="text-lg font-bold">Users</p>
                  <span className="font-bold" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>
        <div className="bg-white shadow flex h-20">
          <div className="bg-red-700 w-20 h-full flex items-center justify-center text-white">
            <i className="text-4xl far fa-envelope-open"></i>
          </div>
          <div className="px-4 flex flex-col items-start justify-center">
            <CountUp start={0} end={faqLength} duration={2.75} separator=",">
              {({ countUpRef, start }) => (
                <div>
                  <p className="text-lg font-bold">Faqs</p>
                  <span className="font-bold" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>
        <div className="bg-white shadow flex h-20">
          <div className="bg-red-700 w-20 h-full flex items-center justify-center text-white">
            <i className="text-4xl far fa-envelope-open"></i>
          </div>
          <div className="px-4 flex flex-col items-start justify-center">
            <CountUp
              start={0}
              end={bookingsLength}
              duration={2.75}
              separator=","
            >
              {({ countUpRef, start }) => (
                <div>
                  <p className="text-lg font-bold">Bookings</p>
                  <span className="font-bold" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>
      </section>
      <section className="mt-10 grid grid-cols-1 gap-4">
         <TableBooking
          values={packageData?.data?.packages?.slice(0, 6)}
          title="Recent Packages"
          description="Recent Packages from website"
          LinkTo="/dashboard/packages"
        />
        <TableBooking
          values={faqData?.data?.faqs?.slice(0, 6)}
          title="Recent Faqs"
          description="Recent faqs from website"
          LinkTo="/dashboard/faqs"
        />
      </section>
      <section className="flex flex-col gap-4">
        <TableBooking
          values={postsData?.data?.posts.slice(0, 6)}
          title="Recent Posts"
          description="Recent Posts from website"
          LinkTo="/dashboard/blogs"
        />
        <TableBooking
          values={usersData?.data?.slice(0, 6)}
          title="users"
          description="users from website"
          LinkTo="/dashboard/users"
        /> 
      </section>
    </main>
  );
}
