"use client";
import "swiper/css";
import Image from "next/image";
import { useRef } from "react";
import { Sticky } from "@/components";
import { eventItems } from "@/constants";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Slider() {
	const swiperRef = useRef<SwiperType | null>(null);
	return (
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
						{eventItems.map((item) => (
							<SwiperSlide key={item.id}>
								<div className="swiper-slide h-[800px] cursor-pointer relative overflow-hidden">
									{item.id === 1 ? (
										<video
											src={"/event4.mp4"}
											autoPlay
											loop
											muted
										/>
									) : (
										<Image
											src={item.src}
											alt={item.title1}
											width={1000}
											height={1000}
											className="w-full h-full object-cover"
										/>
									)}
									<div className="absolute top-0 w-full h-full p-8">
										<div className="w-full h-full flex flex-col justify-between">
											<div className="flex w-full items-start justify-between gap-2">
												<div className="flex flex-col gap-2">
													<h2
														className="text-[20px] uppercase leading-[0.9]"
														style={{ color: item.color }}>
														{item.heading1}
														<br />
														{item.heading2}
													</h2>
													<h2
														className="text-[20px] uppercase leading-[0.9]"
														style={{ color: item.color }}>
														{item.date}
													</h2>
												</div>
												<div className="flex items-end justify-end">
													<p
														className="text-[16px] leading-tight font-helveticaNeue tracking-tight border-[1.5px] py-1 px-3 rounded-full uppercase"
														style={{
															color: item.color,
															borderColor: item.color,
														}}>
														{item.btn}
													</p>
												</div>
											</div>
											<div className="flex w-full items-start justify-between gap-2">
												<div className="flex flex-col gap-2">
													<h2 className="text-[90px] uppercase tracking-wide leading-[0.8] text-white font-humaneMedium">
														{item.title1}
														<br />
														{item.title2}
													</h2>
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
	);
}
