<script lang="ts">
	import ChipIcon from './ChipIcon.svelte';
	import type { Chip } from './typings/GameTypes';

	export let chips: Chip[];

	const invertHex = (hex: string) => {
		return (
			'#' +
			(Number(`0x1${hex.replace('#', '')}`) ^ 0xffffff).toString(16).substr(1).toUpperCase()
		);
	};
</script>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		max-height: 100vh;
	}

	.chipContainer {
		margin: 20px;
	}
</style>

<main>
	<div class="wrapper">
		{#each chips as chip}
			<div class="chipContainer">
				<ChipIcon color={chip.color} textColor={invertHex(chip.color)} value={chip.value} />
			</div>
		{/each}
	</div>
</main>
