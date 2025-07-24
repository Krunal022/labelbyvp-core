const Typo = () => {
  return (
    <div className="h-[40vh] max-md:h-[32vh]  w-full overflow-hidden  md:px-20 max-md:flex-col flex text-white  px-2 ">
      <div className="h-full w-1/2 max-md:w-full text-[8vw] max-md:text-[14vw] flex flex-col font-bold leading-none z-[2]  ">
        <h1>Our</h1>
        <div className="flex items-end">
          <h2 className="text-lg max-md:text-sm opacity-70 font-medium ">
            (Art <br />
            You Can Wear)
          </h2>
          <h1 className="ml-30 max-md:ml-10">Vision</h1>
        </div>
      </div>
      <div className="h-full w-1/2  max-md:w-full md:p-20 max-md:p-3 flex flex-col justify-end gap-5 ">
        <Paragraph
          className={`font-['Primary'] text-lg max-md:text-sm opacity-70 leading-tight `}
          phrases={[
            " LabelByVP has had the privilege of working with ",
            "a diverse circle of creators — from streetwear rebels",
            "to minimal design minds. We champion individuality,",
            "giving every voice a thread to be seen and heard.",
          ]}
        />
        <div className="flex gap-1">
          <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3 max-md:text-sm text-xl rotate-x-180">
            <BsArrow90DegRight />
          </Button>
          <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3 max-md:text-sm text-xl leading-none">
            <h2>Explore More</h2>
          </Button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import Button from "./Button";
import { BsArrow90DegRight } from "react-icons/bs";
import Paragraph from "./Paragraph";

const Artist = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const artists = [
    "https://ik.imagekit.io/td7bvvb4j/brown.jpg?updatedAt=1753266505063",
    "https://ik.imagekit.io/td7bvvb4j/dgreen.jpg?updatedAt=1753266504936",
    "https://ik.imagekit.io/td7bvvb4j/green.jpg?updatedAt=1753266504916",
    "https://ik.imagekit.io/td7bvvb4j/blue.jpg?updatedAt=1753266504891",
    "https://ik.imagekit.io/td7bvvb4j/white.jpg?updatedAt=1753266504901",
    "https://ik.imagekit.io/td7bvvb4j/b.jpg?updatedAt=1753266630393",
    "https://ik.imagekit.io/td7bvvb4j/bb.jpg?updatedAt=1753266630484",
    "https://ik.imagekit.io/td7bvvb4j/ww.jpg?updatedAt=1753266796888",
  ];

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const componentMap = (artist, index) => (
    <div
      key={index}
      className={`group relative h-[75vh] max-md:h-[30vh] w-[8vw] max-md:w-[8vw] 
      hover:w-[25vw] transition-all duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] 
      ${activeIndex === index ? "max-md:w-[50vw]" : ""} 
      ${index > 8 ? "max-md:hidden" : ""}`}
      onClick={() => handleClick(index)}
    >
      <img
        className={`w-full h-full object-cover saturate-0 group-hover:saturate-100 transition-all duration-200 ease-in-out 
        ${activeIndex === index ? "max-md:saturate-100" : ""}`}
        src={artist}
        alt={`Artist ${index + 1}`}
      />
    </div>
  );

  return (
    <div className="w-full overflow-x-hidden">
      <Typo />
      <div className="h-screen max-md:h-[40vh] w-full flex justify-center items-center max-md:gap-2 gap-5 overflow-hidden">
        {artists.map((artist, index) => componentMap(artist, index))}
      </div>
    </div>
  );
};

export default Artist;
