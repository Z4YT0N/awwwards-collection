<script>
	import LinkCommon from '../components/LinkCommon.svelte';
</script>

<section class="container">
	<img src="/blob.png" alt="blob" class="blob" />
	<picture class="picture-exh">
		<img
			src="/exchange-screens-new.png"
			alt="exchnages screens"
			class="img-exh"
		/>
		<img src="/grid.png" alt="grid" class="grid-exh" />
	</picture>
	<div class="text-exc">
		<h3>
			Market Making for
			<span class="block"> Crypto Exchanges </span>
		</h3>
		<span>
			Attract more traders and projects with deep order books & liquidity
		</span>
		<p>
			Our world-class market making services are proven to help local and
			emerging exchanges win traders and gain market-leading positions of up to
			90% market dominance.
		</p>
		<LinkCommon text={'learn more'} />
	</div>
</section>

<style>
	.container {
		position: relative;
		color: var(--gravity-text);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.blob {
		position: absolute;
		left: -128px;
		bottom: 0;
	}
	.picture-exh {
		--3zd: 9;
		--2zd: 6;
		--1zd: 3;

		position: relative;
		width: 100%;
		max-width: 600px;
	}
	.grid-exh {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: var(--2zd);
	}
	.img-exh {
		position: relative;
		z-index: var(--3zd);
		animation: float 5s linear infinite;
	}

	.text-exc {
		max-width: 40%;
	}
	.text-exc h3 {
		font-size: var(--text-3xl);
		line-height: 1.22;
		font-weight: var(--medium);
		margin-bottom: 1rem;
	}
	.text-exc h3 span {
		color: var(--gravity-blue);
		font-weight: var(--bold);
	}
	.text-exc span {
		font-weight: bold;
		font-size: var(--text-xl);
	}
	.text-exc span {
		font-weight: bold;
		font-size: var(--text-xl);
	}
	.text-exc p {
		margin-top: 1rem;
		font-size: var(--text-lg);
		font-weight: var(--medium);
	}

	@keyframes float {
		0% {
			transform: translatey(0px);
		}
		50% {
			transform: translatey(-20px);
		}
		100% {
			transform: translatey(0px);
		}
	}
</style>
