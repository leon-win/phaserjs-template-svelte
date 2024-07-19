<script lang="ts">
  import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";
  import SveltePanel from "../game/SveltePanel.svelte";

  //  References to the PhaserGame component (game and scene are exposed)
  let phaserRef: TPhaserRef = { game: null, scene: null };
</script>

<div id="app">
  <PhaserGame bind:phaserRef />
  <SveltePanel bind:phaserRef />
</div>

<style>
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }
</style>
