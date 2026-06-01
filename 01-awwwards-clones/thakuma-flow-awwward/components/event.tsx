import { Slider } from "@/components";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function Event({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	return (
		<motion.div
			style={{ scale, rotate }}
			className="w-full min-h-screen bg-eventBgColor sticky top-0 left-0">
			<div className="w-full flex items-center justify-between gap-2 pt-60 px-10">
				<span className="flex text-[200px] uppercase leading-none font-humaneMedium text-white">
					{"events".split("").map((item: string, i: number) => (
						<motion.p
							initial={{ y: "100%" }}
							whileInView={{ y: 0 }}
							transition={{
								delay: i * 0.05,
								duration: 0.5,
								ease: [0.4, 0, 0.2, 1],
							}}
							viewport={{ once: true }}
							key={i}>
							{item}
						</motion.p>
					))}
				</span>
				<h1 className="text-[22px] font-helveticaNeue leading-[0.9] text-white uppercase text-right">
					Our virtual events feature <br /> the{" "}
					<span className="text-[32px] font-bodoniseventytwo leading-[0.9] lowercase">
						top talent{" "}
					</span>
					in the design <br /> & development{" "}
					<span className="text-[32px] font-bodoniseventytwo leading-[0.9] lowercase">
						space.
					</span>
				</h1>
			</div>
			<Slider />
		</motion.div>
	);
}
