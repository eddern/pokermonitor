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
	#mainContainer {
		background-color: #333;
		position: relative;
		transition: background-color 0.4s ease;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
	}

	#chipsContainer {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		overflow: scroll;
	}

	.inactive {
		cursor: none;
		background-color: black;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
	}

	h1 {
		margin-top: 0;
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 13em;
		font-weight: 100;
	}
</style>

<main id="mainContainer" class={$isInactive ? 'inactive' : ''}>
	<div id="chipsContainer">
		<Chips chipValues={data.chipValues} />
	</div>
	<Fullscreen />
	<Timer {timeFromUser} />
	<BlindViewer />
</main>
