<script>
	import { onMount, onDestroy } from "svelte";
	import gsap from "gsap";

	const feedbacks = [
		{
			name: "Sarah Jenkins",
			role: "CMO, Lumina",
			text: "Aura Studio didn't just build a website; they architected a digital reality. Their motion mastery and craftsmanship are unmatched.",
		},
		{
			name: "Marcus Thorne",
			role: "Founder, Nexal",
			text: "Working with them felt like collaborating with a future version of ourselves. Uncompromising quality and relentless execution.",
		},
		{
			name: "Elena Rostova",
			role: "Product VP, Ozone",
			text: "They completely redefined our brand identity. Client conversion and engagement skyrocketed immediately after the overhaul.",
		},
	];

	let currentIndex = $state(0);
	let quoteRef = $state();
	let nameRef = $state();
	let isAnimating = false;
	let timer;

	function nextQuote() {
		if (isAnimating) return;
		goToQuote((currentIndex + 1) % feedbacks.length);
	}

	function goToQuote(index) {
		if (index === currentIndex || isAnimating) return;

		isAnimating = true;
		if (timer) clearInterval(timer);

		gsap.to([quoteRef, nameRef], {
			autoAlpha: 0,
			y: 10,
			duration: 0.5,
			ease: "power2.inOut",
			onComplete: () => {
				currentIndex = index;
				gsap.fromTo(
					[quoteRef, nameRef],
					{ autoAlpha: 0, y: -10 },
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.8,
						stagger: 0.15,
						ease: "power2.out",
						onComplete: () => {
							isAnimating = false;
							timer = setInterval(nextQuote, 6000);
						},
					},
				);
			},
		});
	}

	onMount(() => {
		timer = setInterval(nextQuote, 6000);
		return () => {
			if (timer) clearInterval(timer);
		};
	});
</script>

<section
	id="testimonials"
	class="w-full bg-[#050505] text-white py-32 md:py-48 flex items-center justify-center relative overflow-hidden border-t border-white/5"
>
	<!-- Extremely soft background glow -->
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-[#3B82F6]/5 blur-[200px] rounded-full pointer-events-none"
	></div>

	<div
		class="max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center"
	>
		<span
			class="text-xs font-mono text-white/30 uppercase tracking-widest mb-16"
			>Client Voices</span
		>

		<h3
			bind:this={quoteRef}
			class="text-3xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-[1.3] md:leading-[1.2] tracking-tight mb-16 flex items-center justify-center will-change-transform h-[200px] md:h-auto"
		>
			"{feedbacks[currentIndex].text}"
		</h3>

		<div
			bind:this={nameRef}
			class="flex flex-col items-center gap-3 will-change-transform"
		>
			<h4
				class="text-white font-medium text-sm md:text-base uppercase tracking-widest"
			>
				{feedbacks[currentIndex].name}
			</h4>
			<span class="text-sm font-sans text-white/40"
				>{feedbacks[currentIndex].role}</span
			>
		</div>

		<!-- Pagination Dots -->
		<div class="flex gap-4 mt-16">
			{#each feedbacks as _, i}
				<button
					class="w-2 h-2 rounded-full transition-all duration-500 cursor-pointer {currentIndex ===
					i
						? 'bg-white scale-125'
						: 'bg-white/20 hover:bg-white/50'}"
					aria-label="Go to slide {i + 1}"
					onclick={() => goToQuote(i)}
				></button>
			{/each}
		</div>
	</div>
</section>
