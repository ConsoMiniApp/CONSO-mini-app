//@ts-nocheck
import { log } from "console";
import { GameObjects, Physics, Scene } from "phaser";
import {
  CharacterOptionsType,
  EnvironmentOptionsType,
  JetpackOptionsType,
} from "../types";
import {
  constantKeyAnimations,
  environmentBackgrounds,
  jetpackOptions,
} from "../constants";

export class MainGame extends Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  backgroundLayers: Phaser.GameObjects.TileSprite[] = [];
  character: CharacterOptionsType;
  environment: EnvironmentOptionsType;
  jetpack: JetpackOptionsType;
  inTransition: boolean = false;
  deviceWidth: number = window.innerWidth;
  // coin counter variables
  coinCount: number = 0;
  coinText!: Phaser.GameObjects.Text;
  // Distance tracking variables
  distanceTravelled: number = 0;
  distanceText!: Phaser.GameObjects.Text;
  //Mystery box count
  mysteryBoxCount: number = 0;
  // power up progress bar variables
  previous_character: CharacterOptionsType = CharacterOptionsType.Og;
  previous_jetpack: JetpackOptionsType = JetpackOptionsType.Jetpack;
  private progressBarBackground: Phaser.GameObjects.Image;
  private progressBarFill: Phaser.GameObjects.Image;
  private progressBarMaxWidth: number = 300;
  // TESTING : Will be rendered as per game mechanics
  coins: Phaser.Physics.Arcade.Group;
  powerup_boxes: Phaser.Physics.Arcade.Group;
  mystery_boxes: Phaser.Physics.Arcade.Group;
  zappers: Phaser.Physics.Arcade.Group;
  lasers: Phaser.Physics.Arcade.Group;
  rockets: Phaser.Physics.Arcade.Group;
  platform: Phaser.Physics.Arcade.Image;
  environmentList: string[] = ["forest", "city", "mars"];
  currentEnvironmentIndex: number = 0;
  environmentTimer!: Phaser.Time.TimerEvent;
  spawnTimer: Phaser.Time.TimerEvent;
  difficultyLevel: number = 1;
  laserActive: boolean = false;
  coinSpawnTimer: Phaser.Time.TimerEvent;
  // NOTE : Readonly means speed is hard coded and cannot be changed
  gameStartTime: number;
  readonly BEGINNER_SPEED = 9; // 8.33 m/s (0-2 mins)
  readonly AVERAGE_SPEED = 18; // 16.67 m/s (2-4 mins)
  readonly SKILLED_SPEED = 25; // Average of 20-25 m/s (4+ mins)
  currentGameSpeed = 9;
  readonly BASE_OBSTACLE_SPEED = -550;
  currentObstacleSpeed = -550;
  private lastZapperTime!: number;
  private lastRocketTime!: number;
  private lastLaserWarning!: number;
  powerupCount: number = 0;

  constructor(
    character: CharacterOptionsType,
    environment: EnvironmentOptionsType,
    jetpack: JetpackOptionsType
  ) {
    super({ key: "MainGame" });
    this.character = character;
    this.environment = environment;
    this.jetpack = jetpack;
  }

  init(data: { newGame: boolean }) {
    if (data.newGame) {
      this.resetGame();
    }
  }

  resetGame() {
    this.coinCount = 0;
    this.distanceTravelled = 0;
    this.mysteryBoxCount = 0;
    this.character = CharacterOptionsType.Og;
    this.environment = EnvironmentOptionsType.Forest;
    this.jetpack = JetpackOptionsType.Jetpack;
  }

  preload() {
    console.log(
      "Preloading game scene :",
      this.character,
      this.environment,
      this.jetpack
    );

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

    // Load Environment
    this.loadEnvironmentAssets();

    // Load Character and Jetpack
    this.loadCharacterAssets();
  }

  create() {
    console.log("Creating game scene");

    // empty background layers array
    this.backgroundLayers = [];

    // Create city background layers
    this.backgroundLayers.push(
      this.add.tileSprite(900, 500, 1800, 1000, "bg_last").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_b3").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_b2").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_b1").setScrollFactor(0),
      this.add.tileSprite(900, 500, 1800, 1000, "bg_ground").setScrollFactor(0)
    );
    this.gameStartTime = Date.now();
    this.createAnimations();

    // Coin Counter
    this.add.image(160, 115, "coin_icon").setScale(0.15);
    this.coinText = this.add.text(210, 60, `${this.coinCount}`, {
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

    // Timer to increment distance every 'delay' milliseconds
    this.time.addEvent({
      delay: 200, // 1000 - 1m/s speed  , 200 - 5m/s speed, counter - 1m/s
      callback: () => {
        this.updateDistance();
      },
      loop: true,
    });

    // Create the progress bar background (image with borders)
    this.progressBarBackground = this.add
      .image(800, 80, "bar_1")
      .setOrigin(0, 0)
      .setVisible(false);
    this.progressBarFill = this.add
      .image(800, 80, "bar_2")
      .setOrigin(0, 0)
      .setVisible(false)
      .setCrop(0, 0, this.progressBarMaxWidth, 60);

    // Add player
    this.player = this.physics.add
      .sprite(650, 200, `${this.character}_${this.jetpack}`)
      .setScale(0.7);
    this.player.setCollideWorldBounds(true);
    // this.player.body.setSize(
    //     this.player.width * 0.8,
    //     this.player.height * 0.8
    // );

    // DYNAMIC ASSETS : Add coins, mystery box, powerup box and their overlaps
    this.coins = this.physics.add.group();
    this.spawnCoins(800, 840, 200, 250);

    // @ts-ignore
    this.coins.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
      //@ts-ignore
      child.body.setAllowGravity(false);
      child.setScale(0.14);
      child.setVelocityX(-550);
    });

    // add overlap between player and coins
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      undefined,
      this
    );

    // Add Mystery Box
    this.mystery_boxes = this.physics.add.group();
    this.mystery_boxes.create(1300, 840, "mystery_box");
    this.mystery_boxes.create(4000, 840, "mystery_box");

    // @ts-ignore
    this.mystery_boxes.children.iterate((child: any) => {
      child.body.setAllowGravity(false);
      child.setScale(0.85);
      child.setVelocityX(this.currentObstacleSpeed);
      child.anims.play("mystery_box_animation", true);
    });

    this.physics.add.overlap(
      this.player,
      this.mystery_boxes,
      this.collectMysteryBox,
      undefined,
      this
    );

    // Add Powerup Box

    this.powerupCount = 0;
    this.powerup_boxes = this.physics.add.group();
    this.powerup_boxes.create(1700, 840, "power_up");
    this.powerup_boxes.create(6400, 840, "power_up");
    this.powerup_boxes.create(12200, 840, "power_up");

    // @ts-ignore
    this.powerup_boxes.children.iterate((child: any) => {
      child.body.setAllowGravity(false);
      child.setScale(0.85);
      child.setVelocityX(this.currentObstacleSpeed);
      child.anims.play("power_up_animation", true);
    });

    this.physics.add.overlap(
      this.player,
      this.powerup_boxes,
      this.collectPowerupBox,
      undefined,
      this
    );

    // Initialize physics groups first
    this.zappers = this.physics.add.group();
    this.lasers = this.physics.add.group();
    this.rockets = this.physics.add.group();

    // Set up collisions/overlaps
    this.physics.add.overlap(
      this.player,
      this.zappers,
      //@ts-ignore
      this.hitZapper,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.lasers,
      this.hitLaser,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.rockets,
      this.hitRocket,
      undefined,
      this
    );

    this.time.addEvent({
      delay: 1000, // 1 second
      callback: this.spawnObstacles,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 30000, //30 seconds
      callback: this.increaseDifficulty,
      callbackScope: this,
      loop: true,
    });

    this.difficultyLevel = 1;

    // Add platform for player to collide with
    this.platform = this.physics.add.image(0, 500, "platform");
    this.platform.setVisible(false);
    this.platform.setCollideWorldBounds(true);
    this.platform.setOrigin(0, 0);
    this.physics.add.collider(this.player, this.platform);

    // Setup environment transition
    this.setupEnvironmentTransition();
  }

  update() {
    this.updateGameSpeedByTime();
    this.backgroundLayers.forEach((layer, index) => {
      if (index === 0) {
        layer.tilePositionX += 0;
      } else {
        // Convert m/s to game units
        const gameSpeedUnit = this.currentGameSpeed / 4.38; // Scale factor to match original game units
        layer.tilePositionX += gameSpeedUnit + index * gameSpeedUnit;
      }
    });

    // Player movement - running, flying
    // @ts-ignore
    if (this.player.body.blocked.down) {
      if (!this.inTransition) {
        this.player.anims.play(`${this.character}_${this.jetpack}_run`, true); // Play running animation
      }
    }

    const isPointerDown = this.input.activePointer.isDown;
    const isOnGround = this.player.body.onFloor();

    if (isPointerDown) {
      // Keep setting upward velocity while pointer is held down
      this.player.setVelocityY(-900);
      if (!this.inTransition) {
        this.player.anims.play(`${this.character}_${this.jetpack}_fly`, true);
      }
    }
    if (isOnGround && !isPointerDown) {
      // Simply check if pointer is not down
      if (!this.inTransition) {
        this.player.anims.play(`${this.character}_${this.jetpack}_run`, true);
      }
    }
  }

  // Add these new methods to the MainGame class
  setupEnvironmentTransition() {
    this.environmentTimer = this.time.addEvent({
      delay: 60000, // 60 seconds
      callback: this.changeEnvironment,
      callbackScope: this,
      loop: true,
    });
  }

  async changeEnvironment() {
    this.currentEnvironmentIndex =
      (this.currentEnvironmentIndex + 1) % this.environmentList.length;
    const nextEnvironment = this.environmentList[this.currentEnvironmentIndex];
    await this.loadNewEnvironment(nextEnvironment);

    this.backgroundLayers.forEach((layer, index) => {
      const textureKeys = ["bg_last", "bg_b3", "bg_b2", "bg_b1", "bg_ground"];
      layer.setTexture(textureKeys[index]);
    });
  }

  // Environment Transition with fade effect
  //   async changeEnvironment() {
  //     // Create fade effect
  //     const fade = this.add.graphics();
  //     fade.fillStyle(0x000000, 1);
  //     fade.fillRect(
  //       0,
  //       0,
  //       this.game.config.width as number,
  //       this.game.config.height as number
  //     );
  //     fade.setDepth(999);
  //     fade.alpha = 0;

  //     // Fade out
  //     await new Promise<void>((resolve) => {
  //       this.tweens.add({
  //         targets: fade,
  //         alpha: 1,
  //         duration: 100,
  //         onComplete: () => resolve(),
  //       });
  //     });

  //     // Change environment
  //     this.currentEnvironmentIndex =
  //       (this.currentEnvironmentIndex + 1) % this.environmentList.length;
  //     const nextEnvironment = this.environmentList[this.currentEnvironmentIndex];
  //     await this.loadNewEnvironment(nextEnvironment);

  //     // Update background layers
  //     this.backgroundLayers.forEach((layer, index) => {
  //       const textureKeys = ["bg_last", "bg_b3", "bg_b2", "bg_b1", "bg_ground"];
  //       layer.setTexture(textureKeys[index]);
  //     });

  //     // Fade in
  //     this.tweens.add({
  //       targets: fade,
  //       alpha: 0,
  //       duration: 100,
  //       onComplete: () => fade.destroy(),
  //     });
  //   }

  async loadNewEnvironment(envName: string) {
    // Remove existing textures
    ["bg_b1", "bg_b2", "bg_b3", "bg_ground", "bg_last"].forEach((key) => {
      if (this.textures.exists(key)) {
        this.textures.remove(key);
      }
    });

    // Load new environment assets
    const assets =
      environmentBackgrounds[envName as EnvironmentOptionsType] || [];
    const loadPromises = assets.map((asset, index) => {
      const key = ["bg_b1", "bg_b2", "bg_b3", "bg_ground", "bg_last"][index];
      return new Promise<void>((resolve, reject) => {
        this.load.image(key, `assets/environments/${asset}.png`);
        this.load.once(`filecomplete-image-${key}`, resolve);
        this.load.once(`loaderror`, reject);
      });
    });

    this.load.start();
    await Promise.all(loadPromises);
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

  startPowerUpTransition(
    powerUpCharacter: CharacterOptionsType,
    currentCharacter: CharacterOptionsType,
    currentJetpack: JetpackOptionsType
  ) {
    this.previous_character = currentCharacter;
    this.previous_jetpack = currentJetpack;

    if (this.inTransition) return;
    // Play transition animation - fire burst one
    this.inTransition = true; // running animation will be paused
    this.player.setTexture("transition");
    this.player.play("player_transition");

    // Show the progress bar
    this.progressBarBackground.setVisible(true);
    this.progressBarFill.setVisible(true);

    // show power up character
    this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      console.log("Changing to ", powerUpCharacter);
      this.character = powerUpCharacter;
      this.jetpack = JetpackOptionsType.None;
      this.player.setTexture(powerUpCharacter);
      this.inTransition = false;
    });

    // Progress Bar Simulation
    let progress = 1;
    const timer = this.time.addEvent({
      delay: 300,
      callback: () => {
        progress -= 0.05; // Reduce progress
        this.updateProgressBar(progress);

        if (progress <= 0) {
          timer.remove(); // Stop when empty
          // change to previous character
          this.character = this.previous_character;
          this.jetpack = this.previous_jetpack;
          this.player.setTexture(`${this.character}_${this.jetpack}`);
        }
      },
      loop: true,
    });
  }

  updateProgressBar(progress: number) {
    // Clamp progress between 0 and 1
    progress = Phaser.Math.Clamp(progress, 0, 1);

    const newWidth = progress * this.progressBarMaxWidth;
    this.progressBarFill.setCrop(0, 0, newWidth, 60);

    // Hide progress bar background when done
    if (progress <= 0) {
      this.progressBarBackground.setVisible(false);
      this.progressBarFill.setVisible(false);
    }
  }

  updateDistance() {
    // Calculate distance based on current speed (5 updates per second due to 200ms delay)
    const distanceIncrement = this.currentGameSpeed / 5; // Convert speed (m/s) to distance per update
    this.distanceTravelled += distanceIncrement;
    this.distanceText.setText(`${Math.floor(this.distanceTravelled)}m`);
  }

  updateGameSpeedByTime() {
    const elapsedMinutes = (Date.now() - this.gameStartTime) / 60000; // Convert to minutes
    if (elapsedMinutes >= 4) {
      this.currentGameSpeed = this.SKILLED_SPEED;
    } else if (elapsedMinutes >= 2) {
      this.currentGameSpeed = this.AVERAGE_SPEED;
    } else {
      this.currentGameSpeed = this.BEGINNER_SPEED;
    }
  }

  collectCoin(player: any, coin: any) {
    coin.disableBody(true, true);

    this.coinCount += 1;
    this.coinText.setText(`${this.coinCount}`);
  }

  spawnCoins(xStart: number, y: number, count: number, spacing: number) {
    for (let i = 0; i < count; i++) {
      this.coins.create(xStart + i * spacing, y, "coin");
    }
  }

  collectMysteryBox(player: any, mystery_box: any) {
    this.mysteryBoxCount++;
    console.log("Mystery Box collected");
    mystery_box.disableBody(true, true);
  }

  // collectPowerupBox(player: any, powerup_box: any) {
  //   powerup_box.disableBody(true, true);
  //   console.log("Powerup Box collected");
  //   this.startPowerUpTransition(
  //     CharacterOptionsType.Flash,
  //     this.character,
  //     this.jetpack
  //   );
  // }

  collectPowerupBox(player: any, powerup_box: any) {
    powerup_box.disableBody(true, true);
    console.log("Powerup Box collected");

    this.powerupCount += 1; // Increment powerup counter

    switch (this.powerupCount) {
      case 1:
        this.startPowerUpTransition(
          CharacterOptionsType.Flash,
          this.character,
          this.jetpack
        );
        break;
      case 2:
        this.startPowerUpTransition(
          CharacterOptionsType.Angel,
          this.character,
          this.jetpack
        );
        break;
      case 3:
        this.startPowerUpTransition(
          CharacterOptionsType.Armor,
          this.character,
          this.jetpack
        );
        break;
      default:
        console.log("All powerups collected!");
    }
  }

  spawnObstacles() {
    const x = this.cameras.main.width + 100;
    const y = Phaser.Math.Between(300, this.cameras.main.height - 250);

    // Calculate elapsed time in seconds
    const elapsedSeconds = (Date.now() - this.gameStartTime) / 1000;

    // Update obstacle speed based on current game speed
    this.updateObstacleSpeed();

    // Add minimum spacing between obstacles
    const minSpacing = 300; // Minimum pixels between obstacles
    const obstacles = [
      ...this.zappers.getChildren(),
      ...this.rockets.getChildren(),
    ];
    const hasNearbyObstacle = obstacles.some(
      (obs) =>
        Math.abs((obs as Phaser.Physics.Arcade.Sprite).x - x) < minSpacing &&
        Math.abs((obs as Phaser.Physics.Arcade.Sprite).y - y) < minSpacing
    );

    if (hasNearbyObstacle) return;
    if (elapsedSeconds <= 30) {
      // Level 1 (0-30s): Only zappers, 10 coins
      if (!this.lastZapperTime || this.time.now - this.lastZapperTime > 3000) {
        this.spawnZapper(x, y);
        this.lastZapperTime = this.time.now;
      }
    } else if (elapsedSeconds <= 90) {
      // Level 2 (30s-90s): Zappers + Rockets, 30 coins
      const obstacleType = Phaser.Math.RND.pick(["zapper", "zapper", "rocket"]); // Higher chance for zappers

      if (
        obstacleType === "zapper" &&
        (!this.lastZapperTime || this.time.now - this.lastZapperTime > 2000)
      ) {
        this.spawnZapper(x, y);
        this.lastZapperTime = this.time.now;
      } else if (
        obstacleType === "rocket" &&
        (!this.lastRocketTime || this.time.now - this.lastRocketTime > 4000)
      ) {
        this.spawnRocket(x, y);
        this.lastRocketTime = this.time.now;
      }
    } else if (elapsedSeconds <= 120) {
      if (
        !this.lastLaserWarning ||
        this.time.now - this.lastLaserWarning > 8000
      ) {
        // Don't return after initiating laser sequence
        this.initiateLaserSequence();
        this.lastLaserWarning = this.time.now;
      }
    } else if (elapsedSeconds <= 150) {
      // Level 3 (90s-150s): Medium density with lasers, 40 coins
      // if (
      //   !this.lastLaserWarning ||
      //   this.time.now - this.lastLaserWarning > 8000
      // ) {
      //   // Don't return after initiating laser sequence
      //   this.initiateLaserSequence();
      //   this.lastLaserWarning = this.time.now;
      // }

      const obstacleType = Phaser.Math.RND.pick(["zapper", "zapper", "rocket"]);
      if (
        obstacleType === "zapper" &&
        (!this.lastZapperTime || this.time.now - this.lastZapperTime > 1800)
      ) {
        this.spawnZapper(x, y);
        this.lastZapperTime = this.time.now;
      } else if (
        obstacleType === "rocket" &&
        (!this.lastRocketTime || this.time.now - this.lastRocketTime > 3500)
      ) {
        this.spawnRocket(x, y);
        this.lastRocketTime = this.time.now;
      }
    } else if (elapsedSeconds <= 210) {
      // Level 4 (150s-210s): 50% increased difficulty, 60 coins
      if (
        !this.lastLaserWarning ||
        this.time.now - this.lastLaserWarning > 6000
      ) {
        this.initiateLaserSequence();
        this.lastLaserWarning = this.time.now;
      }

      const obstacleType = Phaser.Math.RND.pick(["zapper", "rocket", "zapper"]);
      if (
        obstacleType === "zapper" &&
        (!this.lastZapperTime || this.time.now - this.lastZapperTime > 1200)
      ) {
        this.spawnZapper(x, y);
        this.lastZapperTime = this.time.now;
      } else if (
        obstacleType === "rocket" &&
        (!this.lastRocketTime || this.time.now - this.lastRocketTime > 2300)
      ) {
        this.spawnRocket(x, y);
        this.lastRocketTime = this.time.now;
      }
    } else {
      // Level 5 (210s+): Maximum difficulty (permanent), 60 coins
      // This level continues indefinitely
      if (
        !this.lastLaserWarning ||
        this.time.now - this.lastLaserWarning > 4000
      ) {
        this.initiateLaserSequence();
        this.lastLaserWarning = this.time.now;
      }

      const obstacleType = Phaser.Math.RND.pick(["zapper", "rocket"]);
      if (
        obstacleType === "zapper" &&
        (!this.lastZapperTime || this.time.now - this.lastZapperTime > 800)
      ) {
        this.spawnZapper(x, y);
        this.lastZapperTime = this.time.now;
      } else if (
        obstacleType === "rocket" &&
        (!this.lastRocketTime || this.time.now - this.lastRocketTime > 1500)
      ) {
        this.spawnRocket(x, y);
        this.lastRocketTime = this.time.now;
      }
    }
  }

  updateObstacleSpeed() {
    // Calculate speed multiplier based on current game speed
    const speedMultiplier = this.currentGameSpeed / this.BEGINNER_SPEED;
    this.currentObstacleSpeed = this.BASE_OBSTACLE_SPEED * speedMultiplier;
  }

  increaseDifficulty() {
    this.difficultyLevel++;
  }

  initiateLaserSequence() {
    const warningDuration = 500; // 1 second warning
    const y = Phaser.Math.Between(200, this.cameras.main.height - 200);

    // Spawn warning indicators
    const leftWarning = this.add.sprite(300, y, "laser_left");
    const rightWarning = this.add.sprite(
      this.cameras.main.width - 300,
      y,
      "laser_right"
    );

    // Play warning animations if they exist
    leftWarning.anims.play("laser_left", true);
    rightWarning.anims.play("laser_right", true);

    // After warning duration, remove warnings and spawn laser
    this.time.delayedCall(warningDuration, () => {
      leftWarning.destroy();
      rightWarning.destroy();
      this.spawnLaser(this.cameras.main.width / 2, y);
    });
  }

  // Add these spawn functions
  spawnZapper(x: number, y: number) {
    const zapperConfigs = [
      {
        rotation: 0,
        bodies: [
          {
            shape: "rectangle",
            width: 40,
            height: 250,
            offsetX: 0,
            offsetY: 0,
          },
        ],
      },
      {
        rotation: 45,
        bodies: [
          { shape: "circle", radius: 30, offsetX: 55, offsetY: -80 },
          {
            shape: "rectangle",
            width: 30,
            height: 30,
            offsetX: -35,
            offsetY: 40,
          },
          {
            shape: "rectangle",
            width: 30,
            height: 30,
            offsetX: 30,
            offsetY: -30,
          },
          { shape: "circle", radius: 30, offsetX: -90, offsetY: 65 },
        ],
      },
      {
        rotation: -45,
        bodies: [
          {
            shape: "circle",
            radius: 30,
            offsetX: -85,
            offsetY: -85,
          },
          {
            shape: "rectangle",
            width: 30,
            height: 30,
            offsetX: 40,
            offsetY: 40,
          },
          {
            shape: "rectangle",
            width: 30,
            height: 30,
            offsetX: -30,
            offsetY: -40,
          },
          { shape: "circle", radius: 30, offsetX: 60, offsetY: 60 },
        ],
      },
    ];

    const randomConfig = Phaser.Math.RND.pick(zapperConfigs);
    const zapper = this.zappers.create(x, y, "zapper_90");
    zapper.setData("config", randomConfig);

    // Set zapper properties
    zapper.body.setAllowGravity(false);
    zapper.setScale(0.65);
    zapper.setSize(50, 50);
    zapper.setRotation(Phaser.Math.DegToRad(randomConfig.rotation));
    zapper.anims.play("zapper_90", true);
    zapper.setVelocityX(this.currentObstacleSpeed);

    // Add collision bodies
    randomConfig.bodies.forEach((bodyConfig: any) => {
      const body = this.physics.add.sprite(
        zapper.x + bodyConfig.offsetX,
        zapper.y + bodyConfig.offsetY,
        "transparent"
      );
      if (bodyConfig.shape === "circle") {
        body.body.setCircle(bodyConfig.radius || 0);
      } else if (bodyConfig.shape === "rectangle") {
        body.body.setSize(bodyConfig.width || 0, bodyConfig.height || 0);
      }
      body.body.setAllowGravity(false);
      body.setVelocityX(this.currentObstacleSpeed);
      body.setVisible(false);
      this.physics.add.existing(body);
      this.physics.add.collider(
        this.player,
        body,
        //@ts-ignore
        this.hitZapper,
        null,
        this
      );
    });
  }

  spawnRocket(x: number, y: number) {
    const rocket = this.rockets.create(x, y, "rocket");
    rocket.setVelocityX(this.currentObstacleSpeed * 3);
    rocket.setScale(0.8);
    rocket.body.setAllowGravity(false);
    rocket.anims.play("rocket", true);
    this.physics.add.collider(
      this.player,
      rocket,
      this.hitRocket,
      undefined,
      this
    );
  }

  spawnLaser(x: number, y: number) {
    // Ensure the laser is within the screen bounds
    const laserX = Phaser.Math.Clamp(x, 0, this.cameras.main.width - 100);
    const laserY = Phaser.Math.Clamp(y, 0, this.cameras.main.height - 100);

    const laser = this.lasers.create(laserX, laserY, "laser");
    laser.setScale(0.7);
    laser.setVelocityX(0);
    laser.body.setAllowGravity(false);
    laser.anims.play("laser", true);

    this.laserActive = true; // Set laser active flag

    this.time.addEvent({
      delay: 4000, // Laser appears for 4seconds
      callback: () => {
        laser.destroy();
      },
      callbackScope: this,
    });
  }

  hitZapper(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    zapper: any
  ) {
    player.disableBody(true, true);
    this.scene.start("GameOver", {
      coinCount: this.coinCount,
      distanceTravelled: this.distanceTravelled,
      character: this.character,
      environment: this.environment,
      jetpack: this.jetpack,
    });
  }

  hitLaser(player: any, laser: any) {
    player.disableBody(true, true);
    this.scene.start("GameOver", {
      coinCount: this.coinCount,
      distanceTravelled: this.distanceTravelled,
      character: this.character,
      environment: this.environment,
      jetpack: this.jetpack,
    });
  }

  hitRocket(player: any, rocket: any) {
    player.disableBody(true, true);
    this.scene.start("GameOver", {
      coinCount: this.coinCount,
      distanceTravelled: this.distanceTravelled,
      character: this.character,
      environment: this.environment,
      jetpack: this.jetpack,
    });
    // if (this.mysteryBoxCount > 0) {
    //     this.scene.start("MysteryBoxScreen", {
    //         character: this.character,
    //         environment: this.environment,
    //         jetpack: this.jetpack,
    //         mysteryBoxCount: this.mysteryBoxCount,
    //     });
    // } else {
    //     console.log("Player Dead. Loading GameOver Scene");
    //     this.scene.start("GameOver", {
    //         coinCount: this.coinCount,
    //         distanceTravelled: this.distanceTravelled,
    //         character: this.character,
    //         environment: this.environment,
    //         jetpack: this.jetpack,
    //     });
    // }
    // this.scene.start("PotionScreen", {
    //     character: this.character,
    //     environment: this.environment,
    //     jetpack: this.jetpack,
    //     coinCount: this.coinCount,
    //     distanceTravelled: this.distanceTravelled,
    // });
  }
}
