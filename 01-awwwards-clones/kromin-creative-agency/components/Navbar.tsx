"use client";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@public";
import { useState } from "react";
import { navLinks } from "@constants";
import { navVariants } from "@motion";
import { LinkHover } from "@animation";
import { MobileNavbar, StaggeredDropDown } from "@components";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

export default function Navbar() {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous) {
			if (latest > previous) {
				setHidden(true);
			} else {
				setHidden(false);
			}
		}
	});

	return (
		<>
			<motion.nav
				className="w-[80%] mx-auto flex items-center justify-between h-[10vh] z-10 sm:hidden xm:hidden padding-x"
				variants={navVariants}
				animate={hidden ? "hidden" : "vissible"}>
				<Link href={"/"}>
					<Image
						src={logo}
						alt="logo"
						width={200}
						className="w-[200px] object-cover"
					/>
				</Link>
				<div className="flex gap-[15px] sm:hidden xm:hidden">
					{navLinks.map((item) => (
						<div key={item.id}>
							<Link
								href={item.href}
								className="text-[16px] font-bold uppercase text-white tracking-widest">
								<LinkHover>{item.title}</LinkHover>
							</Link>
						</div>
					))}
					<div className="relative inline-block group ml-10">
						<StaggeredDropDown />
					</div>
				</div>
			</motion.nav>
			<MobileNavbar />
		</>
	);
}
