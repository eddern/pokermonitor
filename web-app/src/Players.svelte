<script>
  import App from "./App.svelte";
  import { text } from "svelte/internal";

  let players = [];
  let name = "";
  let buyIn = 0;
  let totalBuyIn = 0;

  const addPlayer = () => {
    players = [...players, { name, buyIn }];
    name = "";
    buyIn = 0;
  };

  const deletePlayer = (name) => {
    players = players.filter((x) => x.name !== name);
  };
</script>

<style>

</style>

<div>
  <h3>Players</h3>
  <input type="text" bind:value={name} placeholder="Player name.." />
  <input type="text" bind:value={buyIn} placeholder="Buy in" />
  <button on:click={addPlayer}>Add player</button>
  <ul>
    {#each players as player}
      <li on:click={deletePlayer(player.name)}>
        {player.name} (buy in {player.buyIn})
      </li>
    {/each}
  </ul>
</div>
