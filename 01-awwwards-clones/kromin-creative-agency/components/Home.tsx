"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { CTA, Hero, Portfolio, Services } from "@components";

export default function Home() {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);
	return (
		<>
			<Hero />
			<Services />
			<Portfolio />
			<CTA />
		</>
	);
}
