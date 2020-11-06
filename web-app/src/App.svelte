<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing';
	import { getContext } from 'svelte';
	import { isInactive } from 'metaStore';
	import Timer from 'Timer/Timer.svelte';
	import BlindViewer from 'BlindViewer';
	import data from 'mockData';
	import Fullscreen from 'GameMode/Fullscreen.svelte';

	import GameMode from 'GameMode/GameMode.svelte';
	import Landing from 'Landing/Landing.svelte';

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
