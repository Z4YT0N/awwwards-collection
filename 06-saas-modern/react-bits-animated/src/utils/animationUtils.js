export const map = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end;
};

export const getMousePos = e => {
  return {
    x: e.clientX,
    y: e.clientY
  };
};

export const calcWinsize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

export const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
