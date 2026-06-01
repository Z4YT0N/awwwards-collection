"use client";
import Image from "next/image";
import { useState } from "react";
import { menuDrop } from "@/public";
import TextHover from "./text-hover";
import { motion } from "framer-motion";
import { navItemss, socialItem } from "@/constants";

export default function Menu() {
	const [hidden, setHidden] = useState(true);

	return (
		<motion.div
			initial={{ y: -430 }}
			animate={hidden ? { y: -430 } : { y: -30 }}
			transition={{ duration: 0.8, ease: "backInOut", type: "tween" }}
			className="absolute -translate-x-1/2 left-[35%] z-[999]">
			<div className="bg-greenColor p-10 w-[540px] rounded-[50px] -mb-24 z-[999]">
				{navItemss.map((item) => (
					<div
						key={item.id}
						className="flex py-2 flex-col">
						<TextHover
							titile1={item.title}
							titile2={item.title}
						/>
						<span className="w-full border-b border-[#1c1c1c33]" />
					</div>
				))}
				<div className="w-full flex items-center justify-center py-3 gap-2">
					{socialItem.map((item) => (
						<Image
							key={item.id}
							src={item.src}
							alt="menuDrop"
							width={30}
							height={30}
							className="cursor-pointer opacity-50 hover:opacity-100 transition-all duration-200 ease-linear hover:-translate-y-2 z-50"
						/>
					))}
				</div>
			</div>
			<div
				onClick={() => setHidden(!hidden)}
				className="relative cursor-pointer">
				<Image
					src={menuDrop}
					alt="menuDrop"
					width={180}
					height={180}
					className="w-full h-full object-cover"
				/>
				<div className="absolute left-1/2 bottom-5 -translate-x-1/2">
					<button
						type="button"
						onClick={() => setHidden(!hidden)}
						className="cursor-pointer">
						<div
							className={`w-[28px] h-[2px] transition ease-in duration-150  bg-black/50 ${
								!hidden ? "rotate-45 mb-0  translate-y-[1px]" : "rotate-0 mb-1"
							} `}
						/>
						<div
							className={`w-[28px] h-[2px] transition ease-in duration-150 bg-black/50 ${
								!hidden ? "hidden mb-0" : "mb-1"
							} `}
						/>
						<div
							className={`w-[28px] h-[2px] transition ease-in duration-150 bg-black/50  ${
								!hidden ? "-rotate-45 mb-0" : "rotate-0"
							}`}
						/>
					</button>
				</div>
			</div>
		</motion.div>
	);
}
