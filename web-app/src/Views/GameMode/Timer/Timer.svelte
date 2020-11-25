<script lang="ts">
	import { round } from 'gameStore';
	import { isBreak } from 'metaStore';
	import Slider from 'Timer/Slider.svelte';
	import Controller from 'Timer/Controller.svelte';
	export let timeFromUser: number;
	export let breakTimeFromUser: number;
	export let roundsPerBreakFromUser: number;

	const resetTimer = () => {
		return timeFromUser;
	};
	let timeRemaining = resetTimer();
	let isPaused = false;

	const resetBreakTimer = () => {
		return roundsPerBreakFromUser * timeFromUser + breakTimeFromUser;
	};
	let timeToBreak = roundsPerBreakFromUser * timeFromUser;

	//const audio = new Audio('https://www.soundjay.com/button/beep-01a.mp3');

	const formatTime = (timeRemaining: number) => {
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

		if (timeToBreak === 0) {
			isBreak.set(true);
			timeRemaining = breakTimeFromUser;
			timeToBreak = resetBreakTimer();
			clearInterval(interval);
			interval = setInterval(reduceTime, 1000);
		} else if (timeRemaining === 0) {
			isBreak.set(false);
			round.increment();
			timeRemaining = resetTimer();
			clearInterval(interval);
			interval = setInterval(reduceTime, 1000);
		}
		if (!isPaused) {
			timeRemaining = Math.max(0, timeRemaining - 1);
			timeToBreak = Math.max(0, timeToBreak - 1);
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
	<Slider bind:timeRemaining max={timeFromUser} breakMax={breakTimeFromUser} />
	<Controller {isPaused} {togglePause} />
</div>
