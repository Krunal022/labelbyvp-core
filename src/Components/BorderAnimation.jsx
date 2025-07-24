import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BorderAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const lineVariants = {
    hidden: { width: 0 },
    visible: (side) => ({
      width: "96vw",
      x: side === "left" ? "-50%" : "50%",
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };

  return (
    <div
      ref={ref}
      className="relative  w-full flex items-center justify-center h-[0.5px] "
    >
      <motion.div
        className="absolute h-[0.5px] bg-[#ffffffad] left-1/2 top-1/2"
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom="left"
      />
      <motion.div
        className="absolute h-[0.5px] bg-[#fffffffb] right-1/2 top-1/2"
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom="right"
      />
    </div>
  );
};

export default BorderAnimation;
