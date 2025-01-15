//@ts-nocheck
import { EventBus } from "../../EventBus";
import { Scene } from "phaser";

export class ResumeGameCardScene extends Scene {
  character: string;
  environment: string;
  jetpack: string;
  player: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
  backgroundLayers: Phaser.GameObjects.TileSprite[] = [];
  distanceTravelled: number;
  distanceText: Phaser.GameObjects.Text;
  coinCount: number;
  coinText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "ResumeGameCardScene" });
  }

  init(data: {
    character: string;
    environment: string;
    jetpack: string;
    distanceTravelled: number;
    coinCount: number;
  }) {
    this.coinCount = data.coinCount;
    this.distanceTravelled = data.distanceTravelled;
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
    // load the coin icon
    this.load.image("coin_icon", "assets/misc/coin_icon.png");

    // load the potion and free life icons
    this.load.image("potion", "assets/misc/potion.png");
    this.load.image("free_life", "assets/misc/free_life.png");

    //load the skip button
    this.load.image("skip", "assets/misc/skip.png");
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
    this.add.graphics().fillStyle(0x6a6a6a, 0.6).fillRect(0, 0, 1800, 1000);

    // Coin Counter
    this.add.image(860, 115, "coin_icon").setScale(0.15);
    this.coinText = this.add.text(900, 60, `${this.coinCount}`, {
      fontSize: "90px",
      color: "#FFD700",
      fontFamily: "jersey",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 10,
    });

    // Total Distance Graphic counter
    const distanceBG = this.add.graphics();
    distanceBG.fillStyle(0x6a6a6a, 0.8).fillRoundedRect(1300, 60, 335, 100, 10);

    this.add.text(1335, 70, "TOTAL DISTANCE", {
      fontSize: "28px",
      color: "#FFFFFF",
      lineSpacing: 0.5,
      fontFamily: "handjet",
    });

    this.distanceText = this.add.text(1335, 100, "0m", {
      fontSize: "48px",
      color: "#FFFFFF",
      fontFamily: "Jersey",
    });

    // Potion and Free life graphics
    const potionBG = this.add.graphics();
    potionBG.fillStyle(0x6a6a6a, 0.9).fillRoundedRect(560, 300, 680, 450, 10);
    this.add.text(670, 350, "Use Potions", {
      fontSize: 45,
      fontStyle: "bold",
      color: "#FFFFFF",
      fontFamily: "handjet",
    });
    this.add.image(750, 500, "potion");
    this.add.text(990, 350, "Free Life", {
      fontSize: 45,
      fontStyle: "bold",
      color: "#FFFFFF",
      fontFamily: "handjet",
    });
    this.add.image(1050, 500, "free_life");

    this.add.image(900, 650, "skip");

    EventBus.emit("current-scene-ready", this);
  }
}
