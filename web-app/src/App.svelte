<script lang="ts">
	import { getContext } from 'svelte';
	import { isInactive } from 'metaStore';
	import Timer from 'Timer/Timer.svelte';
	import BlindViewer from 'BlindViewer';
	import data from 'data';
	import Fullscreen from './Fullscreen.svelte';

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
