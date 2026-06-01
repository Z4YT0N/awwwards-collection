<script>
	import ButtonCommon from '../components/ButtonCommon.svelte';

	const titleHeader = 'Balancing Crypto Markets';
</script>

<section class="f-c-c-c container">
	<h1 class="title">
		<span class="block">
			{'Balancing'}
		</span>
		<span>
			{'Crypto Markets'}
		</span>
	</h1>
	<p class="description">
		Our fully automated proprietary quantitative trading software provides 24/7
		liquidity to 170+ crypto assets across 25+ centralized spot and derivative
		crypto exchanges.
	</p>
	<ButtonCommon text={'Get in touch'} />
</section>

<style>
	.title {
		--gravity-bg: #141619;
		--gravity-text: #fff;
		--gravity-blue: #665dcd;
		--gravity-blue-light: #5fa4e6;
		--gravity-green: #00d1b2;
		--gravity-yellow: #d2ab67;
	}
	.container {
		position: relative;
	}
	.f-c-c-c {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.title {
		text-align: center;
		color: var(--gravity-text);
		font-weight: var(--medium);
		font-size: 72px;
		line-height: 1;
	}
	.description {
		text-align: center;
		color: var(--gravity-text);
		font-weight: var(--regular);
		font-size: 20px;
		line-height: 32px;
		margin-top: 2rem;
		max-width: 584px;
	}
</style>
