<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing';

	import GameMode from './Views/GameMode/GameMode.svelte';
	import Landing from './Views/Landing/Landing.svelte';

	export let url = '';
	console.log('Hello');
</script>

<style>
	.white {
		color: white;
	}
</style>

<Router {url}>
	<nav>
		<Link to="/">Home</Link>
		<Link to="game-mode">GameMode</Link>
	</nav>
	<div>
		<Route path="game-mode" component={GameMode} />
		<Route path="/">
			<h1 class="white">Herro there</h1>
			<Landing />
		</Route>
	</div>
</Router>
