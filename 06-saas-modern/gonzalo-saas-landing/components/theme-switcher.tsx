"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const [svg, setSvg] = useState(<MoonIcon />);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
      setSvg(<MoonIcon />);
    } else {
      setTheme("light");
      setSvg(<SunIcon />);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      {svg}
    </Button>
  );
}
