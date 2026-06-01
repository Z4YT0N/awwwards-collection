<script>
	import ButtonCommon from '../components/ButtonCommon.svelte';
</script>

<section class="container f-c-c-c">
	<h2 class="title">Contact Us</h2>
	<p>
		We are always open to discuss new value-adding partnerships. Do reach out if
		you are an exchange or a project looking for liquidity; an algorithmic
		trader or a software developer looking to improve the markets with us or
		just have a great idea you can’t wait to share with us!
	</p>
	<ButtonCommon text={'Get in touch'} />
	<img src="/blob-team.png" alt="blob" class="blob-img blob-img-1" />
	<img src="/blob-team.png" alt="blob" class="blob-img blob-img-2" />
</section>

<style>
	.container {
		color: var(--gravity-text);
		position: relative;
		margin-top: var(--divider-top);
	}
	.title {
		font-weight: var(--bold);
		font-size: var(--subtitle);
		margin-bottom: 2rem;
		position: relative;
		z-index: 99;
	}
	.container p {
		line-height: var(--lh-subtitle);
		max-width: 624px;
		text-align: center;
		position: relative;
		z-index: 99;
	}
	.blob-img {
		position: absolute;
	}
	.blob-img-1 {
		top: 0;
		right: -10rem;
	}
	.blob-img-2 {
		bottom: 0;
		left: -10rem;
	}
</style>
