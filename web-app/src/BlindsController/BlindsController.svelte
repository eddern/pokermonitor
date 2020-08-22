<script>
  import BlindViewer from './BlindViewer.svelte';
  import Timer from '../Timer.svelte';
  export let firstBigBlind;
  const smallBlind = firstBigBlind / 2;
</script>

<style>

</style>

<div>
  <BlindViewer {bigBlind} {smallBlind} />
</div>
