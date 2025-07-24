import React, { useEffect, useState } from "react";
import LandingPage from "../Components/LandingPage";
import Trending from "../Components/Trending";
import HomeExplore from "../Components/HomeExplore";
import { BsArrow90DegRight } from "react-icons/bs";
import HomeAbout from "../Components/HomeAbout";
import Typo2 from "../Components/Typo2";
import DiscramblerText from "../Components/DiscramblerText";
import PreFooter from "../Components/PreFooter";
import Footer from "../Components/Footer";
import Join from "../Components/Join";
import Button from "../Components/Button";
import image from "../assets/x.jpg";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 786);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <main className="w-full h-full">
      {/* Hero Section */}
      <section className="relative w-full h-[250vh] max-md:h-[170vh] bg-transparent">
        <div className="sticky top-0 w-full h-[100vh]">
          {isMobile ? (
            <div className="h-full w-full md:hidden">
              <img
                className="h-full w-full object-cover"
                src={image}
                alt="Mobile Landing"
              />
            </div>
          ) : (
            <LandingPage />
          )}

          {/* Top Sticky Navigation Text */}
          <div className="absolute w-full h-[5vh] top-[55%] -translate-y-1/2 text-white flex items-center justify-evenly max-md:justify-between max-md:px-1 text-lg max-md:text-xs font-medium">
            <DiscramblerText className="cursor-pointer">Drops</DiscramblerText>
            <DiscramblerText className="cursor-pointer">
              T-SHIRTS
            </DiscramblerText>

            <div className="flex gap-1">
              <Button
                navigate="/explore"
                className="bg-white/10 border-white/15 rounded-sm text-white p-3 max-md:p-2 max-md:text-xs text-lg rotate-x-180"
              >
                <BsArrow90DegRight />
              </Button>
              <Button
                navigate="/collection"
                className="bg-white/10 border-white/15 font-['Primary'] rounded-sm text-white p-3 max-md:text-xs max-md:p-2 text-lg leading-none"
              >
                <h2>Explore More</h2>
              </Button>
            </div>

            <DiscramblerText className="cursor-pointer">PANTS</DiscramblerText>
            <DiscramblerText className="cursor-pointer">Drops </DiscramblerText>
          </div>
        </div>

        <div className="absolute top-[100vh] w-full h-[150vh] max-md:h-[70vh] bg-black">
          <HomeAbout />
        </div>
      </section>

      <Typo2 />
      <Trending />
      <HomeExplore />
      <Join />
      <PreFooter />
      <Footer />
    </main>
  );
};

export default Home;
