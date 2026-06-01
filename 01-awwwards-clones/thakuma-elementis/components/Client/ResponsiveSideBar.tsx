"use client";

import SideBarMobile from "@/components/Client/SideBarMobile";
import SideBar from "@/components/Client/SideBar";
import { AnimatePresence } from "motion/react";
import { Dispatch, SetStateAction } from "react";

function ResponsiveSideBar({
  isMobile,
  openSideBar,
  setOpenSideBar,
}: {
  openSideBar: boolean;
  isMobile: boolean | null;
  setOpenSideBar: Dispatch<SetStateAction<boolean>>;
}) {
  if (typeof isMobile != "boolean") {
    return null;
  }
  return (
    <AnimatePresence>
      {openSideBar && (
        <>
          {isMobile ? (
            <SideBarMobile key="sidebar-mobile" />
          ) : (
            <SideBar key="sidebar-desktop" setOpenSideBar={setOpenSideBar} />
          )}
        </>
      )}
    </AnimatePresence>
  );
}

export default ResponsiveSideBar;
