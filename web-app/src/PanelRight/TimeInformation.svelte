<script>
	import ElapsedTime from './ElapsedTime/ElapsedTime.svelte';
	import NextBreak from './NextBreak/NextBreak.svelte';
	import LevelViewer from './LevelViewer/LevelViewer.svelte';
</script>

<style>
	.wrapper {
		width: 25%;
		display: flex;
		text-align: left;
		flex-direction: column;
	}
</style>

<div class="wrapper">
	<LevelViewer />
	<ElapsedTime />
	<NextBreak />
</div>
