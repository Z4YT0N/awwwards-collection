<script>
	import { onMount } from "svelte";
	import gsap from "gsap";
	import ScrollTrigger from "gsap/ScrollTrigger";

	const services = [
		{
			title: "Digital Strategy",
			desc: "Aligning creative vision with business objectives to architect immersive digital platforms that disrupt the market.",
			icon: "M13 10V3L4 14h7v8l9-11h-7z",
		},
		{
			title: "Space & Web3",
			desc: "Bridging the gap between hyper-complex blockchain data and stunningly simple user adoption through spatial design.",
			icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
		},
		{
			title: "Motion Identity",
			desc: "Breathing life into static brands using hardware-accelerated fluid motion, WebGL, and advanced typography.",
			icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
		},
	];

	let gridRef = $state();

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const cards = gridRef.querySelectorAll(".service-grid-card");

		gsap.fromTo(
			cards,
			{ y: 60, autoAlpha: 0 },
			{
				y: 0,
				autoAlpha: 1,
				duration: 1.2,
				stagger: 0.15,
				ease: "expo.out",
				scrollTrigger: {
					trigger: gridRef,
					start: "top 80%",
				},
			},
		);
	});
</script>

<section
	id="services"
	class="w-full bg-[#050505] text-white py-32 md:py-48 border-t border-white/5 relative z-10 overflow-hidden"
>
	<!-- Huge background glow for volume -->
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6] opacity-[0.02] blur-[200px] rounded-full pointer-events-none"
	></div>

	<div
		class="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center"
	>
		<span
			class="text-xs font-mono text-white/30 uppercase tracking-widest mb-16 text-center tracking-[0.3em]"
			>Our Core Disciplines</span
		>

		<div
			bind:this={gridRef}
			class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full"
		>
			{#each services as service, i}
				<div
					class="service-grid-card group relative w-full h-[50vh] md:h-[65vh] lg:h-[75vh] rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] hover:bg-[#0A0A0A] transition-colors duration-700 cursor-default"
				>
					<!-- Sleek gradient base -->
					<div
						class="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10"
					></div>

					<!-- Hover Glow internal to card -->
					<div
						class="absolute -top-32 -left-32 w-96 h-96 bg-[#3B82F6] opacity-[0.03] group-hover:opacity-[0.12] blur-[100px] rounded-full transition-opacity duration-700 pointer-events-none z-0"
					></div>

					<!-- Huge background number mark -->
					<div
						class="absolute top-8 left-8 z-20 font-serif text-6xl text-white/5 group-hover:text-white/10 transition-colors duration-700"
					>
						0{i + 1}
					</div>

					<!-- Icon -->
					<div
						class="absolute top-8 right-8 z-20 text-white/20 group-hover:text-[#3B82F6] transition-colors duration-700 transform group-hover:scale-110"
					>
						<svg
							class="w-8 h-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d={service.icon}
							/>
						</svg>
					</div>

					<!-- Bottom Content Area -->
					<div
						class="absolute bottom-10 left-8 right-8 z-20 flex flex-col gap-6 transform-gpu transition-all duration-700 group-hover:-translate-y-4"
					>
						<h3
							class="text-3xl lg:text-4xl xl:text-5xl font-serif text-white leading-tight tracking-tight"
						>
							{service.title}
						</h3>

						<!-- Expanding visual separator -->
						<div
							class="w-full h-px bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out"
						></div>

						<!-- Details revealed on hover (always visible on mobile but animated on desktop) -->
						<p
							class="text-sm md:text-base text-white/50 font-sans leading-relaxed md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
						>
							{service.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
