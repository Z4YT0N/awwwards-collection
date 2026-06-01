<script>
	const works = [
		{
			id: "01",
			name: "Nike Forward",
			category: "E-Commerce Experience",
			year: "2025",
		},
		{
			id: "02",
			name: "Ozone WebGL",
			category: "Interactive Architecture",
			year: "2024",
		},
		{
			id: "03",
			name: "Lumina App",
			category: "Spatial UI Design",
			year: "2024",
		},
		{
			id: "04",
			name: "Aura Engine",
			category: "Open Source Platform",
			year: "2023",
		},
	];
</script>

<section
	id="work"
	class="w-full bg-[#050505] text-white py-32 border-t border-white/10 min-h-screen"
>
	<div
		class="px-6 md:px-24 mb-24 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6"
	>
		<h2 class="text-5xl md:text-8xl font-serif tracking-tight">
			Selected<br /><span class="italic text-white/40">Works.</span>
		</h2>
		<p
			class="text-white/50 font-sans max-w-sm text-lg leading-relaxed pb-2"
		>
			A curation of highly immersive projects pushing digital boundaries.
			Hover to reveal more.
		</p>
	</div>

	<div class="px-6 md:px-24 max-w-7xl mx-auto flex flex-col">
		<!-- Table Header -->
		<div
			class="flex border-b border-white/20 pb-4 mb-4 text-xs font-mono text-white/40 uppercase tracking-widest px-4"
		>
			<div class="w-16">ID</div>
			<div class="flex-1">Project</div>
			<div class="hidden md:block w-1/3">Role</div>
			<div class="w-16 text-right">Year</div>
		</div>

		<!-- Table Rows -->
		{#each works as work}
			<a
				href="/"
				class="group flex items-center border-b border-white/10 py-8 md:py-12 px-4 hover:bg-white/5 transition-colors duration-500 cursor-pointer relative overflow-hidden"
			>
				<div
					class="absolute inset-0 bg-linear-to-r from-[#3B82F6]/0 via-[#3B82F6]/5 to-[#3B82F6]/0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none"
				></div>

				<div
					class="w-16 text-sm font-mono text-white/30 group-hover:text-white/80 transition-colors z-10"
				>
					{work.id}
				</div>
				<div class="flex-1 z-10">
					<h3
						class="text-4xl md:text-6xl font-serif text-white/70 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 transform-gpu"
					>
						{work.name}
					</h3>
				</div>
				<div
					class="hidden md:block w-1/3 text-lg font-sans font-light text-white/40 group-hover:text-white/80 transition-colors z-10"
				>
					{work.category}
				</div>
				<div
					class="w-16 text-right text-sm font-mono text-white/40 group-hover:text-white/90 transition-colors z-10"
				>
					{work.year}
				</div>
			</a>
		{/each}

		<div class="mt-16 flex justify-center w-full">
			<button
				class="px-8 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white hover:text-black transition-colors duration-500 font-sans cursor-pointer text-sm font-medium"
			>
				View All Archives
			</button>
		</div>
	</div>
</section>
