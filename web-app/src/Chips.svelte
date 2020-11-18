<script lang="ts">
	import ChipIcon from './ChipIcon.svelte';
	import { invertHex } from './invertHex';
	export let chipValues;
</script>

<style>
	.wrapper {
		display: grid;
		grid-row: 2;
		margin-top: 100%;
	}

	.chipContainer {
		margin: 20px;
	}
</style>

<main>
	<div class="wrapper">
		{#each chipValues as chipValue}
			<div class="chipContainer">
				<ChipIcon
					color1={chipValue.color1}
					color2={chipValue.color2}
					value={chipValue.value} />
			</div>
		{/each}
	</div>
</main>
