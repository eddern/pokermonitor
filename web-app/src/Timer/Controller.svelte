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
</style>

<mainWrapper>
	{#if $isInactive}
		<div transition:fade={{ duration: 300 }} />
	{:else}
		<button transition:fade={{ duration: 300 }} on:click={togglePause}>
			{#if isPaused}
				<span class="material-icons">play_arrow</span>
			{:else}
				<span class="material-icons">pause</span>
			{/if}
		</button>
	{/if}
</mainWrapper>
