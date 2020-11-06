<script>
	import Slider from 'Timer/Slider.svelte';
	import Controller from 'Timer/Controller.svelte';
	import { round } from 'gameStore';
	export let timeFromUser;

	const resetTimer = () => {
		return timeFromUser;
	};
	let timeRemaining = resetTimer();
	let isPaused = false;

	//const audio = new Audio('https://www.soundjay.com/button/beep-01a.mp3');

	const oneMin = 60;
	const tenSec = 10;

	const formatTime = (timeRemaining) => {
		const minutes = Math.floor(timeRemaining / 60);
		const seconds = timeRemaining % 60;
		const zeroPaddedSeconds = seconds.toString().padStart(2, '0');
		return `${minutes}:${zeroPaddedSeconds}`;
	};
	const togglePause = () => (isPaused = !isPaused);
	const reduceTime = () => {
		// if (timeRemaining == oneMin) {
		// 	audio.play();
		// }
		// if (timeRemaining > 0 && timeRemaining < tenSec) {
		// 	audio.play();
		// }
		if (timeRemaining === 0) {
			round.increment();
			timeRemaining = resetTimer();
			clearInterval(interval);
			interval = setInterval(reduceTime, 1000);
		}
		if (!isPaused) {
			timeRemaining = Math.max(0, timeRemaining - 1);
		}
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
		font-variant-numeric: tabular-nums;
	}
</style>

<div>
	<p>{formatTime(timeRemaining)}</p>
	<Slider bind:timeRemaining max={timeFromUser} />
	<Controller {isPaused} {togglePause} />
</div>
