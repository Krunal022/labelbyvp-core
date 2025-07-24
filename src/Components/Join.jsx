import React from "react";
import { BsArrow90DegRight } from "react-icons/bs";
import Button from "./Button";
import BorderAnimation from "./BorderAnimation";
import { motion } from "framer-motion";

const Join = () => {
  const statsData = [
    {
      id: 1,
      value: "5000+",
      description: "Vibes Delivered",
      delay: 0.4,
    },
    {
      id: 2,
      value: "4.7/5",
      description: "Average User Rating",
      delay: 0.6,
    },
    {
      id: 3,
      value: "3M+",
      description: "Beats Threads in Sync",
      delay: 0.8,
    },
  ];

  return (
    <div className="h-[60vh] max-md:h-[70vh] w-full  p-10 max-md:px-2 text-white  ">
      <div className="h-[45%]  w-full  flex justify-between  items-end max-md:flex-col max-md:items-start pr-30 max-md:pr-0 pt-30 max-md:pt-10 ">
        <h1 className="text-5xl md:text-[5vw] font-extrabold  md:leading-[9vh] z-[2]  ">
          {" "}
          Join the <br />
          <span className="ml-30 max-md:ml-10">Community</span>
        </h1>
        <h2 className="text-sm md:text-lg max-w-lg md:leading-[3vh] opacity-70 text-justify">
          {" "}
          Become a part of the <strong>LABEL BY VP </strong> collective — a
          global family of fashion-forward creators, culture shapers, and
          visionaries. Get the inside scoop on exclusive drops,
          behind-the-scenes access, and early invites to style experiences that
          go beyond the mainstream.
        </h2>
      </div>
      <div className="h-[20%] w-full flex justify-center items-center">
        <BorderAnimation />
      </div>
      <div className="h-[35%]  w-full  flex  max-md:flex-col max-md:justify-between  ">
        <div className="h-full w-1/2 max-md:h-1/2 max-md:w-full   ">
          <h2 className="text-[1.5rem]  max-md:text-sm opacity-70 py-2">
            Bold. Independent. Unapologetic.
          </h2>
          <div className="flex gap-1">
            <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3  max-md:text-sm text-xl rotate-x-180">
              <BsArrow90DegRight />
            </Button>
            <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3  max-md:text-sm text-xl leading-none ">
              <h2> JOIN US</h2>
            </Button>
          </div>
        </div>
        <div className="h-full w-1/2 max-md:h-1/2 max-md:w-full  flex justify-between items-center  ">
          {statsData.map((item, idx) => (
            <motion.div
              key={idx}
              className=" px-6 py-4 w-[120px] h-[120px]  flex flex-col justify-center  items-start"
            >
              <h3 className="md:text-3xl text-xl font-bold z-[2]  ">
                {item.value}
              </h3>
              <p className="text-sm font-['Primary']  mt-1 opacity-70 z-[2]  ">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Join;
