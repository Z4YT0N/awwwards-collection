"use client";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import {
	Event,
	Footer,
	Hero,
	OnDemand,
	PartyTolls,
	TheTutors,
	WhatWeDo,
	WhoWeAre,
} from "@/components";

export default function App() {
	const container = useRef<HTMLDivElement | null>(null);
	const container1 = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const lenis = new Lenis();
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	const { scrollYProgress: scrollYProgress1 } = useScroll({
		target: container1,
		offset: ["start start", "end end"],
	});
	return (
		<>
			<div
				ref={container}
				className="relative">
				<Hero scrollYProgress={scrollYProgress} />
				<Event scrollYProgress={scrollYProgress} />
			</div>
			<WhoWeAre />
			<div
				ref={container1}
				className="relative">
				<OnDemand scrollYProgress={scrollYProgress1} />
				<TheTutors scrollYProgress={scrollYProgress1} />
			</div>
			<WhatWeDo />
			<PartyTolls />
			<Footer />
		</>
	);
}
