<script>
	import Plus from "@lucide/svelte/icons/plus";
	import Minus from "@lucide/svelte/icons/minus";
	import { slide } from "svelte/transition";

	const faqs = [
		{
			q: "What is your typical project timeline?",
			a: "Most of our immersive web experiences take between 6 to 8 weeks from concept to deployment. Enterprise platforms and highly complex WebGL applications may require up to 4 months.",
		},
		{
			q: "Do you only build with Svelte and GSAP?",
			a: "While Svelte and GSAP are our preferred tools for extreme performance and fluid motion, our engineering team is framework-agnostic. We work extensively with Next.js, Vue, and vanilla WebGL depending on architecture requirements.",
		},
		{
			q: "How does the pricing structure work?",
			a: "We operate on milestone-based pricing for fixed-scope projects. For ongoing product development, we offer dedicated team retainers. Every project requires a custom quotation based on scope complexity.",
		},
		{
			q: "Can you integrate with Web3 and custom backends?",
			a: "Absolutely. We specialize in building headless interfaces that seamlessly connect via modern SDKs to blockchain networks, AI models, and any custom API infrastructure.",
		},
	];

	let activeIndex = $state(null);

	function toggle(index) {
		if (activeIndex === index) {
			activeIndex = null;
		} else {
			activeIndex = index;
		}
	}
</script>

<section
	id="faq"
	class="w-full bg-[#050505] text-white py-32 border-t border-white/10 relative overflow-hidden"
>
	<div
		class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B82F6] opacity-5 blur-[150px] rounded-full pointer-events-none"
	></div>

	<div
		class="px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 relative z-10"
	>
		<!-- Left Side: Title -->
		<div class="w-full md:w-1/3">
			<span
				class="text-sm font-mono text-white/50 uppercase tracking-widest mb-6 block"
				>FAQ</span
			>
			<h2 class="text-4xl md:text-5xl font-serif leading-tight">
				Frequently<br />
				<span class="italic text-white/40">Asked</span>
			</h2>
			<p class="text-white/50 mt-6 font-sans font-light">
				Answers to the most common questions regarding our process,
				technology stack, and partnership models.
			</p>

			<a
				href="#contact"
				class="inline-flex items-center gap-2 mt-8 text-sm font-mono text-white/80 uppercase hover:text-white transition-colors group"
			>
				Still have questions?
				<span
					class="w-8 h-[1px] bg-white transform origin-left transition-transform duration-300 group-hover:scale-x-150"
				></span>
			</a>
		</div>

		<!-- Right Side: Accordion -->
		<div class="w-full md:w-2/3 flex flex-col">
			{#each faqs as item, index}
				<button
					class="w-full border-b border-white/10 py-8 text-left flex flex-col cursor-pointer group"
					onclick={() => toggle(index)}
					aria-expanded={activeIndex === index}
				>
					<div class="w-full flex justify-between items-center">
						<span
							class="text-2xl md:text-3xl font-serif text-white/80 group-hover:text-white transition-colors duration-300"
						>
							{item.q}
						</span>

						<div
							class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transform transition-transform duration-500 group-hover:bg-white/10"
						>
							{#if activeIndex === index}
								<Minus class="w-5 h-5 text-white" />
							{:else}
								<Plus class="w-5 h-5 text-white" />
							{/if}
						</div>
					</div>

					{#if activeIndex === index}
						<div
							transition:slide={{
								duration: 400,
								easing: (t) => --t * t * t + 1,
							}}
							class="overflow-hidden"
						>
							<p
								class="pt-6 text-lg text-white/50 font-sans font-light leading-relaxed max-w-2xl"
							>
								{item.a}
							</p>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>
