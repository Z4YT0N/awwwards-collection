<script lang="ts">
	export let name: string;
	export let image: string;
	export let current_price: number;
</script>

<div class="container">
	<img src={image} alt={name} class="image-coin" />
	<div class="coin-data">
		<span> ${current_price}USD </span>
		<span> {name} </span>
	</div>
</div>

<style>
	.image-coin {
		width: 30px;
		height: 30px;
	}

	.container {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
	}
	.coin-data {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: var(--gravity-text);
		line-height: 1;
	}
</style>
