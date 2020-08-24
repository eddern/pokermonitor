<script lang="ts">
	import data from '../../mockData';
	import { isInactive } from '../../stores/metaStore';
	import { getContext } from 'svelte';
	import Timer from './Timer/Timer.svelte';
	import BlindViewer from './BlindsViewer/BlindViewer.svelte';
	import Fullscreen from './Fullscreen.svelte';

	export let location;

	const timeFromUser = data.timePerRound;
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
</style>

<!-- <svelte:window on:keydown={handleKeydown} /> -->
<main id="mainContainer" class={$isInactive ? 'inactive' : ''}>
	<Fullscreen />
	<Timer {timeFromUser} />
	<BlindViewer />
</main>
