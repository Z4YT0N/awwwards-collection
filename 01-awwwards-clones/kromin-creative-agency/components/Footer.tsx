"use client";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@constants";
import { motion } from "framer-motion";
import { footerVarient } from "@motion";
import { footerImage, logo } from "@public";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";

export default function Footer() {
	return (
		<motion.section
			variants={footerVarient}
			initial="hidden"
			whileInView="vissible"
			className="w-full overflow-hidden mt-20 relative">
			<div className="w-[70%] sm:w-full xm:w-full padding-x mx-auto flex justify-between gap-[50px] sm:flex-col xm:flex-col">
				<div className="flex justify-between flex-col gap-y-[20px]">
					<div className="flex flex-col gap-4">
						<Link href={"/"}>
							<Image
								src={logo}
								alt="logo"
								width={200}
								className="w-[200px] object-cover"
							/>
						</Link>
						<p className="text-[16px] text-white tracking-wider font-medium">
							Let&apos;s join forces to create exciting new opportunities
							together.
							<br />
							Share your vision with us, and let’s explore how we can turn your{" "}
							<br />
							ideas into reality. Your insights and creativity are the <br />{" "}
							key to our mutual success.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<CiLocationOn
							size={25}
							className="text-[#A340F4]"
						/>
						<p className="text-white tracking-wider text-[16px] leading-normal font-bold">
							FROSINONE | ROME | MILANO
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="text-white text-[24px] font-extrabold uppercase leading-normal">
						menu
					</h1>
					{navLinks.map((item) => (
						<div
							className="flex flex-col gap-y-[10px]"
							key={item.id}>
							<Link href={item.title}>
								<p className="text-white text-[16px] font-medium leading-normal">
									{item.title}
								</p>
							</Link>
						</div>
					))}
				</div>
				<div className="flex flex-col">
					<h1 className="text-white text-[24px] font-extrabold uppercase leading-normal">
						Contact Us
					</h1>
					<div className="flex flex-col gap-y-6 mt-2">
						<div className="flex flex-col gap-y-2">
							<h1 className="text-white text-[16px] tracking-medfont-medium font-extrabold uppercase leading-normal">
								Tell:
							</h1>
							<div className="flex gap-2 items-center">
								<CiPhone
									size={25}
									className="text-[#A340F4]"
								/>
								<p className="text-white tracking-wider text-[16px] leading-normal font-medium">
									+39 0775 15 24 926
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							<h1 className="text-white text-[18px] tracking-wider font-extrabold uppercase leading-normal">
								Email:
							</h1>
							<div className="flex gap-2 items-center">
								<MdOutlineEmail
									size={25}
									className="text-[#A340F4]"
								/>
								<p className="text-white tracking-wider text-[16px] leading-normal font-medium">
									info@kromin.it
								</p>
							</div>
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
				</div>
			</div>
			<div className="absolute right-[5%] bottom-[20%] sm:hidden xm:hidden">
				<Image
					src={footerImage}
					alt="footerImage"
				/>
			</div>
			<div className="w-full flex items-center justify-center mt-20 padding-x border-t border-[#A340F4]">
				<p className="text-[16px] text-white tracking-wider font-medium py-3 text-center">
					Cookie Policy - Privacy Policy © 2024 Humans S.R.L. | P. IVA
					02874880608
				</p>
			</div>
		</motion.section>
	);
}
