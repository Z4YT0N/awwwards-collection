<script lang="ts">
	import ArrowRightIcon from '../../../components/icons/ArrowRightIcon.svelte';

	export let text: string;
</script>

<div class="container">
	<div class="span">
		<span>
			{text}
		</span>
		<ArrowRightIcon className="z-20 h-4 w-auto" />
	</div>
</div>

<style>
	.container {
		gap: 2px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.container .span {
		display: flex;
		padding: 0 4px;
		gap: 4px;
		align-items: center;
		font-size: var(--text-lg);
		font-weight: var(--medium);
		position: relative;
		z-index: 12;
		transition-duration: 1s;
		transition-property: hover;
		transition-timing-function: ease-out;
	}
	.container .span span {
		position: relative;

		z-index: 18;
	}
	.container .span::before {
		--primary: var(--gravity-blue);
		--secondary: var(--gravity-blue-light);
		--tertiary: var(--gravity-yellow);
		content: '';
		position: absolute;
		z-index: 9;
		bottom: -2px;
		left: 0;
		height: 1px;
		border-radius: 2px;
		width: 100%;
		background-image: linear-gradient(
			90deg,
			var(--primary) 0%,
			var(--secondary) 50%,
			var(--tertiary) 100%
		);
	}

	.container .span:hover::before {
		height: 27px;
		animation-duration: 0.5s;
	}
</style>
