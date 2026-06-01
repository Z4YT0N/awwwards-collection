"use client";

import { useEffect, useState } from "react";

const useUserActivity = () => {
  const [activeUser, setActiveUser] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      setActiveUser(true); // user is active
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setActiveUser(false); // user inactive after 10s
      }, 10000); // 10 seconds
    };

    // Listen for mouse movement, clicks, key presses
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // Start the timer initially
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return activeUser;
};

export default useUserActivity;
