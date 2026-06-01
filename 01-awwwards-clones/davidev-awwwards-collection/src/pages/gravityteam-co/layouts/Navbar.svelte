<script lang="ts">
	import { onMount } from 'svelte';
	let dropdown: HTMLElement;

	const fadeInAnimation = [
		{
			transform: 'translateY(15px)',
			opacity: 0,
		},
		{
			transform: 'translateY(0)',
			opacity: 1,
		},
	];
	const fadeInOptions = {
		duration: 1500,
	};

	function handleDropDown() {
		if (dropdown === null) return;
		dropdown.classList.toggle('active-dropdow-navbar');
		dropdown.animate(fadeInAnimation, fadeInOptions);
	}
</script>

<nav class="navbar">
	<img src="/gravity-logo.png" alt="gravity team" />
	<ul>
		<li>
			<span> about us </span>
		</li>
		<li>
			<span class="services" on:click={() => handleDropDown()}>
				our Services ^
			</span>
			<div class="dropdow" bind:this={dropdown}>
				<span class="dropdow-item"> Web Development </span>
				<span class="dropdow-item"> Web Design </span>
				<span class="dropdow-item"> Mobile App Development </span>
			</div>
		</li>
		<li>
			<span> Work With Us </span>
		</li>
		<li>
			<span> blog </span>
		</li>
	</ul>
	<div>
		<span class="get-in-touch"> get in touch </span>
	</div>
</nav>

<style>
	.navbar {
		--p: var(--gravity-blue); /* #665dcd */
		--s: var(--gravity-blue-light);
		--t: var(--gravity-green); /* #00d1b2 */
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5rem;
		color: var(--gravity-text);
	}
	.dropdow {
		display: none;
	}
	.navbar span {
		text-transform: uppercase;
		font-size: var(--text-lg);
	}
	.navbar ul {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	.get-in-touch {
		position: relative;
	}
	.get-in-touch::before {
		content: '';
		position: absolute;
		bottom: 2px;
		left: -1.5rem;
		height: 1rem;
		border-radius: 100%;
		width: 1rem;
		background-image: linear-gradient(
			45deg,
			var(--p) 10%,
			var(--s) 60%,
			var(--t) 100%
		);
	}
	.services {
		color: var(--p);
		position: relative;
	}
	.dropdow-item:hover {
		transition: all 0.5 ease-in;
	}

	.dropdow-item:hover {
		background: var(--gravity-blue);
	}

	:global(.active-dropdow-navbar) {
		display: flex !important;
		position: absolute;
		color: var(--gravity-bg);
		background-color: var(--gravity-text);
		border-radius: 1rem;
		font-size: 0.8rem;
		padding: 0.2rem;
		flex-direction: column;
		z-index: 999999;
	}
	:global(.active-dropdow-navbar span) {
		font-size: 1rem !important;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
	}
</style>
