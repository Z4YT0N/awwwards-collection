"use client";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Eye() {
	const emojiRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const emojiFaceRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const emoji = emojiRef.current;
		const emojiFace = emojiFaceRef.current;

		if (!wrapper || !emoji || !emojiFace) return;

		const moveEvent = (e: MouseEvent) => {
			const wrapperRect = wrapper.getBoundingClientRect();

			const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
			const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

			const emojiMaxDisplacement = 50;
			const emojiFaceMaxDisplacement = 75;

			const emojiDisplacementX =
				(relX / wrapperRect.width) * emojiMaxDisplacement;
			const emojiDisplacementY =
				(relY / wrapperRect.height) * emojiMaxDisplacement;
			const emojiFaceDisplacementX =
				(relX / wrapperRect.width) * emojiFaceMaxDisplacement;
			const emojiFaceDisplacementY =
				(relY / wrapperRect.height) * emojiFaceMaxDisplacement;

			gsap.to(emoji, {
				x: emojiDisplacementX,
				y: emojiDisplacementY,
				ease: "power3.out",
				duration: 0.35,
			});

			gsap.to(emojiFace, {
				x: emojiFaceDisplacementX,
				y: emojiFaceDisplacementY,
				ease: "power3.out",
				duration: 0.35,
			});
		};

		const leaveEvent = () => {
			gsap.to([emoji, emojiFace], {
				x: 0,
				y: 0,
				ease: "power3.out",
				duration: 1,
			});
		};

		wrapper.addEventListener("mousemove", moveEvent);
		wrapper.addEventListener("mouseleave", leaveEvent);

		return () => {
			wrapper.removeEventListener("mousemove", moveEvent);
			wrapper.removeEventListener("mouseleave", leaveEvent);
		};
	}, []);

	return (
		<div
			className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] py-8"
			ref={wrapperRef}>
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[url('/sphere.png')] bg-cover rounded-full"
				ref={emojiRef}>
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[225px] h-[200px] flex flex-col"
					ref={emojiFaceRef}>
					<div className="flex flex-1 justify-between">
						<motion.img
							animate={{
								rotate: [0, 360],
								transition: {
									duration: 4,
									ease: "linear",
									repeat: Infinity,
								},
							}}
							src={"/eyes.svg"}
							alt="right eye"
							width={50}
							height={50}
							className="w-[80px] h-[80px]"
						/>
						<motion.img
							animate={{
								rotate: [0, 360],
								transition: {
									duration: 4,
									ease: "linear",
									repeat: Infinity,
								},
							}}
							src={"/eyes.svg"}
							alt="right eye"
							width={50}
							height={50}
							className="w-[80px] h-[80px]"
						/>
					</div>
					<div className="flex flex-1 justify-center items-start">
						<motion.div
							animate={{
								height: [50, 80, 50],
								transition: {
									duration: 2,
									ease: [0.075, 0.82, 0.165, 1],
									repeat: Infinity,
									repeatType: "reverse",
								},
							}}
							className="w-10 h-10 rounded-full bg-black"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
