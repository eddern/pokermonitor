<script>
	import { formatTime } from '../../utils/timeHelperFunctions';
	let elapsedTime = 0;

	const increaseTime = () => {
		elapsedTime += 1;
	};
	let interval = setInterval(increaseTime, 1000);
</script>

<style>
	p {
		color: #dbe3d0;
	}
</style>

<div>
	<p>Elapsed Time: {formatTime(elapsedTime)}</p>
</div>
