import { useState } from "react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { projects } from "../utils/data";
export default function Trending() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <main className="flex font-['Primary']  py-10  items-center justify-center z-[2] ">
      <div className="w-full flex flex-col items-center justify-center">
        {projects.map((item, index) => (
          <Project index={index} item={item} setModal={setModal} key={index} />
        ))}
      </div>
      <Modal modal={modal} projects={projects} />
    </main>
  );
}

function Project({ index, item, setModal }) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className={`h-[18vh] border-t-[1px] z-[2]  ${
        index === projects.length - 1 ? "border-b-[1px]" : ""
      } w-[96%] py-5 mx-auto border-[#9e9e9ed0] flex items-start justify-between text-white text-base max-md:text-sm leading-none`}
    >
      <div className="w-[40%] max-lg:w-[60%] flex items-start justify-between ">
        <h3 className=" text-lg z-[2] ">{item.songName}</h3>
        <h3 className="max-md:hidden w-[40%] opacity-70 ">
          Details: <br /> {item.details}
        </h3>
      </div>
      <div className="w-[30%] max-xl:w-[10%] max-md:w-[15%] max-sm:w-[25%] flex items-start justify-between text-start">
        <div className="flex flex-col gap-5 max-lg:gap-4 items-center">
          <div className="w-full flex gap-[5px] items-start  ">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`h-[12px] w-[12px] max-lg:h-[10px] max-lg:w-[10px] rounded-full ${
                  item.rating < index + 1 ? "bg-[#fff]" : "bg-[#0A8296]"
                }`}
              ></div>
            ))}
          </div>

          <div className="w-full leading-none  max-xl:items-end flex flex-col gap-1 text-start items-start opacity-70  ">
            {item.artist.map((artist, index) => (
              <h3 key={index}>{artist}</h3>
            ))}
            <h3>{item.releaseDate}</h3>
          </div>
        </div>
        <p className="w-[40%] max-xl:hidden opacity-70">{item.purpose}</p>
      </div>
    </div>
  );
}

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

function Modal({ modal, projects }) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-[300px] w-[400px] max-xl:w-[250px] max-xl:h-[200px] absolute bg-black text-xs font-['Primary'] z-[4]  overflow-hidden pointer-events-none flex items-center justify-center"
      >
        <div
          style={{ top: `${index * -100}%` }}
          className="h-full w-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"
        >
          {projects.map((project, idx) => {
            const { imgSrc } = project;
            return (
              <div
                className="h-full w-full flex items-center justify-center"
                key={`modal_${idx}`}
              >
                <img
                  src={imgSrc}
                  className="h-full w-full object-cover"
                  alt="image"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        className="w-[80px] h-[80px] rounded-full bg-[#1b1b1b34] text-white absolute z-2 flex items-center justify-center backdrop-blur-[20px]  font-light pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        className="w-[80px] h-[80px] rounded-full bg-transparent text-white absolute z-2 flex items-center justify-center  font-light pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
}
