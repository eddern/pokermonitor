<script lang="ts">
	import ChipIcon from './ChipIcon.svelte';
	export let chips;
</script>

<style>
	svg {
		position: absolute;
		bottom: 44px;
	}

	/* .wrapper {
		width: 200px;
		height: 200px;
	} */
</style>

<main>
	<div class="wrapper">
		{#each Object.keys(chips) as chipColor, i}
			<div>{chipColor}</div>
			<span>{chips[chipColor]}</span>
			<ChipIcon color={chipColor} x={-i * 300} />
		{/each}
	</div>
</main>
