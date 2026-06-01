<script lang="ts">
	import LinkCommon from '../components/LinkCommon.svelte';
</script>

<section class="container-market f-c-c-c">
	<header class="header-market">
		<h2 class="title-market">Crypto Market Making</h2>
		<p class="description-market">
			We are a global crypto liquidity provider and algorithmic market maker. We
			trade digital assets listed on Centralized Exchanges in over 15 countries
			worldwide.
		</p>
	</header>
	<div class="making">
		<div class="text-hld">
			<h3>
				Market Making for
				<span class="block"> Crypto Projects </span>
			</h3>
			<span>Accelerate your token’s journey by boosting its liquidity</span>
			<p>
				We invest in building long-term, sustainable relationships and support
				our projects in their growth journey with our services, industry
				expertise and network.
			</p>
			<LinkCommon text={'Learn More'} />
		</div>
		<div class="charts f-c-c-c">
			<img src="/market.jpg" alt="market" />
		</div>
	</div>
</section>

<style>
	.container-market {
		padding: 0 24px;
		color: var(--gravity-text);
		margin-top: var(--divider-top);
		z-index: 18;
	}
	.title-market {
		text-align: center;
		font-size: var(--subtitle);
		font-weight: var(--bold);
	}
	.description-market {
		text-align: center;
		max-width: 612px;
		width: 100%;
		margin: 24px auto;
		line-height: var(--lh-subtitle);
	}
	.making {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		margin-top: 3rem;
		width: 100%;
	}
	.text-hld {
		max-width: 40%;
	}
	.text-hld h3 {
		font-size: var(--text-3xl);
		line-height: 1.22;
		font-weight: var(--medium);
		margin-bottom: 1rem;
	}
	.text-hld h3 span {
		color: var(--gravity-blue);
		font-weight: var(--bold);
	}
	.text-hld span {
		font-weight: bold;
		font-size: var(--text-xl);
	}
	.text-hld p {
		margin-top: 1rem;
		font-size: var(--text-lg);
		font-weight: var(--medium);
	}
	.charts {
		padding: 0;
		position: relative;
		width: 100%;
	}
	.charts img {
		max-height: 420px;
		object-fit: cover;
	}
</style>
