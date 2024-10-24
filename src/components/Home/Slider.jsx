import { baseURL } from "@/lib/api/Axios";
import { Carousel } from "flowbite-react";
import Image from "next/image";

export default function SliderApp({
  slides = [
    {
      url: "/images/img27.jpg",
      title: "Slide 1",
      text: "Slide 1 text",
    },
    {
      url: "/assets/wallpaperflare.com_wallpaper2-Bsxvae_n.jpg",
      title: "Slide 2",
      text: "Slide 2 text",
    },
  ],
  size,
  props,
}) {
  return (
    <div
      className={`relative ${
        size === "small" ? "h-full" : "h-[75vh] md:h-[95vh]"
      } `}
    >
      <Carousel {...props}>
        {size != "small"
          ? slides.map((slide, index) => (
              <div className="flex h-full items-center justify-center bg-[url(https://adilbaba.online/assets/wallpaperflare.com_wallpaper2-Bsxvae_n.jpg)]">
                {/* <div
                  key={index}
                  className="absolute inset-0 h-full w-full flex justify-center items-center"
                >
                  <div className="bg-red-500">11111</div>
                  <button>weionion</button>
                </div> */}
                {/* <Image src={'https://adilbaba.online/assets/wallpaperflare.com_wallpaper2-Bsxvae_n.jpg'} className='w-full h-full bg-contain' alt="Image" width={1000} height={1000} /> */}
                {/* <Image src={slide.url === "/images/img27.jpg" ? slide.url : baseURL + slide.url} className='w-full' alt="Image" width={1000} height={1000} /> */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              <div className="flex flex-col items-center w-full space-y-5">
                <h1 className="text-white text-5xl font-bold mb-2">
                  <span className="block">
                    {slide.title}
                  </span>
                </h1>
                <p className="text-white text-2xl mb-9">{slide.text}</p>
                <button className="bg-sky-700 text-white px-8 py-3 hover:bg-sky-900">
                  CONTINUE READING
                </button>
              </div>
            </div>
              </div>
            ))
          : slides.map((slide, index) => (
              <Image
                key={index}
                src={
                  slide.url === "/images/img27.jpg"
                    ? slide.url
                    : baseURL + slide.url
                }
                alt={slide.title}
                className="w-full h-full bg-contain"
                width={600}
                height={400}
              />
            ))}
      </Carousel>
    </div>
  );
}
