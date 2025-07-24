import React from "react";
import BorderAnimation from "./BorderAnimation";
import Button from "./Button";
import { BsArrow90DegRight, BsArrowUpRight } from "react-icons/bs";

// Reusable link list
const LinkColumn = ({ links = [] }) => (
  <div className="flex flex-col gap-5  max-md:gap-6">
    {links.map((text, index) => (
      <h2 key={index} className="z-[2]">
        {text}
      </h2>
    ))}
  </div>
);

// Reusable social button
const SocialButton = ({ href }) => (
  <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3 text-xl max-md:text-sm">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <i class="ri-link"></i>{" "}
    </a>
  </Button>
);

const PreFooter = () => {
  return (
    <div className="h-[35vh] max-md:h-[30vh] w-full bg-black text-white py-10 px-20 max-md:px-2 text-[1.5rem]">
      <div className="h-[85%] max-md:h-[90%] w-full flex justify-between items-center max-md:text-sm">
        <LinkColumn
          links={["Terms & conditions", "Return & Exchanges", "Privacy policy"]}
        />
        <LinkColumn links={["Instagram", "Facebook", "Twitter"]} />
        <div className="flex flex-col gap-5 max-md:gap-2">
          <div className="flex gap-3">
            <SocialButton href="https://www.instagram.com/labelbyvp/" />
            <div className="flex gap-1 max-sm:hidden">
              <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3 max-md:text-sm text-xl rotate-x-180">
                <BsArrow90DegRight />
              </Button>
              <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3 max-md:text-sm text-xl leading-none">
                <h2>CONTACT US</h2>
              </Button>
            </div>
          </div>
          <SocialButton href="https://www.facebook.com/share/1CBTq1GteH/" />
          <SocialButton href="https://www.labelbyvp.com/?fbclid=IwZXh0bgNhZW0CMTEAAR4NUQExw6qW_CPgBcxPWwjGKmouuRmXgJaCYWCFIhwDq3QtouCn9TpZa5z_Qg_aem_3daH2xQzaHq0HfXFXUvaiA " />
        </div>
      </div>
      <div className="h-[15%] max-md:h-[10%] w-full flex justify-between items-end">
        <BorderAnimation />
      </div>
    </div>
  );
};

export default PreFooter;
