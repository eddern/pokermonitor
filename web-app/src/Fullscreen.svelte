<script>
	import { isFullscreen, isInactive } from './stores/metaStore';
	import { onMount, onDestroy } from 'svelte';

	const closeFullscreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		}
	};

	const openFullscreen = () => {
		const elem = document.getElementById('mainContainer');
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	};

	const toggleFullscreen = () => ($isFullscreen ? closeFullscreen() : openFullscreen());

	const handleKeyPress = (e) => {
		switch (e.code) {
			case 'Escape': {
				closeFullscreen();
				break;
			}
			case 'KeyF': {
				toggleFullscreen();
				break;
			}
		}
	};

	var inactivityWater = function () {
		console.log('It happend')
		var time;
		function inactiveUI() {
			if ($isFullscreen) {
				isInactive.set(true);
			}
		}
		function resetTimer() {
			isInactive.set(false);
			clearTimeout(time);
			time = setTimeout(inactiveUI, 1500);
		}

		resetTimer();
		window.onload = resetTimer;
		document.onmousemove = resetTimer;
		document.onkeypress = resetTimer;
	};

	onMount(() => {
		document.addEventListener('keypress', handleKeyPress);
		document.onfullscreenchange = () => isFullscreen.update((oldValue) => !oldValue);
		inactivityWater();
		return () => {
			document.removeEventListener('keypress', handleKeyPress);
		};
	});
</script>

<style>
	.fullscreen-btn:hover {
		transform: scale(1.2);
	}
	.fullscreen-btn {
		padding: 30px;
		color: white;
	}
	.exit-fullscreen-btn:hover {
		transform: scale(0.8);
	}
	.exit-fullscreen-btn {
		padding: 30px;
		color: white;
	}
	button:hover {
		cursor: pointer;
	}
	.hide {
		opacity: 0;
	}
	.show {
		opacity: 1;
	}

	#fullscreen-toggle {
		transition: opacity 400ms ease-in-out;
	}
	span {
		font-size: 2rem;
		transition: transform 200ms ease;
	}
	button {
		padding: 0;
		margin: 0;
		position: absolute;
		top: 0;
		right: 0;
		background-color: transparent;
		border: 0;
	}
</style>

<button id="fullscreen-toggle" class={$isInactive ? 'hide' : 'show'} on:click={toggleFullscreen}>
	{#if $isFullscreen}
		<span class="material-icons exit-fullscreen-btn">fullscreen_exit</span>
	{:else}
		<span class="material-icons fullscreen-btn">fullscreen</span>
	{/if}
</button>
