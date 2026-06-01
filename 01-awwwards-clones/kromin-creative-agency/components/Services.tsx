"use client";
import axios from "axios";
import Image from "next/image";
import { TservicesProps } from "@types";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Services() {
	const [data, setData] = useState<TservicesProps[]>([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get("/api/post");
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
	}, []);

	const container = useRef(null);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end start"],
	});

	const bgColor = useTransform(
		scrollYProgress,
		[0, 0.03],
		["#FFFFFF", "#1d0f41"],
	);
	const textColor = useTransform(
		scrollYProgress,
		[0, 0.03],
		["#1d0f41", "#FFFFFF"],
	);

	return (
		<motion.section
			className="w-full padding-y transition-all duration-500 ease-in-out"
			ref={container}
			style={{ backgroundColor: bgColor }}>
			<motion.div className="w-[70%] sm:w-full xm:w-full sm:flex-col xm:flex-col mx-auto flex justify-between gap-4 padding-x transition-all duration-500 ease-in-out">
				<motion.div className="w-1/2 sm:w-full xm:w-full flex flex-col gap-6 sticky top-[10%] h-full sm:static xm:static">
					<motion.p className="text-[16px] text-[#b84ff8] leading-none font-semibold">
						WE WANT TO STAND OUT
					</motion.p>
					<motion.h1
						className="text-[60px] leading-none font-extrabold"
						style={{ color: textColor }}>
						Why Kromin
					</motion.h1>
					<motion.div className="w-[100px] h-[3px] rounded-full bg-[#b84ff8]" />
					<motion.div className="w-fit sm:w-full xm:w-full flex items-center gap-6 rounded-full group">
						<motion.p
							className="text-[18px] cursor-pointer uppercase tracking-wider font-bold"
							style={{ color: textColor }}>
							discover our services
						</motion.p>
						<FaArrowRightLong
							size={20}
							className="group-hover:translate-x-1 duration-200 ease-in-out text-[#b84ff8]"
						/>
					</motion.div>
				</motion.div>
				<motion.div className="w-1/2 sm:w-full xm:w-full flex flex-col gap-20">
					<motion.p
						className="font-[Muli] text-[20px] font-normal leading-[40px]"
						style={{ color: textColor }}>
						Kromin allows its clients to bring ambitious projects to life.
						Starting from Data Analysis we shape Marketing Strategies and
						Digital Products, enriched by our Contents Media. We talk about
						numbers and results, our services are just the tip of the iceberg.
						The proactivity of our approach facilitates teamwork with our
						clients, making us proud of what we do.
					</motion.p>
					{data && (
						<>
							{data.map((item) => (
								<motion.div
									initial={{ y: 100 }}
									whileInView={{ y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 1, ease: "easeInOut" }}
									className="flex flex-col gap-4"
									key={item.id}>
									<Image
										src={item.imageUrl}
										alt={item.title}
										width={80}
										height={80}
										className="w-[80px] h-[80px]"
									/>
									<motion.h1 className="text-[18px] leading-none font-extrabold text-[#b84ff8]">
										{item.title}
									</motion.h1>
									<motion.p
										className="font-[Muli] text-[20px] leading-[40px]"
										style={{ color: textColor }}>
										{item.description}
									</motion.p>
								</motion.div>
							))}
						</>
					)}
				</motion.div>
			</motion.div>
		</motion.section>
	);
}
