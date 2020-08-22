<script lang="ts">
	import ChipIcon from './ChipIcon.svelte';
	export let chipValues;
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

	.wrapper {
		width: 100%;
		display: flex;
	}

	.chipsWrapper {
		display: flex;
		margin: auto;
	}

	.chipContainer {
		display: flex;
		flex-direction: column;
	}

	.chipValue {
		font-size: 40px;
	}
</style>

<main>
	<div class="wrapper">
		<div class="chipsWrapper">
			{#each Object.keys(chipValues) as chipColor, i}
				<div class="chipContainer">
					<ChipIcon color={chipColor} x={-i * 300} />
					<span class="chipValue">{chipValues[chipColor]}</span>
				</div>
			{/each}
		</div>
	</div>
</main>
