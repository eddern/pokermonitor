<script>
  export let bigBlind;
  export let smallBlind;
</script>

<style>
  .flexContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 200px;
  }
  .mainWrapper {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>

<div class="mainWrapper">
  <div class="flexContainer">
    <h3>Small Blind</h3>
    <p>{smallBlind}</p>
  </div>
  <div class="flexContainer">
    <h3>Big Blind</h3>
    <p>{bigBlind}</p>
  </div>
</div>
