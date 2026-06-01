"use client";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@constants";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { logo } from "@public";
import { SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";
import { IoMenu } from "react-icons/io5";

export default function MobileNav() {
	const [toggle, setToggle] = useState(false);
	return (
		<div className="w-full items-center justify-between sm:flex xm:flex hidden">
			<div className="w-full flex items-center justify-between h-[10vh] padding-x">
				<div>
					<Link href={"/"}>
						<Image
							src={logo}
							alt="logo"
							width={120}
							className="w-[120px] object-cover"
						/>
					</Link>
				</div>
				<IoMenu
					onClick={() => setToggle(!toggle)}
					className="text-3xl cursor-pointer text-white"
					size={30}
				/>
			</div>
			<AnimatePresence mode="wait">
				{toggle && (
					<motion.div
						initial={{ y: "-100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-100%" }}
						transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
						className="fixed top-0 bottom-0 right-0 z-50 padding-x pb-10 w-full h-screen flex justify-end items-end flex-col shadow-md bg-[#1d0f41]">
						<div className="w-full flex items-center justify-between h-[10vh]">
							<Link href={"/"}>
								<Image
									src={logo}
									alt="logo"
									width={150}
									className="w-[150px] object-cover"
								/>
							</Link>
							<IoMdClose
								onClick={() => setToggle(!toggle)}
								className="text-3xl cursor-pointer text-white"
								size={30}
							/>
						</div>
						<ul className="h-full pt-[80px] pb-[20px] w-full flex justify-center text-left flex-col gap-4">
							<h3 className="text-[25px] uppercase font-bold text-white">
								Menu
							</h3>
							{navLinks.map((item) => (
								<Link
									href={item.href}
									key={item.title}
									onClick={(toggle) => setToggle(!toggle)}
									className="text-[20px] uppercase font-bold text-white">
									{item.title}
								</Link>
							))}
							<div className="flex w-full h-full justify-end flex-col gap-3 mt-8">
								<h3 className="text-[25px] uppercase font-bold text-white">
									Socials
								</h3>
								<div className="flex items-center gap-3">
									<h3 className="text-[18px] text-white font-semibold">
										Email:
									</h3>
									<Link
										href="mailto:Rizwan@dis.com.pk"
										className="text-[17px] text-white font-medium">
										info@kromin.it
									</Link>
								</div>
								<div className="flex items-center gap-3">
									<h3 className="text-[18px] text-white font-semibold">
										Contact:
									</h3>
									<Link
										href="tel:9221 36729110"
										className="text-[17px] text-white font-medium">
										+39 0775 15 24 926
									</Link>
								</div>
								<div className="flex flex-col gap-y-2">
									<h1 className="text-white text-[18px] tracking-wider font-extrabold uppercase leading-normal">
										FOLLOW US ON:
									</h1>
									<div className="flex gap-2 items-center">
										<SlSocialLinkedin
											size={25}
											className="text-[#A340F4]"
										/>
										<FaInstagram
											size={25}
											className="text-[#A340F4]"
										/>
										<SlSocialFacebook
											size={25}
											className="text-[#A340F4]"
										/>
									</div>
								</div>
							</div>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
