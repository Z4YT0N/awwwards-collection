"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { Dispatch, SetStateAction, useState } from "react";
import { iconVariants, itemVariants, wrapperVariants } from "@motion";

export default function StaggeredDropDown() {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative z-20 flex items-center justify-center">
			<motion.div
				animate={open ? "open" : "closed"}
				className="relative">
				<button
					onClick={() => setOpen((pv) => !pv)}
					className="flex items-center gap-1">
					<span className="text-[16px] font-bold uppercase text-white tracking-widest">
						EN
					</span>
					<motion.span variants={iconVariants}>
						<FiChevronDown
							className="text-white font-bold"
							size={25}
						/>
					</motion.span>
				</button>

				<motion.ul
					initial={wrapperVariants.closed}
					variants={wrapperVariants}
					style={{ originY: "top", translateX: "-50%" }}
					className="flex flex-col p-1 rounded-lg bg-[#8866dd8a] shadow-xl absolute top-[120%] left-[40%] w-fit overflow-hidden">
					<Option
						setOpen={setOpen}
						text="IT"
						href="/"
					/>
					<Option
						setOpen={setOpen}
						text="EN"
						href="/"
					/>
				</motion.ul>
			</motion.div>
		</div>
	);
}

const Option = ({
	text,
	setOpen,
	href,
}: {
	text: string;
	href: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<motion.li
			variants={itemVariants}
			onClick={() => setOpen(false)}
			className="flex items-center gap-2 w-full p-2 text-[16px] font-bold uppercase text-white tracking-widest whitespace-nowrap rounded-md hover:bg-indigo-100 hover:text-indigo-500 transition-colors cursor-pointer">
			<Link href={href}>
				<span>{text}</span>
			</Link>
		</motion.li>
	);
};
