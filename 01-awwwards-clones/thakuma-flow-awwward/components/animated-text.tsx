"use client";
import { motion } from "framer-motion";

export default function AnimatedText({
	text,
	className,
}: {
	text: string;
	className: string;
}) {
	const displayText = typeof text === "string" ? text : "";
	return (
		<span
			className={`flex uppercase font-humaneMedium overflow-hidden ${className}`}>
			{displayText.split(" ").map((word, index) => (
				<motion.p
					initial={{ y: "100%" }}
					whileInView={{ y: 0 }}
					transition={{
						delay: index * 0.08,
						duration: 1,
						ease: [0.4, 0, 0.2, 1],
					}}
					viewport={{ once: true }}
					key={index}
					className="inline-block whitespace-nowrap mr-4">
					{word}
				</motion.p>
			))}
		</span>
	);
}
