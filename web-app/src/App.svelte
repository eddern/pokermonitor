<script lang="ts">
	import { getContext } from 'svelte';
	import { isInactive } from './stores/metaStore';
	import Timer from './Timer/Timer.svelte';
	import BlindViewer from './BlindsViewer/BlindViewer.svelte';
	import data from './data';
	import Fullscreen from './Fullscreen.svelte';
	import { handleKeydown } from './utils/helperFunctions';

	const timeFromUser = data.timePerRound;
</script>

<style>
	main {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
		height: 100vh;
	}
</style>

<!-- <svelte:window on:keydown={handleKeydown} /> -->
<main id="mainContainer" style={$isInactive ? 'cursor: none;' : 'cursor: auto;'}>
	<Fullscreen />
	<Timer {timeFromUser} />
	<BlindViewer />
</main>
