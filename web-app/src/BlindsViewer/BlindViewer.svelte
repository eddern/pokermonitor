<script>
	export let bigBlind;
	export let smallBlind;
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
	.bigBlind {
		font-size: 12rem;
		font-weight: 100;
	}
	.bigText {
		font-size: 2rem;
	}
	p {
		color: #999;
		margin: 0;
	}
</style>

<div class="mainWrapper">
	<div class="flexContainer">
		<p class="bigBlind">{bigBlind}</p>
		<p class="bigText">BIG</p>
	</div>
	<div class="flexContainer">
		<p class="blindNumber">{smallBlind}</p>
		<p>SMALL</p>
	</div>
</div>
