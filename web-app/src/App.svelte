<script lang="ts">
	import { getContext } from 'svelte';
	import { isInactive } from './stores/metaStore';
	import Timer from './Timer/Timer.svelte';
	import BlindViewer from './BlindsViewer/BlindViewer.svelte';
	import data from './data';
	import Chips from './Chips.svelte';

	const timeFromUser = data.timePerRound;
</script>

<style>
	main {
		background-color: #333;
		transition: background-color 0.4s ease;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
	}

	.inactive {
		cursor: none;
		background-color: black;
	}
</style>

<main>
	<Chips chips={data.chips} />
	<h1>Pokr2kr</h1>
	<Timer {timeFromUser} {incLevel} />
	<BlindViewer {bigBlind} {smallBlind} />
</main>
