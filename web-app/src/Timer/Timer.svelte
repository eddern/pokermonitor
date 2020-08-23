<script>
	import { setContext } from 'svelte';
	import Slider from './Slider.svelte';
	export let timeFromUser;
	export let incLevel;
	const resetTimer = () => {
		return timeFromUser * 1000;
	};
	let timeRemaining = resetTimer();
	const audio = new Audio('https://www.soundjay.com/button/beep-01a.mp3');

	const oneMin = 60 * 1000;
	const tenSec = 10 * 1000;

	const reduceTime = () => {
		if (timeRemaining == oneMin) {
			audio.play();
		}
		if (timeRemaining > 0 && timeRemaining < tenSec) {
			audio.play();
		}
		if (timeRemaining === 0) {
			incLevel();
			timeRemaining = resetTimer();
			clearInterval(interval);
			interval = setInterval(reduceTime, 1000);
		}
		timeRemaining = Math.max(0, timeRemaining - 1000);
	};
	let interval = setInterval(reduceTime, 1000);
</script>

<style>
	div {
		color: #dbe3d0;
		/* color: #35654d; */
		display: flex;
		width: 100%;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	p {
		font-size: 14rem;
		font-weight: 100;
		margin: 0;
	}
</style>

<div>
	<p>{Math.ceil(timeRemaining / 1000)}</p>
	<Slider bind:value={timeRemaining} />
</div>
