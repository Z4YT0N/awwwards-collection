"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Sticky() {
	const cursorSize = 100;
	const mouse = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};
	const [isVisible, setIsVisible] = useState(false); // New state for visibility

	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouse = {
		x: useSpring(mouse.x, smoothOptions),
		y: useSpring(mouse.y, smoothOptions),
	};

	const manageMouseMove = (e: MouseEvent) => {
		const { clientX, clientY } = e;
		mouse.x.set(clientX - cursorSize / 2.1);
		mouse.y.set(clientY - cursorSize / 3.5);
	};

	useEffect(() => {
		const sliderContainers = document.querySelectorAll(".slider-container");

		const handleMouseEnter = () => {
			setIsVisible(true);
			window.addEventListener("mousemove", manageMouseMove);
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
			window.removeEventListener("mousemove", manageMouseMove);
		};

		sliderContainers.forEach((container) => {
			container.addEventListener("mouseenter", handleMouseEnter);
			container.addEventListener("mouseleave", handleMouseLeave);
		});

		return () => {
			sliderContainers.forEach((container) => {
				container.removeEventListener("mouseenter", handleMouseEnter);
				container.removeEventListener("mouseleave", handleMouseLeave);
			});
		};
	}, [manageMouseMove]);

	if (!isVisible) return null; // Only render if visible

	return (
		<motion.div
			className="fixed rounded-[50px] z-[100] bg-white p-4 pointer-events-none"
			style={{
				left: smoothMouse.x,
				top: smoothMouse.y,
			}}>
			<div className="flex items-center gap-2 justify-center">
				<BsArrowLeft size={10} />
				<h1 className="text-black text-center uppercase font-helveticaNeue font-medium text-sm">
					Drag
				</h1>
				<BsArrowRight size={10} />
			</div>
		</motion.div>
	);
}
