<script lang="ts">
	import { getContext } from 'svelte';
	import { isFullscreen, isInactive } from './stores';
	import Timer from './Timer/Timer.svelte';
	import BlindViewer from './BlindsViewer/BlindViewer.svelte';
	import data from './data';
	import Fullscreen from './Fullscreen.svelte';

	let timeFromUser = data.timePerRound;
	let index = 0;
	let bigBlind = data.blinds[index];
	let smallBlind = bigBlind / 2;
	let inactive;
	isInactive.subscribe((value) => (inactive = value));

	const incLevel = () => {
		index++;
		if (index > data.blinds.length - 1) {
			console.log(
				`Last blind reached, continuing on ${
					data.blinds[data.blinds.length - 1]
				} increments.`,
				'background:red',
			);
		}
	};

	// These react to index increment
	$: {
		if (index > data.blinds.length - 1) {
			bigBlind += data.blinds[data.blinds.length - 1];
		} else {
			bigBlind = data.blinds[index];
		}
		smallBlind = Math.round(bigBlind / 2);
		timeFromUser = data.timePerRound;
	}
</script>

<style>
	main {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100vh;
	}
</style>

<main id="mainContainer" style={inactive ? 'cursor: none;' : 'cursor: auto;'}>
	<Fullscreen />
	<Timer {timeFromUser} {incLevel} />
	<BlindViewer {bigBlind} {smallBlind} />
</main>
