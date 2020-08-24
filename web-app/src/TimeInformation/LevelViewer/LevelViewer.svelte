<script>
	import { onDestroy } from 'svelte';

	import { round } from '../../stores/gameStore';
</script>

<style>
	p {
		color: #dbe3d0;
	}
</style>

<div>
	<p>Current Level: {$round + 1}</p>
</div>
