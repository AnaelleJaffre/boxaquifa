import * as Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.player = this.add.circle(400, 300, 10, 0xffffff);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.inventoryOpen = false;

    window.addEventListener("keydown", (e) => {
      if (e.key === "i") {
        this.inventoryOpen = !this.inventoryOpen;
        document.getElementById("inventory").classList.toggle("hidden");
      }
    });
  }

  update() {
    const speed = 5;

    if (this.cursors.left.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown) this.player.x += speed;
    if (this.cursors.up.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown) this.player.y += speed;
  }
}