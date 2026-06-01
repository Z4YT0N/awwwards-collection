"use client";
import "swiper/css";
import { useRef } from "react";
import Image from "next/image";
import { tutorsItems } from "@/constants";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatedText, Button, Sticky } from "@/components";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function TheTutors({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const swiperRef = useRef<SwiperType | null>(null);
	const rotate = useTransform(scrollYProgress, [0, 0.8], [8, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);
	return (
		<motion.div
			style={{ scale, rotate }}
			className="w-full min-h-screen bg-[#010101] sticky top-0 left-0">
			<div className="w-full flex items-center justify-between gap-2 pt-60 px-10">
				<AnimatedText
					text="The tutors"
					className="text-[200px] uppercase leading-none font-humaneMedium text-white"
				/>
				<h1 className="text-[22px] font-helveticaNeue leading-[0.9] text-white uppercase text-right">
					Watch{" "}
					<span className="text-[32px] font-bodoniseventytwo leading-[0.9] lowercase">
						four{" "}
					</span>
					brilliant <br />
					minds unite to craft{" "}
					<span className="text-[32px] font-bodoniseventytwo leading-[0.9] lowercase">
						{" "}
						the <br />
					</span>
					ultimate{" "}
					<span className="text-[32px] font-bodoniseventytwo leading-[0.9] lowercase">
						experience.
					</span>
				</h1>
			</div>
			<div className="slider-container w-full flex flex-col gap-10">
				<div className="w-full">
					<div className="overflow-hidden">
						<Swiper
							modules={[Navigation]}
							breakpoints={{
								0: {
									slidesPerView: 1,
								},
								400: {
									slidesPerView: 1,
								},
								768: {
									slidesPerView: 1,
								},
								1024: {
									slidesPerView: 2,
								},
								1490: {
									slidesPerView: 3,
								},
							}}
							onSwiper={(swiper) => (swiperRef.current = swiper)}>
							{tutorsItems.map((item) => (
								<SwiperSlide key={item.id}>
									<div
										className="swiper-slide h-[1000px] cursor-pointer relative overflow-hidden"
										style={{
											background: item.color,
										}}>
										<Image
											src={item.img}
											alt={item.title}
											fill
											className="w-full h-full object-cover"
										/>
										<div className="absolute w-full h-full p-8">
											<div className="w-full h-full flex flex-col justify-end items-end">
												<div className="flex w-full items-center justify-between gap-5 flex-col">
													<div className="flex flex-col gap-2">
														<h2 className="text-[120px] uppercase tracking-wide leading-[0.8] text-white font-humaneMedium">
															{item.title}
														</h2>
													</div>
													<div className="flex items-end justify-end">
														<p
															className={`text-[16px] leading-tight font-helveticaNeue tracking-tight py-2 px-4 rounded-full uppercase ${
																item.id === 1 ? "text-white" : "text-[#1c1c1c]"
															}`}
															style={{
																background: item.color,
															}}>
															{item.btn}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
							<Sticky />
						</Swiper>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-center px-10 py-40 gap-20">
				<div className="flex items-end justify-end">
					<div>
						<h2 className="text-[120px] uppercase tracking-wide leading-[0.8] text-[#5546FF] font-humaneMedium">
							WEEKLY
						</h2>
					</div>
					<div>
						<p className="text-[16px] leading-tight font-helveticaNeue tracking-tight py-2 px-4 rounded-full uppercase text-white/50">
							Tue & <br /> THUR
						</p>
					</div>
				</div>
				<div className="flex items-end justify-end">
					<div>
						<h2 className="text-[120px] uppercase tracking-wide leading-[0.8] text-[#FF7BCA] font-humaneMedium">
							2HOURS
						</h2>
					</div>
					<div>
						<p className="text-[16px] leading-tight font-helveticaNeue tracking-tight py-2 px-4 rounded-full uppercase text-white/50">
							Per <br /> Week
						</p>
					</div>
				</div>
				<div className="flex items-end justify-end">
					<div>
						<h2 className="text-[120px] uppercase tracking-wide leading-[0.8] text-[#BFFF0A] font-humaneMedium">
							8HOURS
						</h2>
					</div>
					<div>
						<p className="text-[16px] leading-tight font-helveticaNeue tracking-tight py-2 px-4 rounded-full uppercase text-white/50">
							Per <br /> Tutor
						</p>
					</div>
				</div>
				<div className="flex items-end justify-end">
					<div>
						<h2 className="text-[120px] uppercase tracking-wide leading-[0.8] text-white font-humaneMedium">
							32HRS
						</h2>
					</div>
					<div>
						<p className="text-[16px] leading-tight font-helveticaNeue tracking-tight py-2 px-4 rounded-full uppercase text-white/50">
							In <br /> Total
						</p>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-center py-10">
				<Button title="enroll now" />
			</div>
		</motion.div>
	);
}
