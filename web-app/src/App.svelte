<script>
  import { getContext } from "svelte";
  import Timer from "./Timer.svelte";
  import BlindsController from "./BlindsController/BlindsController.svelte";
  import BlindViewer from "./BlindsController/BlindViewer.svelte";
  import data from "./data";

  let timeFromUser = data.timePerRound;
  let index = 0;
  let bigBlind = data.blinds[index];
  let smallBlind = bigBlind / 2;
  const incLevel = () => {
    index++;
    if (index > data.blinds.length - 1) {
      console.log(
        `Last blind reached, continuing on ${
          data.blinds[data.blinds.length - 1]
        } increments.`,
        "background:red"
      );
    }
  };
  console.log(data);

  // These react to index increment
  $: {
    if (index > data.blinds.length - 1) {
      bigBlind += data.blinds[data.blinds.length - 1];
    } else {
      bigBlind = data.blinds[index];
    }
    smallBlind = Math.round(bigBlind / 2);
    timeFromUser = data.timePerRound;
  }
</script>

<style>
  main {
    text-align: center;
  }
  h1 {
    margin-top: 0;
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
