export class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("conso_jetpack_logo", "conso-jetpack-logo.png");
  }

  create() {
    //  A global value to store the highscore in
    // this.registry.set("highscore", 0);

    this.scene.start("Preloader");

    // this.input.once("pointerdown", () => {
    //   this.scene.start("Preloader");
    // });
  }
}
