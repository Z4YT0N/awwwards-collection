<script>
	import Hero from "$lib/components/Hero.svelte";
	import Manifesto from "$lib/components/Manifesto.svelte";
	import Brands from "$lib/components/Brands.svelte";
	import Showcase from "$lib/components/Showcase.svelte";
	import WorksList from "$lib/components/WorksList.svelte";
	import Testimonials from "$lib/components/Testimonials.svelte";
	import Stats from "$lib/components/Stats.svelte";
	import Faq from "$lib/components/Faq.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Seo from "$lib/components/Seo.svelte";
</script>

<Seo />

<div class="bg-[#050505] text-white">
	<Hero />
	<Manifesto />
	<Brands />
	<Showcase />
	<WorksList />
	<Testimonials />
	<Stats />
	<Faq />
	<Footer />
</div>
