import { Scene } from "phaser";

import { EventBus } from "../EventBus";

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  sceneTitle: Phaser.GameObjects.Text;

  constructor() {
    super("GameOver");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    this.background = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "background",
    );
    this.background.setAlpha(0.5);

    this.sceneTitle = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Game over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.emit("current-scene-ready", this);
  }
}
