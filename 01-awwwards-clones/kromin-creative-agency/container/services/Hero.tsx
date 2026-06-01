"use client";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { footerImage } from "@public";
import { TextMask } from "@animation";

export default function Hero() {
	const phrases = [
		"We know how to innovate, ",
		"we believe in ideas and ",
		"results",
	];
	const plane1 = useRef(null);
	let requestAnimationFrameId: any = null;
	let xForce = 0;
	let yForce = 0;
	const easing = 0.08;
	const speed = 0.01;

	const manageMouseMove = (e: any) => {
		const { movementX, movementY } = e;
		xForce += movementX * speed;
		yForce += movementY * speed;

		if (requestAnimationFrameId == null) {
			requestAnimationFrameId = requestAnimationFrame(animate);
		}
	};

	const lerp = (start: number, target: number, amount: number) =>
		start * (1 - amount) + target * amount;

	const animate = () => {
		xForce = lerp(xForce, 0, easing);
		yForce = lerp(yForce, 0, easing);
		gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
		if (Math.abs(xForce) < 0.01) xForce = 0;
		if (Math.abs(yForce) < 0.01) yForce = 0;

		if (xForce != 0 || yForce != 0) {
			requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(requestAnimationFrameId);
			requestAnimationFrameId = null;
		}
	};
	return (
		<div
			className="w-full h-[70vh] relative flex flex-col items-center justify-center"
			onMouseMove={(e) => {
				manageMouseMove(e);
			}}>
			<div className="w-[70%] mx-auto flex justify-center flex-col gap-6">
				<div className="w-[100px] h-[3px] rounded-full bg-[#b84ff8]" />
				<h1 className="text-white text-[56px] font-extrabold">
					<TextMask>{phrases}</TextMask>
				</h1>
				<p className="text-[20px] text-white tracking-[1.3px]">
					We see each new project as an opportunity to create <br /> something
					unique and special: challenges excite us. Always.
				</p>
			</div>
			<div className="flex items-center absolute right-[5%] justify-center transition-all duration-200 ease-linear">
				<div className="h-[400px] blur-[80px] hero-gradient rounded-full w-[400px] sm:w-[300px] xm:w-[300px]" />
				<div
					ref={plane1}
					className="w-full h-full absolute sm:hidden xm:hidden">
					<Image
						src={footerImage}
						alt="image"
						width={100}
						className="absolute odd:brightness-75 top-1/4 left-[100px]"
					/>
				</div>
			</div>
		</div>
	);
}
