import React from "react";

const Footer = () => {
  return (
    <div>
      <div
        className="relative h-[45vh] max-md:h-[15vh]  "
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0  h-[45vh] max-md:h-[15vh] w-full text-black overflow-hidden ">
          <div className="h-full w-full bg-gradient-to-t from-[#1aa3bb3a] to-transparent px-10 max-md:px-2 text-white ">
            <div className="h-[35vh] max-md:h-[10vh] w-full text-[12.5vw]  flex  items-end justify-center leading-none   ">
              <h4 className='font-["Decorative"] '>LABELBYVP</h4>
            </div>
            <div className="h-[10vh] max-md:h-[5vh]  max-md:text-[2.5vw] w-full flex items-center justify-between opacity-70 ">
              <h2>© 2025 LabelByVp </h2>
              <h2>
                <span> Design by </span> yourFavGolu
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
