import React, { createContext, useState } from "react";

export const SongContext = createContext();

const Context = (props) => {
  const [Song, setSong] = useState({
    songName: "Until I Found You",
    duration: "2.56",
    songImg: "/s.webp",
    song: "https://res.cloudinary.com/dqzci9flc/video/upload/v1744662480/Stephen_Sanchez_-_Until_I_Found_You_Official_Video_bcgnzl.mp3",
  });

  const [rotated, setRotated] = useState(false);
  const [progress, setProgress] = useState(0); // ✅ Add this for live duration

  return (
    <SongContext.Provider
      value={{
        Song,
        setSong,
        rotated,
        setRotated,
        progress, // ✅ Make available globally
        setProgress, // ✅ Make setter available
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
};

export default Context;
