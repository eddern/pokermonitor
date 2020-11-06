<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing';

	import GameMode from './Views/GameMode/GameMode.svelte';
	import Landing from './Views/Landing/Landing.svelte';

	export let url = '';
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link>
		<Link to="monitor">GameMode</Link>
	</nav>

	<div>
		<Route path="monitor" component={GameMode} />
		<Route path="/">
			<Landing />
		</Route>
	</div>
</Router>
