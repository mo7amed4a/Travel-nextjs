import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Slideeer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false // تعطيل الأسهم
  };

  // مصفوفة الشهادات
  const testimonials = [
    {
      image: "100x100",
      quote: "Dolorum aenean dolorem minima! Voluptatum? Corporis condimentum ac primis fusce, atque!",
      name: "Alison Wright",
      profession: "Travel Guide"
    },
    {
      image: "100x100",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac urna libero.",
      name: "John Doe",
      profession: "Explorer"
    },
    {
      image: "100x100",
      quote: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
      name: "Jane Smith",
      profession: "Adventurer"
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-4xl">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div className="p-8" key={index}>
              <div className="p-8 rounded-lg text-center">
                <div className="flex justify-center">
                  <div className="rounded-full border-4 border-red-300 p-2">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-lg text-gray-500">{testimonial.image}</span>
                    </div>
                  </div>
                </div>
                {/* تنسيق النصوص */}
                <p className="text-gray-700 text-lg italic mt-6">{testimonial.quote}</p>
                <h3 className="text-secondary-600 font-bold text-2xl mt-4">{testimonial.name}</h3> 
                <span className="text-gray-500 text-sm">{testimonial.profession}</span> 
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slideeer;
