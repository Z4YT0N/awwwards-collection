"use client";
import Image from "next/image";
import { heroImg } from "@public";
import { TextMask } from "@animation";
import { Navbar, Partner } from "@components";
import { useRef } from "react";
import gsap from "gsap";

export default function Hero() {
	const phrases = ["Digital solutions", "for your Business."];
	const phrases1 = ["DATA. DESIGN. DEVELOPMENT. MARKETING."];
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
			onMouseMove={(e) => {
				manageMouseMove(e);
			}}
			className="w-full h-[115vh] flex flex-col items-center justify-between relative">
			<Navbar />
			<div className="w-[70%] sm:w-full xm:w-full relative flex gap-10 items-center padding-x  justify-between">
				<div className="flex items-center absolute left-[5%] justify-center transition-all duration-200 ease-linear">
					<div className="h-[400px] blur-[80px] hero-gradient rounded-full w-[400px] sm:w-[300px] xm:w-[300px]" />
					<div
						ref={plane1}
						className="w-full h-full absolute sm:hidden xm:hidden">
						<Image
							src={heroImg}
							alt="image"
							width={100}
							className="absolute odd:brightness-75 top-1/4 left-[100px]"
						/>
					</div>
				</div>
				<div className="w-full flex h-full items-center justify-center flex-col gap-10 overflow-hidden">
					<h1 className="text-white leading-none text-[80px] sm:text-[60px] xm:text-[60px] font-extrabold text-center font-[ProximaNova-Black]">
						<TextMask>{phrases}</TextMask>
					</h1>
					<h1 className="sub-heading text-[#b84ff8] text-center tracking-[1.3px] font-bold overflow-hidden">
						<TextMask>{phrases1}</TextMask>
					</h1>
				</div>
			</div>
			<div className="w-full pb-6">
				<Partner />
			</div>
		</div>
	);
}
