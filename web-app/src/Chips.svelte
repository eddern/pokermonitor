<script lang="ts">
	import ChipIcon from './ChipIcon.svelte';
	import { invertHex } from './invertHex';
	export let chipValues;
</script>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
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
