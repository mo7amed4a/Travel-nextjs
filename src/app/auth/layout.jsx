import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function layout({ children }) {
  if (cookies()?.get("Authorization")?.value || null) {
    redirect('/')
  }
  return (
    <div>
      <main className="flex bg-[#e8edf2] relative">
        <div className="absolute top-4 start-4">
          <Link
            href="/"
            className="text-secondary-500 font-bold md:text-lg hover:underline"
          >
            Home
          </Link>
        </div>
        <div className={`flex  w-full`}>
          <div
            className="h-screen w-screen flex justify-center items-center"
            style={{
              backgroundImage: "url(/images/admin/bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
