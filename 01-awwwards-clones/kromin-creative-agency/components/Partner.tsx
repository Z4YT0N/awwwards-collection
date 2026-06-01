"use client";
import Image from "next/image";
import { LogoMarquee } from "@animation";
import { skillsData } from "@constants";
import { useState } from "react";

export default function Skills() {
	const [hoveredId, setHoveredId] = useState(0);
	const [hoveredId1, setHoveredId1] = useState(0);

	return (
		<section className="w-full">
			<div className="w-full flex flex-col gap-[30px]">
				<LogoMarquee baseVelocity={-0.4}>
					<div className="flex m-0 gap-x-[100px] items-center mr-[20px]">
						{skillsData.map((item) => (
							<div
								className="w-[150px] h-[100px]"
								key={item.id}>
								<Image
									onMouseEnter={() => setHoveredId(item.id)}
									onMouseLeave={() => setHoveredId(0)}
									src={item.src}
									alt="asd"
									width={200}
									height={100}
									className={`w-[150px] h-[100px] transition-all duration-200 ease-linear ${
										hoveredId === item.id
											? "opacity-100 scale-125"
											: "opacity-50"
									}`}
								/>
							</div>
						))}
					</div>
				</LogoMarquee>
				<LogoMarquee baseVelocity={0.4}>
					<div className="flex m-0 gap-x-[100px] items-center mr-[20px]">
						{skillsData.map((item) => (
							<div
								className="w-[150px] h-[100px]"
								key={item.id}>
								<Image
									onMouseEnter={() => setHoveredId1(item.id)}
									onMouseLeave={() => setHoveredId1(0)}
									src={item.src}
									alt="asd"
									width={200}
									height={100}
									className={`w-[150px] h-[100px] transition-all duration-200 ease-linear ${
										hoveredId1 === item.id
											? "opacity-100 scale-125"
											: "opacity-50"
									}`}
								/>
							</div>
						))}
					</div>
				</LogoMarquee>
			</div>
		</section>
	);
}
