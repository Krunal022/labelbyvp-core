import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { IoMenu, IoClose, IoPlaySkipBack } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";
import { BsPauseCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SongContext } from "../utils/Context";

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // ✅ new

  const audioRef = useRef(null);
  const { Song, setSong, rotated, setRotated } = useContext(SongContext);

  const handleFrontClick = useCallback((e) => {
    e.stopPropagation();
    setRotated(true);
  }, []);

  const handleBottomClick = useCallback((e) => {
    e.stopPropagation();
    setRotated(false);
  }, []);

  const handleMenuClick = useCallback((e) => {
    e.stopPropagation();
    if (window.innerWidth <= 768) setIsOpen((prev) => !prev);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true); // ✅ User interacted

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.warn("Play failed:", err));
    }
  }, [isPlaying]);

  const handleSeek = useCallback((e) => {
    const value = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setProgress(value);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onMetadataLoaded = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setProgress(0);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onMetadataLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onMetadataLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load(); // Reload new song
    setProgress(0);
    setDuration(0);
    setIsPlaying(false);

    const onMetadataLoaded = () => {
      setDuration(audio.duration);

      // ✅ Only autoplay if user has interacted
      if (hasInteracted) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => console.warn("Autoplay blocked:", err));
      }
    };

    audio.addEventListener("loadedmetadata", onMetadataLoaded);

    return () => {
      audio.removeEventListener("loadedmetadata", onMetadataLoaded);
    };
  }, [Song, hasInteracted]); // ✅ depends on hasInteracted too

  return (
    <>
      <div
        style={{ perspective: "14000px" }}
        className="h-[10vh] text-white fixed font-['poppins'] uppercase z-[10] bottom-5 left-[50%] -translate-x-[50%] w-[35%] max-2xl:w-[45%] max-xl:w-[60%] max-lg:w-[65%] max-md:w-[40%] max-sm:w-[60%] bg-[#0000003a] overflow-hidden py-2 flex items-center justify-between backdrop-blur-2xl px-2 rounded-lg"
      >
        <div
          className={`relative h-full w-full flex items-center justify-center transition-transform duration-700 transform-style-3d ${
            rotated ? "rotate-x-90" : ""
          }`}
        >
          {/* FRONT FACE */}
          <div className="face front absolute h-full w-full flex items-center justify-between z-10">
            <div
              onClick={handleMenuClick}
              className="flex gap-5 max-sm:gap-2 rounded-[10px] items-center w-[22%] bg-[#00000041] h-full backdrop-blur-lg justify-center max-lg:w-[45%]"
            >
              <IoMenu /> Menu
            </div>

            {["Home", "Story", "Collection"].map((item, idx) => (
              <Link
                key={idx}
                to={`${idx === 0 ? "/" : `/${item.toLowerCase()}`}`}
                className={`${
                  idx === 3 ? "border-r-[1px] border-[#ffffff81] mr-1" : ""
                } px-4 py-2 text-sm max-md:hidden`}
                onClick={(e) => e.stopPropagation()}
              >
                {item}
              </Link>
            ))}

            <div
              onClick={handleFrontClick}
              className="w-[18%] max-lg:w-[50%] h-full bg-black relative cursor-pointer bg-cover bg-center"
              style={{ backgroundImage: `url(${Song.songImg})` }}
            >
              <IoIosPlayCircle className="absolute top-1/2 text-3xl left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
            </div>
          </div>

          {/* BOTTOM FACE */}
          <div className="face bottom absolute h-full w-full bg-[#0000001f] backdrop-blur-lg flex flex-col justify-between z-0">
            {/* Top Controls */}
            <div className="w-full h-[80%] px-2 max-sm:px-1 flex items-center justify-between">
              <div className="h-[95%] w-[35%] pointer-events-none flex items-center gap-3">
                <img
                  src={Song.songImg}
                  className="h-full w-[40%] max-md:w-full object-cover"
                  alt=""
                />
                <h3 className="text-[14px] leading-none capitalize max-md:hidden flex flex-col gap-2">
                  <span>{Song.songName}</span> {Song.duration}
                </h3>
              </div>
              <div className="flex items-center gap-4 max-sm:gap-2">
                <IoPlaySkipBack className="text-xl max-sm:text-lg" />
                <button onClick={togglePlay} className="cursor-pointer">
                  {isPlaying ? (
                    <BsPauseCircleFill className="text-4xl" />
                  ) : (
                    <IoIosPlayCircle className="text-4xl" />
                  )}
                </button>
                <IoPlaySkipBack className="rotate-180 max-sm:text-lg text-xl" />
              </div>
              <IoClose
                onClick={handleBottomClick}
                className="text-2xl max-sm:text-xl cursor-pointer"
              />
            </div>

            {/* Bottom Progress */}
            <div className="w-full h-[25%] px-2 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 appearance-none bg-transparent
                  [&::-webkit-slider-runnable-track]:h-1
                  [&::-webkit-slider-runnable-track]:bg-gradient-to-r
                  [&::-webkit-slider-runnable-track]:from-white
                  [&::-webkit-slider-runnable-track]:to-[#ffffff1a]
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:mt-[-4px]"
                style={{
                  background: `linear-gradient(to right, white ${
                    duration ? (progress / duration) * 100 : 0
                  }%, #ffffff1a 0%)`,
                }}
              />
            </div>

            <audio ref={audioRef} src={Song.song} preload="metadata" />
          </div>
        </div>
      </div>
      <div
        className={`fixed md:hidden w-[65%] font-['poppins']  sm:w-[45%] ${
          isOpen ? "h-[15vh] pt-2" : "h-0"
        } bg-[#00000048] backdrop-blur-lg duration-700 flex  justify-center overflow-hidden rounded-lg left-1/2 -translate-x-1/2 bottom-3 z-[2] text-white`}
      >
        {["Home", "Story", "Collection"].map((item, idx) => (
          <Link
            key={idx}
            to={`${idx === 0 ? "/" : `/${item.toLowerCase()}`}`}
            className={`px-2 max-sm:text-xs text-sm uppercase md:hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {item}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
