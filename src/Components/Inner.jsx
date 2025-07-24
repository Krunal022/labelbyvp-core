import { motion } from "framer-motion";

const Inner = ({ children }) => {
  const anim = (variants, custom) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
    custom,
  });

  const expand = {
    initial: {
      top: 0,
    },
    enter: (i) => ({
      top: "100%",
      transition: {
        duration: 0.5,
        delay: 0.05 * i,
        ease: [0.61, 1, 0.88, 1],
      },
      transitionEnd: {
        height: 0,
        top: 0,
      },
    }),
    exit: (i) => ({
      height: "100%",
      transition: {
        duration: 0.5,
        delay: 0.03 * i,
        ease: [0.61, 1, 0.88, 1],
      },
    }),
  };

  const Number = window.innerWidth < 786 ? 5 : 10;

  return (
    <div className="">
      <div className="transition-cont fixed top-0 left-0 flex h-screen z-[4] w-full pointer-events-none">
        {Array.from({ length: Number }, (_, i) => (
          <motion.div
            key={i}
            {...anim(expand, Number - i)}
            className="w-full relative h-full bg-black"
          ></motion.div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default Inner;
