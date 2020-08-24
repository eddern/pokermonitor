<script>
	import { fade } from 'svelte/transition';
	import { isInactive } from '../stores/metaStore';
	export let togglePause;
	export let isPaused;
</script>

<style>
	mainWrapper {
		margin-top: 20px;
		height: 100px;
	}
	button {
		background: transparent;
		border: 0;
	}
	span {
		color: #ddd;
		font-size: 7rem;
	}
	.material-icons {
		transition: transform 200ms ease;
	}
	.material-icons:hover {
		transform: scale(1.1);
	}
</style>

<mainWrapper>
	{#if !$isInactive}
		<button transition:fade={{ duration: 300 }} on:click={togglePause}>
			{#if isPaused}
				<span class="material-icons">play_arrow</span>
			{:else}
				<span class="material-icons">pause</span>
			{/if}
		</button>
	{/if}
</mainWrapper>
