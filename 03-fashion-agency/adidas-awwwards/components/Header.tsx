"use client";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import MusicStreamLine from "./MusicStreamLine";

const Header = () => {
  const color = useParams()?.slug === "white" ? "bg-black" : "bg-white";
  const { replace } = useRouter();
  return (
    <div className="fixed z-10 flex justify-between items-center w-full md:pt-10 pt-3 md:px-20 px-5">
      <div
        onClick={() => {
          replace("/");
        }}
        className={clsx(
          "mask-[url(/icons/footLocker.svg)] md:w-44 w-40 h-16 mask-no-repeat hover-animation ",
          color
        )}
      />
      <MusicStreamLine color={color} />
    </div>
  );
};

export default Header;
