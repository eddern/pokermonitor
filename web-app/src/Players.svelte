<script>
	import data from './data';

	let players = data.players;
	console.log(players);
</script>

<style>
	div {
		color: #dbe3d0;
		padding: 0;
		margin: 0;
		display: block;
		top: 0;
		align-self: start;
		left: 0;
	}
</style>

<div>
	{#each players as player}
		<div>{player.name}</div>
	{/each}
</div>
