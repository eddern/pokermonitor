<script>
	export let timeRemaining;
	export let max;
	export let inactive;
</script>

<style>
	.slider {
		-webkit-appearance: none;
		width: 50%;
		height: 25px;
		background: #35654d;
		outline: none;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
		border: 0;
	}
	input:hover {
		cursor: pointer;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 25px;
		height: 25px;
		background: #4caf50;
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 25px;
		height: 25px;
		background: #4caf50;
		cursor: pointer;
	}

	div {
		width: 100%;
	}
</style>

<div>
	<input type="range" class="slider" bind:value={timeRemaining} min="0" {max} />
</div>
