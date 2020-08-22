<script>
	import { setContext } from 'svelte';
	export let timeFromUser;
	export let incLevel;
	const resetTimer = () => {
		return timeFromUser * 1000;
	};
	let timeRemaining = resetTimer();
	const audio = new Audio('https://www.soundjay.com/button/beep-01a.mp3');

	const oneMin = 60 * 1000;
	const tenSec = 10000;

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
		color: gold;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	p {
		font-size: 6rem;
		margin: 0;
	}
</style>

<div>
	<p>Time left: {timeRemaining / 1000}s</p>
</div>
