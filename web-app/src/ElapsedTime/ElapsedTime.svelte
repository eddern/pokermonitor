<script>
	let elapsedTime = 0;

	const formatTime = (elapsedTime) => {
		const minutes = Math.floor(elapsedTime / 60);
		const seconds = elapsedTime % 60;
		const zeroPaddedSeconds = seconds.toString().padStart(2, '0');
		return `${minutes}:${zeroPaddedSeconds}`;
	};

	const increaseTime = () => {
		elapsedTime += 1;
	};
	let interval = setInterval(increaseTime, 1000);
</script>

<style>
	p {
		color: #dbe3d0;
	}
	.wrapper {
		width: 25%;
	}
</style>

<div class="wrapper">
	<p>Elapsed Time: {formatTime(elapsedTime)}</p>
</div>
