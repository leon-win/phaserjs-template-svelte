import { Scene } from "phaser";

import { EventBus } from "../EventBus";

export class GamePlay extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  sceneTitle: Phaser.GameObjects.Text;

  constructor() {
    super("GamePlay");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "background",
    );
    this.background.setAlpha(0.5);

    this.sceneTitle = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Play", {
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
