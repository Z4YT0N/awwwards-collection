import Image from "next/image";
import { AnimatedText } from "@/components";
import { party1, party2, party3 } from "@/public";

export default function WhatWeDo() {
	return (
		<>
			<div className="w-full py-20 bg-eventBgColor mt-20">
				<div className="w-full flex items-center justify-between gap-2 pt-60 px-10">
					<AnimatedText
						text="What we do"
						className="text-[250px] text-white overflow-hidden leading-[0.85]"
					/>
					<h1 className="text-[22px] font-helveticaNeue leading-none text-white uppercase text-right">
						The flow party offers up
						<br />
						many{" "}
						<span className="text-[32px] font-bodoniseventytwo leading-[0.9] lowercase">
							hot{" "}
						</span>
						treats for our
						<br /> flow party members
					</h1>
				</div>
			</div>
			<div className="w-full h-screen flex items-center">
				<div className="w-full bg-[#BFFF0A] h-full cursor-pointer relative p-10">
					<div className="w-full flex items-center justify-center h-full">
						<Image
							src={party1}
							alt={""}
							className="w-[400px] h-[400px] object-cover"
						/>
					</div>
					<div className="absolute bottom-0">
						<h2 className="text-[130px] uppercase leading-[0.8] text-[#1c1c1c] font-humaneMedium">
							challenges
						</h2>
					</div>
				</div>
				<div className="w-full bg-[#5546FF] h-full cursor-pointer relative p-10">
					<div className="w-full flex items-center justify-center h-full">
						<Image
							src={party2}
							alt={""}
							className="w-[400px] h-[400px] object-cover"
						/>
					</div>
					<div className="absolute bottom-0">
						<h2 className="text-[130px] uppercase leading-[0.8] text-[#1c1c1c] font-humaneMedium">
							live streams
						</h2>
					</div>
				</div>
				<div className="w-full bg-[#FF7BCA] h-full cursor-pointer relative p-10">
					<div className="w-full flex items-center justify-center h-full">
						<Image
							src={party3}
							alt={""}
							className="w-[400px] h-[400px] object-cover"
						/>
					</div>
					<div className="absolute bottom-0">
						<h2 className="text-[130px] uppercase leading-[0.8] text-[#1c1c1c] font-humaneMedium">
							after party
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}
