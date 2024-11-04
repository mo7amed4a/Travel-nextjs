import { baseURL } from "@/lib/api/Axios";
import { Carousel } from "flowbite-react";
import Image from "next/image";

export default async function SliderApp({
  slides = [
    {
      url: "/images/img27.jpg",
      title: "EXPERIENCE THE NATURE'S BEAUTY",
      text: "Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic proident ullam, eaque donec delectus tempor consectetur nunc, purus congue? Rem volutpat sodales! Mollit. Minus exercitationem wisi.",
    },
    {
      url: "/assets/wallpaperflare.com_wallpaper2-Bsxvae_n.jpg",
      title: "EXPERIENCE THE NATURE'S BEAUTY",
      text: "Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic proident ullam, eaque donec delectus tempor consectetur nunc, purus congue? Rem volutpat sodales! Mollit. Minus exercitationem wisi.",
    },
  ],
  size,
  props,
}) {
  return (
    <div
      className={`relative ${
        size === "small" ? "h-full" : "h-[50vh]  md:h-[95vh]"
      } `}
    >
      <Carousel {...props}>
        {size != "small"
          ? slides.map((slide, index) => (
              <div key={index} className={`flex h-full items-center justify-center`}>
                <Image src={slide.url === "/images/img27.jpg" ? slide.url : baseURL + slide.url} className='w-full' alt="Image" width={1000} height={1000} />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              <div className="flex flex-col items-center w-full space-y-5">
                <h1 className="text-white text-2xl md:text-5xl font-bold mb-2">
                  <span className="block">
                    {slide.title}
                  </span>
                </h1>
                <p className="text-white md:text-2xl mb-9 w-5/6 md:w-2/3">{slide.description}</p>
                <button className="bg-primary-700 text-white text-sm md:text-base px-4 md:px-8 py-1.5 md:py-3 hover:bg-primary-900">
                  CONTINUE READING
                </button>
              </div>
            </div>
              </div>
            ))
          : slides.map((slide, index) => (
              <Image
                key={index}
                src={ baseURL + slide.url
                }
                alt={slide.alt}
                className="w-full h-full bg-contain"
                width={600}
                height={400}
              />
            ))}
      </Carousel>
    </div>
  );
}
