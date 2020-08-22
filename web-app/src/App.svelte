<script>
	import { Router, Link, Route } from "svelte-routing";
	import Testenv from "./nybos-testcooding-env/Testenv.svelte";
	import Home from "./nybos-testcooding-env/Home.svelte";
	export let url = "";

</script>

<main>
	<Router url="{url}">
		<nav>
		  <Link to="/">Home</Link>
		  <Link to="testenv">Testenv</Link>
		</nav>
		<div>
		  <Route path="testenv" component="{Testenv}" />
		  <Route path="/"><Home /></Route>
		</div>
	  </Router>
	  
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}



	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>