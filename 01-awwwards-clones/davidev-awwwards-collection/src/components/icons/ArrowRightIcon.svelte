<script lang="ts">
	export let color: string = '#fff';
	export let inlineStyle: string = 'color: #fff';
	export let className: string = 'w-8 h-4';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	style={inlineStyle}
	fill="none"
	viewBox="0 0 24 24"
	stroke-width="1.5"
	stroke="currentColor"
	class={className}
>
	<path
		{color}
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
	/>
</svg>
