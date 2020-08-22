<script>
  import { getContext } from 'svelte';
  import Timer from './Timer.svelte';
  import BlindsController from './BlindsController/BlindsController.svelte';
  import BlindViewer from './BlindsController/BlindViewer.svelte';
  import data from './data';

  let timeFromUser = data.timePerRound;
  let index = 0;
  let bigBlind = data.blinds[index];
  let smallBlind = bigBlind / 2;
  let isFullscreen = false;

  const incLevel = () => {
    index++;
    if (index > data.blinds.length - 1) {
      console.log(
        `Last blind reached, continuing on ${
          data.blinds[data.blinds.length - 1]
        } increments.`,
        'background:red'
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

  function openFullscreen() {
    const elem = document.getElementById('mainContainer');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  $: {
    console.log('isFullscreen', isFullscreen);
  }
  document.onfullscreenchange = () => (isFullscreen = !isFullscreen);

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  const toggleFullscreen = () =>
    isFullscreen ? closeFullscreen() : openFullscreen();

  document.addEventListener('keypress', e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      closeFullscreen();
    }
  });
</script>

<style>
  main {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
  }
  .fullscreen-btn:hover {
    transform: scale(1.2);
  }
  .fullscreen-btn {
    padding: 30px;
    color: white;
  }
  .exit-fullscreen-btn:hover {
    transform: scale(0.8);
  }
  .exit-fullscreen-btn {
    padding: 30px;
    color: white;
  }

  span {
    font-size: 2rem;
    transition: transform 200ms ease;
  }
  button {
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: 0;
  }

  button:hover {
    cursor: pointer;
  }
</style>

<main id="mainContainer">
  <button on:click={toggleFullscreen}>
    {#if isFullscreen}
      <span class="material-icons exit-fullscreen-btn">
        fullscreen_exit
      </span>
    {:else}
      <span class="material-icons fullscreen-btn">fullscreen</span>
    {/if}
  </button>
  <Timer {timeFromUser} {incLevel} />
  <BlindViewer {bigBlind} {smallBlind} />
</main>
