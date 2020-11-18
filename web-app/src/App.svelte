<script lang="ts">
	import { getContext } from 'svelte';
	import { isInactive } from './stores/metaStore';
	import Timer from './Timer/Timer.svelte';
	import BlindViewer from './BlindsViewer/BlindViewer.svelte';
	import data from './data';
	import Fullscreen from './Fullscreen.svelte';
	import Chips from './Chips.svelte';

	const timeFromUser = data.timePerRound;
</script>

<style>
	main {
		background-color: #333;
		transition: background-color 0.4s ease;
		display: flex;
		flex-direction: row;
		width: 100vw;
		height: 100vh;
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
	.middle {
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		text-align: center;
	}
	.left {
		width: 15%;
		display: flex;
		justify-content: flex-start;
	}
	.right {
		width: 15%;
		display: flex;
		justify-content: flex-end;
	}
</style>

<main id="mainContainer" class={$isInactive ? 'inactive' : ''}>

	<Fullscreen />
	<div class="left">
		<Chips chipValues={data.chipValues} />
	</div>
	<div class="middle">
		<Timer {timeFromUser} />
		<BlindViewer />
	</div>
	<div class="right" />
</main>
