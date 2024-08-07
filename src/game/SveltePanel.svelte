<script lang="ts">
  import type { TPhaserRef } from "../game/PhaserGame.svelte";
  import type { GameMenu } from "../game/scenes/GameMenu";
  import { logoPosition } from "../game/scenes/GameMenu";

  export let phaserRef: TPhaserRef = { game: null, scene: null };

  $: gameWidth = phaserRef.game?.config.width;
  $: gameHeight = phaserRef.game?.config.height;
  $: currentScene = phaserRef.scene;
  $: isGameMenuScene = currentScene?.scene.key === "GameMenu";

  const changeScene = (sceneKey: string) => {
    if (currentScene) {
      currentScene.scene.start(sceneKey);
    }
  };

  const toggleSveltePanel = () => {
    document
      .getElementById("svelte-controls")
      ?.classList.toggle("svelte-controls--closed");
  };

  const toggleLogoMovement = () => {
    const scene = currentScene as GameMenu;

    if (isGameMenuScene) {
      scene.toggleLogoMovement();
    }
  };

  const addSprite = () => {
    if (currentScene) {
      // Add more stars
      const x = Phaser.Math.Between(64, currentScene.scale.width - 64);
      const y = Phaser.Math.Between(64, currentScene.scale.height - 64);

      //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
      const star = currentScene.add.sprite(x, y, "star");

      //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
      //  You could, of course, do this from within the Phaser Scene code, but this is just an example
      //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
      currentScene.add.tween({
        targets: star,
        duration: 500 + Math.random() * 1000,
        alpha: 0,
        yoyo: true,
        repeat: -1,
      });
    }
  };
</script>

<div
  class="svelte-controls svelte-controls--closed"
  id="svelte-controls"
  style="--gameWidth:{gameWidth}; --gameHeight:{gameHeight}"
>
  <h2 class="header" on:click={() => toggleSveltePanel()}>
    <img
      class="header__svelte-logo"
      src="https://github.com/sveltejs/branding/raw/master/svelte-logo.svg"
      alt="Svelte logo"
    />
    <span class="header__svelte-text">Svelte panel</span>
  </h2>

  <main>
    <nav>
      <h3>Scenes</h3>

      <ul class="menu">
        <li>
          <button class="button" on:click={() => changeScene("GameMenu")}>
            Main menu
            <code>(/scenes/GameMenu.ts)</code>
          </button>
        </li>

        <li>
          <button class="button" on:click={() => changeScene("GamePlay")}>
            Play
            <code>(/scenes/GamePlay.ts)</code>
          </button>
        </li>

        <li>
          <button class="button" on:click={() => changeScene("GameOver")}>
            Game over
            <code>(/scenes/GameOver.ts)</code>
          </button>
        </li>
      </ul>
    </nav>

    {#if currentScene}
      <div>
        <h3>Current scene</h3>

        <dl class="info-list">
          <dt>Scene key:</dt>
          <dd>{currentScene.scene.key}</dd>

          {#if isGameMenuScene}
            <dt>Logo position:</dt>
            <dd><pre>{JSON.stringify($logoPosition, null, 2)}</pre></dd>
          {/if}
        </dl>
      </div>
    {/if}

    <div>
      <h3>Actions</h3>

      <ul class="menu">
        {#if isGameMenuScene}
          <li>
            <button class="button" on:click={toggleLogoMovement}>
              Toggle logo movement
            </button>
          </li>
        {/if}

        <li>
          <button class="button" on:click={addSprite}>Add new sprite</button>
        </li>
      </ul>
    </div>
  </main>
</div>

<style>
  .svelte-controls {
    position: absolute;
    left: calc(50vw - ((var(--gameWidth) / 2) * 1px));
    top: calc(50vh - ((var(--gameHeight) / 2) * 1px));
    box-sizing: border-box;
    height: calc(var(--gameHeight) * 1px);
    padding: 10px;
    background-color: #33333350;

    & .header {
      display: flex;
      align-items: center;
      margin: 0;
      cursor: pointer;
    }

    & .header__svelte-logo {
      height: 2em;
    }

    & .header__svelte-text {
      margin-left: 10px;
    }

    & .menu {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    & .menu .button {
      width: 200px;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #fff;
      background-color: #000000;
      color: #fff;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border: 1px solid #0ec3c9;
        color: #0ec3c9;
      }

      &:active {
        background-color: #0ec3c9;
      }
    }
  }

  .svelte-controls--closed {
    height: auto;
    background-color: unset;

    & .header__svelte-text,
    & main {
      display: none;
    }
  }

  .info-list dt {
    font-weight: bold;
    margin-top: 1rem;
  }

  .info-list dd,
  .info-list dd pre {
    margin: 0;
    font-family: monospace;
    font-size: 0.75rem;
  }
</style>
