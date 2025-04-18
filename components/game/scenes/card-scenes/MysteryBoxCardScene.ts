//@ts-nocheck
import { EventBus } from "../../EventBus";
import { Scene } from "phaser";

export class MysteryBoxCardScene extends Scene {
  character: string;
  environment: string;
  jetpack: string;
  player: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
  backgroundLayers: Phaser.GameObjects.TileSprite[] = [];
  exit: Phaser.GameObjects.Image;
  mysteryBoxCount: number = 0;

  constructor() {
    super({ key: "MysteryBoxCardScene" });
  }

  init(data: {
    mysteryBoxCount: number;
    character: string;
    environment: string;
    jetpack: string;
  }) {
    this.mysteryBoxCount = data.mysteryBoxCount;
    this.character = data.character;
    this.environment = data.environment;
    this.jetpack = data.jetpack;
  }

  preload() {
    // load the font
    this.load.font({
      key: "jersey",
      url: "assets/fonts/Jersey10.ttf",
    });
    this.load.font({
      key: "handjet",
      url: "assets/fonts/Handjet.ttf",
    });

    // DONE : load the environment
    switch (this.environment) {
      case "city":
        console.log("Loading city environment");
        this.load.image("bg_b1", "assets/environments/bg_citylinet_b1.png");
        this.load.image("bg_b2", "assets/environments/bg_citylinet_b2.png");
        this.load.image("bg_b3", "assets/environments/bg_citylinet_b3.png");
        this.load.image(
          "bg_ground",
          "assets/environments/bg_citylinet_ground.png"
        );
        this.load.image("bg_last", "assets/environments/bg_citylinet_last.png");

        break;
      case "forest":
        console.log("Loading forest environment");
        this.load.image("bg_b1", "assets/environments/bg_forest_b1.png");
        this.load.image("bg_b2", "assets/environments/bg_forest_b2.png");
        this.load.image("bg_b3", "assets/environments/bg_forest_b3.png");
        this.load.image(
          "bg_ground",
          "assets/environments/bg_forest_ground.png"
        );
        this.load.image("bg_last", "assets/environments/bg_forest_last.png");
        break;
      case "mars":
        console.log("Loading mars environment");
        this.load.image("bg_b1", "assets/environments/bg_mars_b1.png");
        this.load.image("bg_b2", "assets/environments/bg_mars_b2.png");
        this.load.image("bg_b3", "assets/environments/bg_mars_b3.png");
        this.load.image("bg_ground", "assets/environments/bg_mars_ground.png");
        this.load.image("bg_last", "assets/environments/bg_mars_last.png");
        break;
      default:
        console.warn("Environment not recognized");
        break;
    }

    // DONE : load the character
    switch (this.character) {
      case "ninja":
        switch (this.jetpack) {
          case "jetpack":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/ninja_jetpack.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          case "rocket":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/ninja_rocket.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          case "heli":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/ninja_heli.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          default:
            console.warn("Jetpack not recognized");
            break;
        }
      case "samurai":
        switch (this.jetpack) {
          case "jetpack":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/samurai_jetpack.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          case "rocket":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/samurai_rocket.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          case "heli":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/samurai_heli.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          default:
            console.warn("Jetpack not recognized");
            break;
        }
      case "og":
        switch (this.jetpack) {
          case "jetpack":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/og_jetpack.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          case "rocket":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/og_rocket.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
            break;
          case "heli":
            this.load.spritesheet(
              `${this.character}_${this.jetpack}`,
              "assets/characters/og_heli.png",
              {
                frameWidth: 190,
                frameHeight: 220,
              }
            );
          default:
            console.warn("Jetpack not recognised");
            break;
        }
      default:
        console.warn("Character not recognised");
        break;
    }

    // load the exit button
    this.load.image("exit", "assets/misc/exit.png");

    // load the mystery box
    this.load.spritesheet("mystery_box", "assets/misc/mystery_box.png", {
      frameWidth: 120,
      frameHeight: 120,
    });
  }

  create() {
    console.log(
      // load character and jetpack to console which should be displayed on the screen
      `Creating Game Over Scene. ${this.character} and ${this.jetpack} are the characters and jetpacks respectively.`
    );

    // empty background layers array
    this.backgroundLayers = [];

    // Create background layers
    this.backgroundLayers.push(
      this.add.tileSprite(900, 500, 1800, 1000, "bg_last").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_b3").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_b2").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_b1").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_ground").setScrollFactor(0)
    );

    //Add game over player
    this.player = this.physics.add
      .staticSprite(250, 240, `${this.character}_${this.jetpack}`)
      .setScale(0.8);
    this.player = this.physics.add
      .staticSprite(250, 370, `${this.character}_${this.jetpack}`)
      .setScale(0.8);
    this.player = this.physics.add
      .staticSprite(250, 500, `${this.character}_${this.jetpack}`)
      .setScale(0.8);
    this.player = this.physics.add
      .staticSprite(250, 630, `${this.character}_${this.jetpack}`)
      .setScale(0.8);
    this.player = this.physics.add
      .staticSprite(250, 760, `${this.character}_${this.jetpack}`)
      .setScale(0.8);

    // Add a black transparent rectangle to cover the background
    this.add.graphics().fillStyle(0x6a6a6a, 0.9).fillRect(0, 0, 1800, 1000);

    this.add.text(615, 200, "MYSTERY BOX COLLECTED", {
      fontSize: 70,
      color: "#FFFFFF",
      fontFamily: "handjet",
    });

    this.add.sprite(870, 400, "mystery_box", 0).setScale(1.5);

    this.add.text(840, 500, `x ${this.mysteryBoxCount}`, {
      fontSize: 65,
      color: "#FFD700",
      fontFamily: "jersey",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 10,
    });

    this.exit = this.add.image(880, 700, "exit").setInteractive();
    this.exit.on("pointerdown", () => {
      console.log("Exit button clicked");
    });

    EventBus.emit("current-scene-ready", this);
  }
}
