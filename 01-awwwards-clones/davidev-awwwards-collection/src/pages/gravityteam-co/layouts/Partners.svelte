<script>
	import ExchangeCard from '../components/ExchangeCard.svelte';

	const per_page = 12;
	const page = 1;
	const options = `exchanges?per_page=${per_page}&page=${page}`;
	const base_url = 'https://api.coingecko.com/api/v3/';

	const url = base_url + options;

	async function getExchanges() {
		const res = await fetch(url).then(res => {
			return res.json();
		});
		return res;
	}
	const exchanges = getExchanges().then(res => res);
</script>

<section class="container">
	<div class="effect">
		<img src="/mena.png" alt="mena" class="mena img-common" />
		<img src="/near.png" alt="near" class="near img-common" />
		<img src="/solana.png" alt="solana" class="solana img-common" />
		<img src="/blob.png" alt="blob" class="blob" />
	</div>
	<h2 class="title">Our Partners & Friends</h2>
	<div class="exchanges">
		{#await exchanges}
			<div>...loading</div>
		{:then data}
			<div class="grid-0-6">
				{#each data.slice(0, 6) as exchange}
					<ExchangeCard img={exchange.image} name={exchange.name} />
				{/each}
			</div>
			<div class="grid-6-12">
				{#each data.slice(6) as exchange}
					<ExchangeCard img={exchange.image} name={exchange.name} />
				{/each}
			</div>
		{:catch error}
			<p>An error occurred!</p>
		{/await}
	</div>
</section>

<style>
	.container {
		position: relative;
		margin-top: var(--divider-top);
		color: var(--gravity-text);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 18;
	}
	.title {
		max-width: 40%;
		font-size: var(--subtitle);
		font-weight: var(--medium);
	}
	.exchanges {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		place-items: center;
		height: 380px;
		overflow: hidden;
		position: relative;
	}
	.exchanges::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 48px;
		content: '';
		background-image: linear-gradient(
			0deg,
			rgba(20, 22, 25, 0) 0%,
			rgba(20, 22, 25, 0.88) 52.68%,
			#141619 100%
		);
		z-index: 99;
		top: 0;
	}
	.exchanges::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 48px;
		content: '';
		background-image: linear-gradient(
			180deg,
			rgba(20, 22, 25, 0) 0%,
			rgba(20, 22, 25, 0.88) 52.68%,
			#141619 100%
		);
		z-index: 99;
	}

	.grid-0-6 {
		animation: animation-grid-1 20s linear infinite;
	}
	.grid-6-12 {
		animation: animation-grid-2 20s linear infinite;
		animation-delay: 10s;
	}

	.effect img {
		position: absolute;
	}

	.blob {
		top: -16rem;
		left: -32rem;
		z-index: 3;
	}

	.img-common {
		width: 48px;
		height: 48px;
		object-fit: cover;
		z-index: 9;
		animation-duration: 10s;
	}
	.near {
		top: 0;
		left: -3rem;
		animation: near-animation 10s linear infinite;
	}
	@keyframes near-animation {
		0%,
		100% {
			transform: translate(0rem, 0rem);
		}
		33% {
			transform: translate(3rem, 3rem);
		}
		66% {
			transform: translate(0rem, 6rem);
		}
	}
	.solana {
		top: 3rem;
		left: 0;
		animation: solana-animation 10s linear infinite;
	}
	@keyframes solana-animation {
		0%,
		100% {
			transform: translate(0rem, 0rem);
		}
		33% {
			transform: translate(-3rem, 3rem);
		}
		66% {
			transform: translate(-3rem, -3rem);
		}
	}

	.mena {
		top: 6rem;
		left: -3rem;
		animation: mena-animation 10s linear infinite;
	}
	@keyframes mena-animation {
		0%,
		100% {
			transform: translate(0rem, 0rem);
		}
		33% {
			transform: translate(0rem, -6rem);
		}
		66% {
			transform: translate(3rem, -3rem);
		}
	}

	@keyframes animation-grid-1 {
		0% {
			transform: translateY(-860px);
		}
		50% {
			transform: translateY(98px);
		}
		100% {
			transform: translateY(-860px);
		}
	}
	@keyframes animation-grid-2 {
		0% {
			transform: translateY(-860px);
		}
		50% {
			transform: translateY(98px);
		}
		100% {
			transform: translateY(-860px);
		}
	}
	@keyframes float {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
