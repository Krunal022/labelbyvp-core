import { motion } from "framer-motion";
import React from "react";
import BorderAnimation from "../Components/BorderAnimation";

const HomeAbout = () => {
  return (
    <div className="w-full h-[150vh] max-md:h-[70vh] text-white">
      {/* Section 1: Headline Text */}

      <div className="h-[60vh] max-md:h-[20vh] w-full flex flex-col justify-center items-center text-[5vw] max-md:text-[5.5vw] px-4 pt-30 pb-20 max-md:py-5  leading-none font-bold ">
        <h1 className="w-full max-w-5xl flex justify-center gap-10 text-center  translate-x-[-10%]  ">
          <span className="text-lg max-md:text-sm opacity-70 font-medium font-['Primary'] ">
            (About)
          </span>
          Empower creators,
        </h1>
        <h1 className="text-center ">
          inspiring fashion
          <motion.span
            initial={{ width: 0 }}
            whileInView={{
              width: `${window.innerWidth < 768 ? "10vh" : "12vw"}`,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-block w-[5vw] h-[10vh]  max-md:h-[3vh] max-md:w-[4vh]  rounded-full overflow-hidden align-middle mx-6 max-md:mx-2 "
          >
            <img
              className="w-full h-full object-cover"
              src="https://ik.imagekit.io/td7bvvb4j/9b38ca_952d1a09a88d4981b7111a2f634634b9~mv2.jpg?updatedAt=1753263952534"
              alt=""
            />
          </motion.span>
          -forward minds,
        </h1>
        <h1 className="text-center">and reshaping the culture of clothing</h1>
        <h1 className="text-center">as a bold design label</h1>
      </div>

      {/* Section 2: Subtext */}
      <div className="w-full flex justify-end px-10 py-8 max-md:py-2 ">
        <div className="w-full max-w-xl p-10 flex justify-center items-center">
          <h2 className="text-xl  max-md:text-sm leading-tight opacity-80 text-justify ">
            Fueling fashion’s next movement, with styles that speak volumes.
          </h2>
        </div>
      </div>

      {/* Section 3: Placeholder */}
      <div className="w-full md:h-[47vh] h-[40vh]">
        <DiscVisual />
      </div>
    </div>
  );
};

export default HomeAbout;

const DiscVisual = () => {
  return (
    <div className="w-full md:h-[47vh] h-43 overflow-hidden relative">
      <img
        src="https://ik.imagekit.io/td7bvvb4j/11062b_8a77346a1e0e4a98a947b1d322a2c349~mv2.jpeg?updatedAt=1753264622341"
        alt="Hero Visual"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};
