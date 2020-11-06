<script lang="ts">
	import ChipIcon from './ChipIcon.svelte';
	export let chipValues;

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
		{#each Object.keys(chipValues) as chipColor, i}
			<div class="chipContainer">
				<ChipIcon
					color={chipColor}
					textColor={invertHex(chipColor)}
					value={chipValues[chipColor]} />
			</div>
		{/each}
	</div>
</main>
