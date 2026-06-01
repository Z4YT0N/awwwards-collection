<script lang="ts">
	export let text: string;
</script>

<button class="btn-common">
	<span> {text} </span>
</button>

<style>
	.btn-common {
		margin-top: 2rem;
		display: inline-flex;
		justify-content: center;
		position: relative;
		padding: 1.2rem 2.2rem;
		border: 0;
		outline: 0;
		background: rgba(0, 0, 0, 0);
		text-align: center;
		overflow: hidden;
	}
	.btn-common:hover::before {
		transform: translate3d(100%, 0, 0);
	}
	.btn-common::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			var(--gravity-blue) 0%,
			var(--gravity-blue-light) 44.76%,
			var(--gravity-yellow) 100%
		);
		transition: transform 1s;
	}
	.btn-common::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		pointer-events: none;
		width: 100%;
		height: 100%;
		border: 3px solid rgba(0, 0, 0, 0);
		border-radius: 2px;
		transition: opacity 1s;
		border-image: linear-gradient(
				135deg,
				#665dcd 0%,
				#5fa4e6 44.76%,
				#d2ab67 100%
			)
			1;
	}
	.btn-common span {
		position: relative;
		z-index: 2;
		color: #fff;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.1;
		text-transform: uppercase;
	}
</style>
