const formatTime = (time) => {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export { formatTime };
