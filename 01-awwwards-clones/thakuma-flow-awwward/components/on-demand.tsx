import { AnimatedText } from "@/components";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function OnDemand({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
	const rotate = useTransform(scrollYProgress, [0, 0.3], [-5, 0]);
	return (
		<>
			<div className="w-full h-screen flex items-center justify-center">
				<div className="w-full flex flex-col items-center justify-center gap-10 overflow-hidden">
					<AnimatedText
						className="leading-none text-white text-[200px]"
						text="flow party"
					/>
					<div className="flex flex-col gap-2 items-center justify-center overflow-hidden text-center">
						<AnimatedText
							className="text-white leading-[0.85] text-[120px]"
							text="Embark on an exhilarating 4-month journey with expert"
						/>
						<AnimatedText
							className="text-white leading-[0.85] text-[120px]"
							text="tutors, each taking charge of their key discipline and expertise."
						/>
						<AnimatedText
							className="text-white leading-[0.85] text-[120px]"
							text="Through a real-life client example, you’ll discover their secrets"
						/>
						<AnimatedText
							className="text-white leading-[0.85] text-[120px]"
							text="and skills to successfully navigating a web project."
						/>
					</div>
				</div>
			</div>
			<motion.div
				style={{ scale, rotate }}
				className="w-full h-screen sticky top-0 left-0 overflow-hidden">
				<div className="w-full h-full">
					<video
						src="/TheFlowParty.mp4"
						loop
						autoPlay
						className="w-full h-full object-cover"
						muted
					/>
				</div>
				<div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
					<h1 className="text-[45vw] uppercase leading-tight whitespace-nowrap tracking-[-5] font-humaneMedium text-white">
						ON DEMAND
					</h1>
				</div>
				<div className="absolute bottom-5 text-center left-1/2 -translate-x-1/2">
					<h1 className="text-[22px] font-helveticaNeue leading-tight text-white uppercase">
						Unleash
						<span className="text-[34px] font-bodoniseventytwo leading-tight lowercase">
							{" "}
							your{" "}
						</span>
						design and <br /> development potential
					</h1>
				</div>
			</motion.div>
		</>
	);
}
