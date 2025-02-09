import {
  constantKeyAnimations,
  environmentBackgrounds,
  jetpackOptions,
} from "../constants";
import {
  CharacterOptionsType,
  EnvironmentOptionsType,
  JetpackOptionsType,
} from "../types";

export class Preloader extends Phaser.Scene {
  loadingBar!: Phaser.GameObjects.Graphics;
  loadingText!: Phaser.GameObjects.Text;
  character: CharacterOptionsType;
  environment: EnvironmentOptionsType;
  jetpack: JetpackOptionsType;

  constructor(
    character: CharacterOptionsType,
    environment: EnvironmentOptionsType,
    jetpack: JetpackOptionsType
  ) {
    super("Preloader");
    this.character = character;
    this.environment = environment;
    this.jetpack = jetpack;
  }

  //   NOTE : Usage of init
  // Receive Data: It can accept data passed when switching scenes.
  // Initialize Variables: Used to set up scene-wide variables before assets are loaded.
  // Prepare Game State: Can reset states or set up configurations.

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "conso_jetpack_logo"
    );

    // Create loading bar and text
    const width = 400;
    const height = 30;
    const x = (this.cameras.main.width - width) / 2;
    const y = (this.cameras.main.height + 250) / 2;

    // Background and divisions
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0xffffff, 1);
    this.loadingBar.fillRoundedRect(x - 2, y - 2, width + 4, height + 4, 5);

    // Add divisions for 4 steps
    for (let i = 1; i < 3; i++) {
      this.loadingBar.fillStyle(0xffffff, 1);
      this.loadingBar.fillRect(x + (width * i) / 3 - 1, y - 2, 2, height + 4);
    }

    // Add text
    this.loadingText = this.add
      .text(this.cameras.main.width / 2, y + 50, "Loading...", {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Progress handler
    this.load.on("progress", (value: number) => {
      const barWidth = width * value;
      this.loadingBar.fillStyle(0xffffff, 1);
      this.loadingBar.fillRoundedRect(x, y, barWidth, height, 5);

      const steps = ["Initializing", "Loading Assets", "Loading Game"];
      const currentStep = steps[Math.min(Math.floor(value * 3), 2)];
      this.loadingText.setText(`${currentStep}... ${Math.round(value * 100)}%`);
    });
  }

  preload() {
    // this.load.setBaseURL("https://cdn.phaserfiles.com/v385");
    //  Load the https://labs.phaser.io/assets for the game - Replace with the path to your own https://labs.phaser.io/assets

    // GAME ASSETS
    // Load Fonts
    this.load.font({ key: "jersey", url: "assets/fonts/Jersey10.ttf" });
    this.load.font({ key: "handjet", url: "assets/fonts/Handjet.ttf" });

    // Remove Existing Textures
    ["bg_b1", "bg_b2", "bg_b3", "bg_ground", "bg_last"].forEach((key) => {
      if (this.textures.exists(key)) {
        this.textures.remove(key);
      }
    });

    // Preload Power-Up Characters
    ["armor", "flash", "angel"].forEach((character) => {
      this.load.spritesheet(character, `assets/characters/${character}.png`, {
        frameWidth: 190,
        frameHeight: 220,
      });
    });

    // Power-Up Transition
    this.load.spritesheet("transition", "assets/misc/transition.png", {
      frameWidth: 190,
      frameHeight: 220,
    });

    // Misc Assets
    this.load.spritesheet("coin", "assets/misc/coin.png", {
      frameWidth: 480,
      frameHeight: 480,
    });
    this.load.image("coin_icon", "assets/misc/coin_icon.png");
    this.load.image("bar_1", "assets/misc/progress_bar/bar_1.png");
    this.load.image("bar_2", "assets/misc/progress_bar/bar_2.png");

    // Obstacle Assets
    this.load.spritesheet(
      "laser_left",
      "assets/obstacles/laser/laser_left.png",
      { frameWidth: 160, frameHeight: 160 }
    );
    this.load.spritesheet(
      "laser_right",
      "assets/obstacles/laser/laser_right.png",
      { frameWidth: 160, frameHeight: 160 }
    );
    this.load.spritesheet("laser", "assets/obstacles/laser/laser.png", {
      frameWidth: 1627,
      frameHeight: 172,
    });

    // Rocket
    this.load.spritesheet(
      "rocket_warning",
      "assets/obstacles/rocket/rocket_warning.png",
      {
        frameWidth: 100,
        frameHeight: 95,
      }
    );
    this.load.spritesheet("rocket", "assets/obstacles/rocket/rocket.png", {
      frameWidth: 225,
      frameHeight: 120,
    });
    this.load.spritesheet(
      "zapper_90",
      "assets/obstacles/zapper/zapper_90.png",
      {
        frameWidth: 190,
        frameHeight: 540,
      }
    );

    // Boxes
    this.load.spritesheet("mystery_box", "assets/misc/mystery_box.png", {
      frameWidth: 120,
      frameHeight: 120,
    });
    this.load.spritesheet("power_up", "assets/misc/power_up.png", {
      frameWidth: 120,
      frameHeight: 120,
    });

    // Platform
    this.load.image("platform", "assets/platform.png");

    // Load sound buttons
    this.load.image("sound_on", "assets/misc/sound/sound-on.svg");
    this.load.image("sound_off", "assets/misc/sound/no-sound.svg");

    // Audios
    this.load.audio("game_background", ["assets/sounds/game-bg-music.wav"]);
    this.load.audio("coin_collect", ["assets/sounds/coin-collect.wav"]);
    this.load.audio("mystery_box_collect", [
      "assets/sounds/mystery-box-collect.wav",
    ]);

    // obstacles audios
    this.load.audio("rocket_warning", [
      "assets/sounds/obstacle-rocket-warning.wav",
    ]);
    this.load.audio("rocket_launch", [
      "assets/sounds/obstacle-rocket-flyby.wav",
    ]);
    this.load.audio("laser_active", [
      "assets/sounds/obstacle-laser-active.wav",
    ]);
    this.load.audio("rocket_hit", ["assets/sounds/rocket-hit-game-over.mp3"]);
    this.load.audio("zapper_hit", ["assets/sounds/zapper-hit-game-over.wav"]);
    this.load.audio("laser_hit", ["assets/sounds/laser-hit-game-over.wav"]);

    // power ups transition audios
    this.load.audio("flash_transition", ["assets/sounds/flash-transition.wav"]);
    this.load.audio("angel_transition", ["assets/sounds/angel-transition.mp3"]);
    this.load.audio("armor_transition", ["assets/sounds/armor-transition.wav"]);

    // jetpack audios
    this.load.audio("jetpack_normal", [
      "assets/sounds/jetpack-normal-sound.wav",
    ]);
    this.load.audio("jetpack_heli", ["assets/sounds/jetpack-heli-sound.mp3"]);
    this.load.audio("jetpack_rocket", [
      "assets/sounds/jetpack-rocket-sound.mp3",
    ]);

    // Load Environment
    this.loadEnvironmentAssets();

    // Load Character and Jetpack
    this.loadCharacterAssets();

    console.log(
      "Preloading game scene :",
      this.character,
      this.environment,
      this.jetpack
    );
  }

  create() {
    //  When all the https://labs.phaser.io/assets have loaded, it's often worth creating global objects here that the rest of the game can use.

    this.createAnimations();
    //  When all the https://labs.phaser.io/assets are loaded go to the next scene.
    //  We can go there immediately via: this.scene.start("MainMenu");
    //  Or we could use a Scene transition to fade between the two scenes:

    this.scene.transition({
      target: "MainGame",
      // duration: 1000,
      moveBelow: false,
      onUpdate: (progress: any) => {
        this.cameras.main.setAlpha(1 - progress);
      },
    });

    //  When the transition completes, it will move automatically to the MainMenu scene
  }

  loadEnvironmentAssets() {
    const assets = environmentBackgrounds[this.environment] || [];
    assets.forEach((asset, index) => {
      const key = ["bg_b1", "bg_b2", "bg_b3", "bg_ground", "bg_last"][index];
      this.load.image(key, `assets/environments/${asset}.png`);
    });
  }

  loadCharacterAssets() {
    const jetpacks = jetpackOptions;
    if (jetpacks.includes(this.jetpack)) {
      this.load.spritesheet(
        `${this.character}_${this.jetpack}`,
        `assets/characters/${this.character}_${this.jetpack}.png`,
        {
          frameWidth: 190,
          frameHeight: 220,
        }
      );
    } else {
      console.warn("Jetpack not recognized");
    }
  }

  createAnimations() {
    // Create animations for default character
    this.anims.create({
      key: `${this.character}_${this.jetpack}_run`,
      frames: this.anims.generateFrameNumbers(
        `${this.character}_${this.jetpack}`,
        {
          start: 4,
          end: 7,
        }
      ),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `${this.character}_${this.jetpack}_fly`,
      frames: this.anims.generateFrameNumbers(
        `${this.character}_${this.jetpack}`,
        {
          start: 0,
          end: 3,
        }
      ),
      frameRate: 10,
      repeat: -1,
    });

    // constant key animations
    constantKeyAnimations.forEach(
      ({ key, texture, start, end, frameRate, repeat }) => {
        this.anims.create({
          key,
          frames: this.anims.generateFrameNumbers(texture, {
            start,
            end,
          }),
          frameRate,
          repeat,
        });
      }
    );
  }
}
