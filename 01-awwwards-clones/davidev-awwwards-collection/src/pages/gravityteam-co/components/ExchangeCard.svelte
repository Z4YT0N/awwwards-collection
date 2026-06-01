<script lang="ts">
	export let name: string;
	export let img: string;
</script>

<article class="card f-c-c-c">
	<img src={img} alt={name} />
	<h3>
		{name}
	</h3>
</article>

<style>
	.card {
		background-image: linear-gradient(
			180deg,
			rgba(65, 85, 114, 0.15) 0%,
			rgba(27, 27, 30, 0.1) 100%
		);
		border-radius: 1rem;
		gap: 1rem;
		width: 180px;
		height: 180px;
		margin: 1rem;
		border: 1px solid #41557280;
	}
	.card img {
		width: 80px;
		height: 80px;
		object-fit: cover;
		aspect-ratio: 1/1;
	}
	.card h3 {
		text-align: center;
		font-size: var(--text-lg);
		font-weight: var(--bold);
		color: var(--gravity-green);
	}
</style>
