import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Inner from "./Components/Inner";
import Home from "./Pages/Home";
import Artist from "./Pages/Artist";
import Explore from "./Pages/Explore";
import Lenis from "@studio-freight/lenis";
import { useEffect, useCallback, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
// import Playlist from "./Pages/Playlist";
import { BsArrow90DegRight } from "react-icons/bs";
import gsap from "gsap";
import Button from "./Components/Button";
import SignIn from "./Components/SignIn";
import Preloader from "./Components/PreLoader";

const App = () => {
  const mouseFollowerRef = useRef(null);
  const lenisRef = useRef(null);
  const location = useLocation();

  const [openSignIn, setOpenSignIn] = useState(false);

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  const handleMouseMoveEvent = useCallback((e) => {
    const { clientX, clientY } = e;
    gsap.to(mouseFollowerRef.current, {
      x: clientX,
      y: clientY,
    });
  }, []);

  return (
    <div
      onMouseMove={handleMouseMoveEvent}
      className="relative bg-black focus:outline-none"
      data-scroll-container
    >
      <Preloader />

      {/* Mouse Follower */}
      <div className="fixed h-screen w-full pointer-events-none">
        <div className="h-full w-full">
          <div
            ref={mouseFollowerRef}
            style={{ backgroundColor: `#1AA4BB` }}
            className="absolute z-[1] -translate-x-1/2 -translate-y-1/2 h-[25vh] w-[25vh] rounded-full max-sm:h-[10vh] max-sm:w-[10vh] max-sm:blur-[70px] blur-[200px] drop-shadow-xl"
          ></div>
        </div>
      </div>

      {/* Top Header */}
      <div className="fixed top-0 left-0 z-2 h-[10vh] w-full px-10 max-md:px-3 flex items-center justify-between text-white">
        <h5 className="font-['Decorative'] text-4xl">VP.</h5>
        <div className="flex gap-2">
          <div className="flex gap-1 font-['Secondary']">
            <Button className="bg-white/10 border-white/15 rounded-sm text-white p-3 max-md:text-sm text-lg rotate-x-180">
              <BsArrow90DegRight />
            </Button>
            <Button
              onClick={() => setOpenSignIn(true)}
              className="bg-white/10 border-white/15 rounded-sm text-white p-3 max-md:text-sm text-lg leading-none"
            >
              Login
            </Button>
            <SignIn openSignIn={openSignIn} SetOpenSignIn={setOpenSignIn} />
          </div>
        </div>
      </div>

      <Navbar />

      {/* Pages */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Inner>
                <Home />
              </Inner>
            }
          />
          <Route
            path="/collection"
            element={
              <Inner>
                <Explore />
              </Inner>
            }
          />
          <Route
            path="/story"
            element={
              <Inner>
                <Artist />
              </Inner>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
