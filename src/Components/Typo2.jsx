import React from "react";
import Paragraph from "./Paragraph";

const Typo2 = () => {
  return (
    <div>
      <div className="h-screen max-md:h-[35vh] w-full flex flex-col justify-center items-center text-[5vw] max-md:text-[5.5vw] px-4 max-md:py-5  leading-none font-bold text-white   ">
        <h1 className="w-full max-w-5xl flex justify-center gap-8 text-center  translate-x-[-10%]  ">
          <span className="text-lg max-md:text-sm opacity-70 font-medium font-['Primary'] ">
            (Trending)
          </span>
          <Paragraph
            className={` font-['Secondary'] `}
            phrases={["Fresh Drops. Loud Impact. "]}
          />
        </h1>
        <Paragraph
          className={`text-center font-['Secondary'] `}
          phrases={[
            "Styles that rise with the moment,",
            "speak in design,",
            "and stay timeless.",
          ]}
        />
      </div>
    </div>
  );
};

export default Typo2;
