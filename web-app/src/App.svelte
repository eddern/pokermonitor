<script>
  import { getContext } from "svelte";
  import Timer from "./Timer.svelte";
  import BlindsController from "./BlindsController/BlindsController.svelte";
  import BlindViewer from "./BlindsController/BlindViewer.svelte";
  import NextBlind from "./BlindsController/NextBlind.svelte";
  import data from "./data";

  let timeFromUser = data.timePerRound;
  let index = 0;
  let bigBlind = data.blinds[index];
  let smallBlind = bigBlind / 2;
  let nextBigBlind = data.blinds[index+1]
  let nextSmallBlind = nextBigBlind / 2;
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
      nextBigBlind += data.blinds[data.blinds.length - 1];

    } else {
      bigBlind = data.blinds[index];
      if (index > data.blinds.length - 2){
        nextBigBlind += data.blinds[data.blinds.length - 1];
      } 
      else{
        nextBigBlind = data.blinds[index+1];
      }
    }
    smallBlind = Math.round(bigBlind / 2);
    nextSmallBlind = Math.round(nextBigBlind / 2);
    timeFromUser = data.timePerRound;
  }
</script>

<style>
  main {
    text-align: center;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 50px;
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
  <NextBlind {nextBigBlind} {nextSmallBlind}/>
</main>
