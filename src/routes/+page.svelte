<script lang="ts">
  import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";
  import SveltePanel from "../game/SveltePanel.svelte";

  //  References to the PhaserGame component (game and scene are exposed)
  let phaserRef: TPhaserRef = { game: null, scene: null };
</script>

<PhaserGame bind:phaserRef />
<SveltePanel bind:phaserRef />
