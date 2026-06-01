"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Sticky() {
	const cursorSize = 40;
	const mouse = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouse = {
		x: useSpring(mouse.x, smoothOptions),
		y: useSpring(mouse.y, smoothOptions),
	};

	const manageMouseMove = (e: any) => {
		const { clientX, clientY } = e;
		mouse.x.set(clientX - cursorSize / 2);
		mouse.y.set(clientY - cursorSize / 2);
	};
	useEffect(() => {
		window.addEventListener("mousemove", manageMouseMove);
		return () => {
			window.removeEventListener("mousemove", manageMouseMove);
		};
	});

	return (
		<motion.div
			className="w-[30px] h-[30px] fixed rounded-full bg-[#ae48f657] pointer-events-none z-50 sm:hidden xm:hidden flex"
			style={{
				left: smoothMouse.x,
				top: smoothMouse.y,
			}}
		/>
	);
}
