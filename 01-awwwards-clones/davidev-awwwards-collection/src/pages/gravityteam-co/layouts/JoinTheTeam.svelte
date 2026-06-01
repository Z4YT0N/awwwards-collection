<script>
	import LinkCommon from '../components/LinkCommon.svelte';
</script>

<section class="container">
	<div class="f-c-c-c">
		<img src="/blob-team.png" alt="blob" class="blob" />
		<h2 class="title">
			<span class="block"> Join </span>
			Gravity Team
		</h2>
	</div>
	<div class="des">
		<p>
			Join our community of innovators, problem solvers and owners who apply
			scientific discovery techniques to make crypto markets a better place for
			everyone.
		</p>
		<p>
			As we emphasize it in our name – Gravity Team, we are a team. A team of
			bright, talented people, each masters of their specialty, curious about
			the world and eager to solve the new exciting cryptocurrency market
			problems, build cool stuff and have fun whilst doing so!
		</p>
		<LinkCommon text="Learn more about working with us" />
	</div>
</section>

<style>
	.container {
		position: relative;
		display: flex;
		gap: 128px;
		justify-content: center;
		align-items: center;
		color: var(--gravity-text);
		margin-top: var(--divider-top);
	}
	.title {
		font-weight: var(--bold);
		font-size: var(--subtitle);
		position: relative;
		z-index: 99;
	}
	.blob {
		position: absolute;
	}
	.des {
		width: 516px;
	}
	.des p {
		margin: 24px 0;
		line-height: var(--lh-subtitle);
	}
</style>
