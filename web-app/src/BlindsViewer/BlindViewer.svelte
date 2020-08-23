<script>
	import { smallBlind, bigBlind } from '../stores/gameStore';
</script>

<style>
	.flexContainer {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.flexContainer:first-child {
		margin-right: 10%;
	}
	.mainWrapper {
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.blindNumber {
		font-size: 10rem;
		font-weight: 100;
	}

	p {
		color: #999;
		margin: 0;
	}
</style>

<div class="mainWrapper">
	<div class="flexContainer">
		<p class="blindNumber">{$bigBlind}</p>
		<p>BIG</p>
	</div>
	<div class="flexContainer">
		<p class="blindNumber">{$smallBlind}</p>
		<p>SMALL</p>
	</div>
</div>
