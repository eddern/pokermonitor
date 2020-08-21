<script>
  import { getContext } from 'svelte';
  import Timer from './Timer.svelte';
  import BlindsController from './BlindsController/BlindsController.svelte';
  import BlindViewer from './BlindsController/BlindViewer.svelte';
  let level = 1;
  let timeFromUser = 20;
  let bigBlind = 10;
  let smallBlind = 5;
  const incLevel = () => level++;

  $: {
    bigBlind = bigBlind * level;
    smallBlind = bigBlind / 2;
  }
  console.log(level);
</script>

<style>
  main {
    text-align: center;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 13em;
    font-weight: 100;
  }
</style>

<main>
  <h1>Pokr2kr</h1>
  <Timer {timeFromUser} {incLevel} />
  <BlindViewer {bigBlind} {smallBlind} />
</main>
