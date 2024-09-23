import Footer from "../componets/Footer";

export default function Home() {
  return (
    <>
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 animate-fade-in">
        <div className="mx-auto text-center sm:text-center lg:max-w-2xl">
          <div className="max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-2xl md:mb-5">
            <h1 className="max-w-lg my-2 font-sans text-3xl font-bold leading-none sm:text-5xl mx-auto">
              <span className="relative inline-block"></span>
              <span className="text-[#00AF54] ">Create.</span>
              <span className="text-[#4C4B63] "> Learn.</span>
              <span className="text-[#5386e4] "> Excel.</span>
            </h1>
            <span className="text-2xl text-[#4C4B63] sm:text-4xl">
              A Dynamic Quiz Platform <br /> For
              <span className="text-[#00AF54] "> Students</span> and
              <span className="text-[#5386e4] "> Teachers</span>
            </span>
          </div>
          <img
            className="object-content mx-auto rounded sm:h-64 md:h-80 lg:h-auto lg:w-5/6"
            src="Art.png"
            alt=""
          />
        </div>
      </div>
      <Footer/>
    </>
  );
}
