"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { TprocessProps } from "@types";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Portfolio() {
	const [data, setData] = useState<TprocessProps[]>([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get("/api/process");
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
	}, []);
	return (
		<motion.section className="w-full padding-y bg-white">
			{data.map((item) => (
				<motion.div
					key={item.id}
					className="w-[70%] sm:w-full xm:w-full mx-auto flex sm:flex-col xm:flex-col gap-10 padding-x mb-10">
					<motion.div className="flex flex-col gap-20 w-[500px] h-[500px] sm:w-full xm:w-full sm:h-full xm:h-full">
						<div className="w-full h-full">
							<video
								className="w-full h-full"
								loop
								muted
								autoPlay
								src={item.videoUrl}
							/>
						</div>
					</motion.div>
					<motion.div
						initial={{ y: "100%", opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 1.5, ease: "backInOut", type: "spring" }}
						viewport={{ once: true }}
						className="flex flex-col gap-4 w-[500px] h-[500px] sm:w-full xm:w-full justify-center overflow-hidden sm:items-start xm:items-start sm:h-full xm:h-full"
						key={item.id}>
						<motion.h1 className="text-[50px] leading-none font-extrabold text-[#1d0f41]">
							{item.title}
						</motion.h1>
						<motion.p className="font-[Muli] text-[30px] text-[#1d0f41ab] leading-[40px] font-medium">
							{item.description}
						</motion.p>
						<motion.div className="w-fit sm:w-full xm:w-full flex items-center gap-6 rounded-full group">
							<motion.p className="text-[16px] cursor-pointer uppercase tracking-wider font-bold text-[#1d0f41]">
								get inspired
							</motion.p>
							<FaArrowRightLong
								size={20}
								className="group-hover:translate-x-1 duration-200 ease-in-out text-[#A340F4]"
							/>
						</motion.div>
					</motion.div>
				</motion.div>
			))}
			<div className="w-full mt-[50px]  flex items-center justify-center">
				<div
					className="w-fit flex items-center justify-between gap-6 px-6 py-3 rounded-full group"
					style={{
						background: "linear-gradient(90deg, #A340F4 0%, #AE48F6 100%)",
					}}>
					<p className="text-[16px] cursor-pointer text-white uppercase tracking-wider font-medium">
						all success cases
					</p>
					<FaArrowRightLong
						size={20}
						className="group-hover:translate-x-1 duration-200 ease-in-out text-white"
					/>
				</div>
			</div>
		</motion.section>
	);
}
