<script lang="ts">
	import data from '../../mockData.ts';
	import { isInactive } from 'metaStore';
	import Timer from 'Timer/Timer.svelte';
	import BlindViewer from 'BlindViewer';
	import Fullscreen from 'GameMode/Fullscreen.svelte';
	import Chips from './Chips/Chips.svelte';

	const timeFromUser = data.timePerRound;
	const breakTimeFromUser = data.timePerBreak;
	const roundsPerBreakFromUser = data.roundsPerBreak;
</script>

<style>
	main {
		background-color: #151515;
		transition: background-color 0.5s ease-in-out;
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

	#chipsContainer {
		position: absolute;
		left: 0;
		height: 100%;
		overflow: scroll;
	}
</style>

<!-- <svelte:window on:keydown={handleKeydown} /> -->
<main id="mainContainer" class={$isInactive ? 'inactive' : ''}>
	<div id="chipsContainer">
		<Chips chips={data.chips} />
	</div>
	<Fullscreen />
	<Timer {timeFromUser} {breakTimeFromUser} {roundsPerBreakFromUser} />
	<BlindViewer />
</main>
