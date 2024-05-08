import { GameObjects, Scene } from "phaser";
import { writable } from "svelte/store";

import { EventBus } from "../EventBus";

export const logoPosition = writable({ x: 0, y: 0 });

export class GameMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  logoTween: Phaser.Tweens.Tween;
  sceneTitle: GameObjects.Text;
  menuItemGamePlay: GameObjects.Text;
  menuItemGameOver: GameObjects.Text;

  constructor() {
    super("GameMenu");
  }

  create() {
    this.background = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "background",
    );

    this.logo = this.add.image(0, 0, "logo").setDepth(10);

    this.logoTween = this.tweens
      .add({
        targets: this.logo,
        repeat: -1,
        yoyo: true,
        paused: true,
        x: {
          from: this.logo.width / 2,
          to: this.scale.width - this.logo.width / 2,
          duration: 4000,
        },
        y: {
          from: this.scale.height - this.logo.height / 2,
          to: this.logo.height / 2,
          duration: 1220,
          ease: "Sine.easeOut",
        },
        onUpdate: () => {
          logoPosition.set({
            x: Math.floor(this.logo.x),
            y: Math.floor(this.logo.y),
          });
        },
      })
      .seek(2000);

    this.sceneTitle = this.add
      .text(this.scale.width / 2, 460, "Main menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(20);

    this.menuItemGamePlay = this.add
      .text(this.scale.width / 2, 520, "Play", {
        fontFamily: "Arial Black",
        fontSize: 32,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(20)
      .setInteractive({ cursor: "pointer" })
      .on("pointerover", () => {
        this.menuItemGamePlay.setColor("#ff0000");
      })
      .on("pointerout", () => {
        this.menuItemGamePlay.setColor("#ffffff");
      })
      .on("pointerdown", () => {
        this.scene.start("GamePlay");
      });

    this.menuItemGameOver = this.add
      .text(this.scale.width / 2, 560, "Game over", {
        fontFamily: "Arial Black",
        fontSize: 32,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(20)
      .setInteractive({ cursor: "pointer" })
      .on("pointerover", () => {
        this.menuItemGameOver.setColor("#ff0000");
      })
      .on("pointerout", () => {
        this.menuItemGameOver.setColor("#ffffff");
      })
      .on("pointerdown", () => {
        this.scene.start("GameOver");
      });

    EventBus.emit("current-scene-ready", this);
  }

  toggleLogoMovement() {
    if (this.logoTween.isPlaying()) {
      this.logoTween.pause();
    } else {
      this.logoTween.play();
    }
  }
}
