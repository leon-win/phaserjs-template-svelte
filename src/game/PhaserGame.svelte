<script context="module" lang="ts">
  import type { Game, Scene } from "phaser";

  export type TPhaserRef = {
    game: Game | null;
    scene: Scene | null;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { EventBus } from "./EventBus";
  import { StartGame } from "./main";

  export let phaserRef: TPhaserRef = { game: null, scene: null };

  onMount(() => {
    phaserRef.game = StartGame("phaser-container");

    EventBus.on("current-scene-ready", (sceneInstance: Scene) => {
      phaserRef.scene = sceneInstance;
    });
  });
</script>

<div id="phaser-container"></div>

<style>
  #phaser-container {
    line-height: 0; /* to avoid extra height due to the inner <canvas> element  */
  }
</style>
