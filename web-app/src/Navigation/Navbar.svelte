<script>
	//import Logo from './Logo.svelte';
	import Hamburger from './Hamburger.svelte';

	export let sidebar = false;
</script>

<!-- Navbar.svelte -->
<header class="flex p-4">

	<!-- left side -->
	<nav class="flex">
		<Hamburger bind:open={sidebar} />
	</nav>

	<!-- right side -->
</header>
