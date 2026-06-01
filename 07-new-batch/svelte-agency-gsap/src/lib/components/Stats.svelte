<script>
	import { onMount } from "svelte";
	import gsap from "gsap";
	import ScrollTrigger from "gsap/ScrollTrigger";

	let statsRef = $state();

	const stats = [
		{ label: "Value Created", limit: 200, suffix: "M+", prefix: "$" },
		{ label: "Global Awards", limit: 45, suffix: "+", prefix: "" },
		{ label: "Sprint Cycles", limit: 60, suffix: " Days", prefix: "<" },
		{ label: "Partner Brands", limit: 120, suffix: "+", prefix: "" },
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const counts = statsRef.querySelectorAll(".counterData");

		counts.forEach((counter, i) => {
			let target = stats[i].limit;
			let obj = { val: 0 };

			gsap.to(obj, {
				val: target,
				duration: 2.5,
				ease: "power2.out",
				scrollTrigger: {
					trigger: statsRef,
					start: "top 80%",
				},
				onUpdate: () => {
					counter.innerText = Math.ceil(obj.val);
				},
			});
		});
	});
</script>

<section
	bind:this={statsRef}
	class="w-full bg-[#050505] text-white py-24 md:py-32 border-t border-white/5 border-b border-b-white/5 relative z-10"
>
	<div
		class="max-w-7xl mx-auto px-6 md:px-24 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-left md:text-center"
	>
		{#each stats as stat, i}
			<div class="flex flex-col gap-2 md:items-center">
				<h4
					class="text-4xl md:text-6xl font-serif tracking-tight text-white mb-2 flex items-baseline md:justify-center"
				>
					<span class="text-white/30 text-3xl md:text-5xl mr-1"
						>{stat.prefix}</span
					>
					<span class="counterData text-[#3B82F6]">0</span>
					<span class="text-white/60">{stat.suffix}</span>
				</h4>
				<p
					class="text-xs font-mono text-white/40 uppercase tracking-widest"
				>
					{stat.label}
				</p>
			</div>
		{/each}
	</div>
</section>
