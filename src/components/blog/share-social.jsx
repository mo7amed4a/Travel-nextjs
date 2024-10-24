"use client";

import { useEffect, useState } from "react";

export default function ShareSocial({ imageUrl }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  
  return (
    <section className="space-y-4 mt-3">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 [&>a]:w-full text-white my-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          className="flex bg-red-200"
        >
          <i className="bg-[#3b5998] px-2 py-3 fab fa-facebook-f w-8"></i>{" "}
          <span className="bg-[#3b5998]/95 p-2 w-full flex items-center">
            Facebook
          </span>
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${url}&media=${imageUrl}&description=View blog`}
          target="_blank"
          className="flex"
        >
          <i className="bg-[#bd081c] px-2 py-3 fab fa-pinterest"></i>{" "}
          <span className="bg-[#bd081c]/95 p-2 w-full flex items-center">
            Pinterest
          </span>
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=View%20blog!%20${url}`}
          target="_blank"
          className="flex"
        >
          <i className="bg-[#25d366] px-2 py-3 fab fa-whatsapp w-8"></i>{" "}
          <span className="bg-[#25d366]/95 p-2 w-full flex items-center">
            WhatsApp
          </span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          target="_blank"
          className="flex"
        >
          <i className="bg-[#0077b5] px-2 py-3 fab fa-linkedin w-8"></i>{" "}
          <span className="bg-[#0077b5]/95 p-2 w-full flex items-center">
            Linkedin
          </span>
        </a>
        <a
          href={`https://twitter.com/share?url=${url}&via=travel_app&text=View blog`}
          target="_blank"
          className="flex"
        >
          <i className="bg-[#1da1f2] px-2 py-3 fab fa-twitter w-8"></i>
          <span className="bg-[#1da1f2]/95 p-2 w-full flex items-center">
            Twitter
          </span>
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to&su=Travel&body=View%20blog%20link:%20${url}`}
          target="_blank"
          className="flex"
        >
          <i className="bg-[#dd4b39] p-2 fab fa-google w-8 flex items-center"></i>
          <span className="bg-[#dd4b39]/95 p-2 w-full flex items-center">
            Google
          </span>
        </a>
      </div>
    </section>
)
}
