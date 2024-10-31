export default function SubHeader({
  title = "Title page",
  desc = "Description page",
  img = "/images/slider-pattern.png",
}) {
  return (
    <section
      className=" bg-[#555555] h-[50vh] object-cover bg-no-repeat bg-bottom flex justify-center items-center text-white font-bold"
      style={{
        // backgroundImage: `url(${img})`,
        backgroundImage: `url("/images/slider-pattern.png")`,
      }}
    >
      <div className="flex flex-col text-center space-y-5">
        <h1 className="text-xl md:text-5xl">{title}</h1>
        <p className="md:text-lg">{desc}</p>
      </div>
    </section>
  );
}
