<script>
	import { smallBlind, bigBlind, nextBigBlind, nextSmallBlind } from '../../../stores/gameStore';
</script>

<style>
	mainWrapper {
		width: 50%;
	}

	blindsWrapper {
		width: 200px;
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	blindNumber {
		font-size: 12rem;
		font-weight: 200;
		width: 50%;
		text-align: center;
		color: #ddd;
		margin: 0;
	}

	nextBlindNumber {
		color: #666;
		font-size: 6rem;
		font-weight: 100;
		width: 50%;
		text-align: center;
		margin: 0;
	}
	h3 {
		color: #aaa;
		font-weight: 100;
		font-size: 2rem;
		margin: 0;
	}
	hr {
		border-color: #000;
	}
</style>

<mainWrapper>
	<h3>Blinds</h3>
	<blindsWrapper>
		<blindNumber>{$bigBlind}</blindNumber>
		<blindNumber>{$smallBlind}</blindNumber>
	</blindsWrapper>
	<blindsWrapper>
		<nextBlindNumber>{$nextBigBlind}</nextBlindNumber>
		<nextBlindNumber>{$nextSmallBlind}</nextBlindNumber>
	</blindsWrapper>
</mainWrapper>
