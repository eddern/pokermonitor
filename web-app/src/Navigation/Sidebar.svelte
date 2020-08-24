<script>
	export let open = false;
	import Panel from '../Admin/Panel.svelte';
</script>

<style>
	aside {
		/* offscreen by default */
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.open {
		/* slide on screen */
		left: 0;
	}
</style>

<aside
	class="absolute w-full h-full bg-gray-200 p-10 border-r-2 shadow-lg"
	style="z-index:10"
	class:open>
	<Panel />
</aside>
