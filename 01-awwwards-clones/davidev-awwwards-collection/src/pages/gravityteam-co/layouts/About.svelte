<script lang="ts">
	interface IGridItem {
		title: string;
		text: string;
	}

	const dataAbout = [
		{
			title: '5 billion+',
			text: 'trades done to date',
		},
		{
			title: '24/7',
			text: 'liquidity',
		},
		{
			title: '1,200+',
			text: 'crypto-asset pairs',
		},
		{
			title: '2017',
			text: 'start, crypto-natives',
		},
		{
			title: '25+',
			text: 'Gravity Teammates (& growing)',
		},
		{
			title: '0.8%',
			text: 'of the global crypto spot trading volume',
		},
		{
			title: '~$100 billion',
			text: 'cumulative trading volume to date',
		},
		{
			title: '1,000+',
			text: 'crypto-asset pairs',
		},
	];
</script>

<section class="container-about f-c-c-c">
	<h2 class="about-title">About Gravity Team</h2>
	<p class="about-text">
		At Gravity Team, we are on the mission to balance the supply and demand
		across crypto markets worldwide. We are a crypto native market maker founded
		by traders, developers, and innovators who are strong believers and
		supporters of the future of decentralization and digital assets.
	</p>
	<div class="grid-about">
		{#each dataAbout as data}
			<div class="grid-item">
				<div class="grid-data f-c-c-c">
					<h3>{data.title}</h3>
					<span>{data.text}</span>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.container-about {
		color: var(--gravity-text);
		margin-top: var(--divider-top);
	}

	.about-title {
		font-size: var(--subtitle);
		font-weight: var(--bold);
		line-height: 1.2;
		margin-bottom: 20px;
	}

	.about-text {
		text-align: center;
		max-width: 632px;
		font-size: 20px;
		line-height: 32px;
	}
	.grid-about {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px;
		margin-top: 40px;
	}
	.grid-item {
		width: 100%;
		max-width: 264px;
		min-height: 180px;
		max-height: 180px;
		border-radius: 8px;
		padding: 2px;
		background-image: linear-gradient(
			90deg,
			var(--gravity-blue),
			var(--gravity-blue-light),
			var(--gravity-green)
		);
		animation: gradient-animation 5s ease infinite;
		background-size: 400% 400%;
	}
	.grid-item h3 {
		font-size: 2rem;
		font-weight: var(--bold);
		margin-bottom: 10px;
	}
	.grid-data {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		padding: 1rem;
		background-color: var(--gravity-bg);
		transition: all 0.5s ease-in;
		transform-origin: center;
		transition-duration: 0.5s;
	}
	.grid-data:hover {
		background-image: linear-gradient(
			-45deg,
			var(--gravity-blue),
			var(--gravity-blue-light),
			var(--gravity-yellow)
		);
		transition: all 0.5s ease-in;
	}
	.grid-data span {
		font-size: var(--text-lg);
		text-align: center;
	}

	@keyframes gradient-animation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
