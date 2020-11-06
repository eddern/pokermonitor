<script lang="ts">
	import { fade } from 'svelte/transition';
	import { isInactive } from '../../../stores/metaStore';

	export let timeRemaining: number;
	export let max: number;
	export let breakMax: number;
	export let isBreak: boolean;

	const setMax = () => {
		if (isBreak) {
			return breakMax;
		} else {
			return max;
		}
	};
</script>

<style>
	/* Reset slider styles */
	input[type='range'] {
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		width: 100%; /* Specific width is required for Firefox. */
		background: #35654d; /* Otherwise white in Chrome */
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
	}

	input[type='range']:focus {
		outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
	}

	input[type='range']::-ms-track {
		width: 100%;
		cursor: pointer;

		/* Hides the slider so custom styles can be added */
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	/* Custom styles */

	.slider {
		width: 50%;
		height: 5px;
		border-radius: 5px;
		background: #35654d;
		outline: none;
		-webkit-transition: 0.2s;
		transition: opacity 400ms;
		border: 0;
		padding: 0;
	}

	.slider:hover {
		cursor: pointer;
	}

	.slider::-webkit-slider-thumb {
		transition: height 250ms ease;
		width: 25px;
		height: 13px;
		border-radius: 13px;
		background: mediumaquamarine;
		cursor: move; /* fallback if grab cursor is unsupported */
		cursor: grab;
		cursor: -webkit-grab;
	}

	.slider::-webkit-slider-thumb:hover {
		height: 25px;
		border-radius: 25px;
	}

	.slider::-webkit-slider-thumb:active {
		cursor: grabbing;
		cursor: -moz-grabbing;
	}

	.slider::-moz-range-thumb:active {
		cursor: grabbing;
		cursor: -webkit-grabbing;
	}

	.slider::-moz-range-thumb {
		width: 15px;
		height: 15px;
		border-radius: 15px;
		background: mediumaquamarine;
		cursor: move; /* fallback if grab cursor is unsupported */
		cursor: -moz-grab;
	}

	.slider-container {
		width: 50%;
		position: relative;
		display: flex;
		height: 10px;
		align-items: center;
		flex-direction: column;
	}

	.progressbar {
		border-radius: 4px;
		position: absolute;
		top: 0;
		transition: opacity 200ms ease-in-out;
		height: 5px;
		width: 100%;
		background: #222;
	}

	.progress-left {
		border-radius: 4px;
		background: mediumaquamarine;
		height: 100%;
		transition: width 900ms linear;
	}
</style>

<div class="slider-container">
	{#if $isInactive}
		<div transition:fade={{ duration: 300 }} class="progressbar">
			<div class="progress-left" style="width: {`${(timeRemaining / setMax()) * 100}%`}" />
		</div>
	{:else}
		<input
			transition:fade={{ duration: 300 }}
			type="range"
			class="slider"
			bind:value={timeRemaining}
			min="0"
			max={setMax()} />
	{/if}
</div>
