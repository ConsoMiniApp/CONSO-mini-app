//@ts-nocheck
import { Scene } from "phaser";
import {
  CharacterOptionsType,
  EnvironmentOptionsType,
  JetpackOptionsType,
  PatternType,
  CoinPatterns,
  MysteryBox,
  PowerUp,
} from "../types";
import {
  constantKeyAnimations,
  environmentBackgrounds,
  jetpackOptions,
  coinPatterns,
  zapperConfigs,
} from "../constants";

export class MainGame extends Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  backgroundLayers: Phaser.GameObjects.TileSprite[] = [];
  character: CharacterOptionsType;
  environment: EnvironmentOptionsType;
  jetpack: JetpackOptionsType;
  mysteryBoxesToSpawn: Array<MysteryBox> = [];
  powerUpsToSpawn: Array<PowerUp>;

  // DEVICE VARIABLES
  deviceWidth: number = window.innerWidth;

  // COIN COUNTER
  coinCount: number = 0;
  coinText!: Phaser.GameObjects.Text;
  // GAME DISTANCE
  distanceTravelled: number = 0;
  distanceText!: Phaser.GameObjects.Text;
  lastRewardDistance: number = 0;
  // POWER UPS
  inTransition: boolean = false;
  transitionCharacter: CharacterOptionsType = CharacterOptionsType.Og;
  transitionCharacterTime: number = 0;
  obstaclesInvisible: boolean = false; // Angel Power up
  obstaclesInactive: boolean = false; // Flash poer up
  shieldActive: boolean = false; // Armor power up
  private progressBarBackground: Phaser.GameObjects.Image;
  private progressBarFill: Phaser.GameObjects.Image;
  private progressBarMaxWidth: number = 300;

  // GAME STATE
  previous_character: CharacterOptionsType = CharacterOptionsType.Og;
  previous_jetpack: JetpackOptionsType = JetpackOptionsType.Jetpack;
  // Y Priority - [Mystery Box, Powerup Box] , [Coin], Laser, Zapper
  screenYRangeBlockedByBoxForSpawning: number[] = [0, 0];
  screenYRangeBlockedByCoinForSpawning: number[] = [0, 0];
  screenYRangeBlockedByLaserForSpawning: number[] = [0, 0];
  gameStartTime: number;
  totalGameTime: number = 0;
  currentGameSpeed = 0; // in m/s
  gameSpeedMultiplier = 1;
  currentGameObjectsSpeed = 0;
  lastZapperTime!: number;
  lastRocketTime!: number;
  lastLaserWarning!: number;
  powerupCount: number = 0;
  lastCoinSpawnTime: number = 0;
  armorHitWithObstaclesLeft: number;

  // GAME BODIES
  coins: Phaser.Physics.Arcade.Group;
  powerup_boxes: Phaser.Physics.Arcade.Group;
  mystery_boxes: Phaser.Physics.Arcade.Group;
  zappers: Phaser.Physics.Arcade.Group;
  lasers: Phaser.Physics.Arcade.Group;
  rockets: Phaser.Physics.Arcade.Group;
  laserActive: boolean = false;
  rocketWarning: Phaser.Physics.Arcade.Group;
  platform: Phaser.Physics.Arcade.Image;
  environmentList: string[] = ["forest", "city", "mars"];
  currentEnvironmentIndex: number = 0;
  environmentTimer!: Phaser.Time.TimerEvent;

  // SOUNDS
  background_music: Phaser.Sound.BaseSound;
  coin_music: Phaser.Sound.BaseSound;
  mystery_box_music: Phaser.Sound.BaseSound;
  rocket_warning_music: Phaser.Sound.BaseSound;
  rocket_launch_music: Phaser.Sound.BaseSound;
  laser_active_music: Phaser.Sound.BaseSound;
  rocket_hit_music: Phaser.Sound.BaseSound;
  zapper_hit_music: Phaser.Sound.BaseSound;
  laser_hit_music: Phaser.Sound.BaseSound;
  flash_transition_music: Phaser.Sound.BaseSound;
  angel_transition_music: Phaser.Sound.BaseSound;
  armor_transition_music: Phaser.Sound.BaseSound;
  jetpack_normal_music: Phaser.Sound.BaseSound;
  jetpack_heli_music: Phaser.Sound.BaseSound;
  jetpack_rocket_music: Phaser.Sound.BaseSound;
  currentJetpackSound: Phaser.Sound.BaseSound | null = null;
  soundEnabled: boolean;
  soundButton: Phaser.GameObjects.Image;

  // CONSTANTS
  readonly START_SPEED = 6; // t=0
  readonly END_SPEED = 25; // t=240s
  readonly BASE_OBSTACLE_SPEED = -300;

  // ARCHIVE
  mysteryBoxCount: number = 0;

  constructor(
    character: CharacterOptionsType,
    environment: EnvironmentOptionsType,
    jetpack: JetpackOptionsType,
    mysteryBoxes: Array<MysteryBox>,
    powerUps: Array<PowerUp>
  ) {
    super({ key: "MainGame" });
    this.character = character;
    this.environment = environment;
    this.jetpack = jetpack;
    this.mysteryBoxesToSpawn = mysteryBoxes;
    this.powerUpsToSpawn = powerUps;
    this.currentEnvironmentIndex = this.environmentList.indexOf(environment);
  }

  init(data: { newGame: boolean }) {
    if (data.newGame) {
      this.resetGame();
    }
  }

  resetGame() {
    // Reset gameplay metrics
    this.coinCount = 0;
    this.distanceTravelled = 0;
    this.lastRewardDistance = 0;
    this.mysteryBoxCount = 0;

    // Reset character and environment states
    this.character = CharacterOptionsType.Og;
    this.jetpack = JetpackOptionsType.Jetpack;
    this.environment = EnvironmentOptionsType.Forest;
    this.currentEnvironmentIndex = 0;

    // Reset timers and counters
    this.totalGameTime = 0;
    this.lastZapperTime = 0;
    this.lastRocketTime = 0;
    this.lastLaserWarning = 0;
    this.lastCoinSpawnTime = 0;
    this.armorHitWithObstaclesLeft = 1;

    // Reset game object states
    this.currentGameSpeed = this.START_SPEED; // Reset speed to start speed
    this.currentGameObjectsSpeed = this.BASE_OBSTACLE_SPEED; // Reset object speeds
    this.powerupCount = 0;
    this.inTransition = false;
    this.screenYRangeBlockedByBoxForSpawning = [0, 0];
    this.screenYRangeBlockedByCoinForSpawning = [0, 0];
    this.screenYRangeBlockedByLaserForSpawning = [0, 0];
    this.laserActive = false;

    // Reset player properties
    this.previous_character = CharacterOptionsType.Og;
    this.previous_jetpack = JetpackOptionsType.Jetpack;

    // Reset UI elements
    this.progressBarBackground.setVisible(false);
    this.progressBarFill.setVisible(false);
    this.updateProgressBar(1); // Reset progress bar to full

    this.stopJetpackSound();

    console.log("Game has been reset");
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

    // Load Environment
    this.loadEnvironmentAssets();

    // Load Character and Jetpack
    this.loadCharacterAssets();

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
  }

  create() {
    console.log("Creating game scene");

    this.initializeGameSounds();
    this.background_music.play();

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
    this.lastCoinSpawnTime = this.gameStartTime;
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

    // Sound Control Button
    this.soundEnabled = true; // Track sound state
    this.sound.mute = false;
    this.soundButton = this.add
      .image(1630, 110, "sound_on")
      .setScale(2)
      .setInteractive();

    this.soundButton.on("pointerdown", () => {
      this.soundEnabled = !this.soundEnabled;
      this.sound.mute = !this.soundEnabled;
      this.soundButton.setTexture(this.soundEnabled ? "sound_on" : "sound_off");
    });

    // Total Distance Graphic counter
    const distanceBG = this.add.graphics();
    distanceBG.fillStyle(0x6a6a6a, 0.8).fillRoundedRect(1200, 60, 335, 100, 10);

    this.add.text(1235, 70, "TOTAL DISTANCE", {
      fontSize: "28px",
      color: "#FFFFFF",
      lineSpacing: 0.5,
      fontFamily: "handjet",
    });

    this.distanceText = this.add.text(1235, 100, "0m", {
      fontSize: "48px",
      color: "#FFFFFF",
      fontFamily: "Jersey",
    });

    this.lastRewardDistance = 0;

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
    this.player.body.setSize(
      this.player.width * 0.65,
      this.player.height * 0.65
    );

    // DYNAMIC ASSETS
    // Coins
    this.coins = this.physics.add.group();
    // Mystery Box
    this.mystery_boxes = this.physics.add.group();
    // Powerup Box
    this.powerup_boxes = this.physics.add.group();
    // Initialize obstacles
    this.zappers = this.physics.add.group();
    this.lasers = this.physics.add.group();
    this.rockets = this.physics.add.group();
    this.rocketWarning = this.physics.add.group();

    this.initializeOverlaps();

    // Event to increment distance every 'delay' milliseconds
    this.time.addEvent({
      delay: 200,
      callback: () => {
        this.updateDistance();
      },
      loop: true,
    });

    // Spawn coins every second
    this.time.addEvent({
      delay: 1000, // Check every second
      callback: this.updateGameState,
      callbackScope: this,
      loop: true,
    });

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
    this.backgroundLayers.forEach((layer, index) => {
      if (index === 0) {
        layer.tilePositionX += 0;
      } else {
        // Convert m/s to game units
        const gameSpeedUnit = this.currentGameSpeed / 6; // Scale factor to match original game units
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
      this.player.setVelocityY(-700);
      if (!this.inTransition) {
        this.player.anims.play(`${this.character}_${this.jetpack}_fly`, true);
        this.playJetpackSound();
      }
    }
    if (isOnGround && !isPointerDown) {
      // Simply check if pointer is not down
      if (!this.inTransition) {
        this.player.anims.play(`${this.character}_${this.jetpack}_run`, true);
        this.stopJetpackSound();
      }
    }
  }

  setupEnvironmentTransition() {
    this.environmentTimer = this.time.addEvent({
      delay: 60000, // 60 seconds
      callback: this.changeEnvironment,
      callbackScope: this,
      loop: true,
    });
  }

  async changeEnvironment() {
    // const fade = this.add.graphics();
    // fade.fillStyle(0x000000, 1);
    // fade.fillRect(
    //   0,
    //   0,
    //   this.game.config.width as number,
    //   this.game.config.height as number
    // );
    // fade.setDepth(999);
    // fade.alpha = 0;

    // await new Promise<void>((resolve) => {
    //   this.tweens.add({
    //     targets: fade,
    //     alpha: 1,
    //     duration: 100,
    //     onComplete: () => resolve(),
    //   });
    // });
    this.currentEnvironmentIndex =
      (this.currentEnvironmentIndex + 1) % this.environmentList.length;
    const nextEnvironment = this.environmentList[this.currentEnvironmentIndex];
    await this.loadNewEnvironment(nextEnvironment);

    this.backgroundLayers.forEach((layer, index) => {
      const textureKeys = ["bg_last", "bg_b3", "bg_b2", "bg_b1", "bg_ground"];
      layer.setTexture(textureKeys[index]);
    });

    // this.tweens.add({
    //   targets: fade,
    //   alpha: 0,
    //   duration: 100,
    //   onComplete: () => fade.destroy(),
    // });
  }

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

  initializeGameSounds() {
    this.background_music = this.sound.add("game_background", {
      loop: true,
      volume: 0.1,
      rate: 1,
    });

    //Character & powerup audio
    // jetpack audio
    this.jetpack_normal_music = this.sound.add("jetpack_normal", {
      loop: true,
      volume: 0.3,
      rate: 0.8,
    });
    this.jetpack_heli_music = this.sound.add("jetpack_heli", {
      loop: true,
      volume: 0.3,
      rate: 0.8,
    });
    this.jetpack_rocket_music = this.sound.add("jetpack_rocket", {
      loop: true,
      volume: 0.15,
      rate: 0.8,
    });
    //powerup transition audio
    this.flash_transition_music = this.sound.add("flash_transition", {
      loop: false,
      volume: 0.5,
      rate: 0.8,
    });
    this.angel_transition_music = this.sound.add("angel_transition", {
      loop: false,
      volume: 0.5,
      rate: 0.8,
    });
    this.armor_transition_music = this.sound.add("armor_transition", {
      loop: false,
      volume: 0.5,
      rate: 0.8,
    });

    // coin audio
    this.coin_music = this.sound.add("coin_collect", {
      loop: false,
      volume: 0.25,
      rate: 0.8,
    });

    //mystery box audio
    this.mystery_box_music = this.sound.add("mystery_box_collect", {
      loop: false,
      volume: 0.25,
      rate: 0.8,
    });

    // Obstacles audio
    this.rocket_warning_music = this.sound.add("rocket_warning", {
      loop: true,
      volume: 0.25,
      rate: 0.8,
    });
    this.rocket_launch_music = this.sound.add("rocket_launch", {
      loop: true,
      volume: 0.25,
      rate: 0.8,
    });
    this.rocket_hit_music = this.sound.add("rocket_hit", {
      loop: false,
      volume: 0.5,
      rate: 0.8,
    });
    this.zapper_hit_music = this.sound.add("zapper_hit", {
      loop: false,
      volume: 0.5,
      rate: 2,
    });
    this.laser_active_music = this.sound.add("laser_active", {
      loop: true,
      volume: 0.5,
      rate: 0.8,
    });
    this.laser_hit_music = this.sound.add("laser_hit", {
      loop: false,
      volume: 0.5,
      rate: 0.8,
    });
  }

  initializeOverlaps() {
    // Coins
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      undefined,
      this
    );

    // Mystery Box
    this.physics.add.overlap(
      this.player,
      this.mystery_boxes,
      this.collectMysteryBox,
      undefined,
      this
    );

    // Powerup Box
    this.physics.add.overlap(
      this.player,
      this.powerup_boxes,
      this.collectPowerupBox,
      undefined,
      this
    );

    // obstacles overlaps
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
  }

  playJetpackSound() {
    // If we're already playing the correct sound, don't restart it
    if (this.currentJetpackSound?.isPlaying) {
      return;
    }

    // Stop any currently playing jetpack sound
    this.stopJetpackSound();

    // Select the appropriate sound based on jetpack type
    switch (this.jetpack) {
      case JetpackOptionsType.Jetpack:
        this.currentJetpackSound = this.jetpack_normal_music;
        break;
      case JetpackOptionsType.Heli:
        this.currentJetpackSound = this.jetpack_heli_music;
        break;
      case JetpackOptionsType.Rocket:
        this.currentJetpackSound = this.jetpack_rocket_music;
        break;
      default:
        // No sound for other cases (like when character has no jetpack during power-ups)
        return;
    }

    // Play the selected sound
    if (this.currentJetpackSound && !this.currentJetpackSound.isPlaying) {
      this.currentJetpackSound.play();
    }
  }

  stopJetpackSound() {
    if (this.currentJetpackSound?.isPlaying) {
      this.currentJetpackSound.stop();
    }
    this.currentJetpackSound = null;
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

    // Add power up functionality to the game
    switch (powerUpCharacter) {
      case CharacterOptionsType.Flash:
        this.flash_transition_music.play();
        this.gameSpeedMultiplier = 2;
        this.obstaclesInactive = true;
        // hide existing obstacles
        [
          ...this.zappers.getChildren(),
          ...this.rockets.getChildren(),
          ...this.coins.getChildren(),
        ].forEach((obstacle: any) => {
          obstacle.setAlpha(0.2);
          obstacle.setVisible(false);
          obstacle.destroy();
        });
        // New obstacles appear with lower opacity during Flash power-up
        this.time.addEvent({
          delay: 1000,
          loop: true,
          callback: () => {
            if (this.character === CharacterOptionsType.Flash) {
              [
                ...this.zappers.getChildren(),
                ...this.rockets.getChildren(),
              ].forEach((obstacle: any) => {
                obstacle.setAlpha(0.5);
              });
            }
          },
        });
        break;
      case CharacterOptionsType.Angel:
        this.angel_transition_music.play();
        this.obstaclesInvisible = true;
        // clear existing obstacles
        [
          ...this.zappers.getChildren(),
          ...this.rockets.getChildren(),
          ...this.coins.getChildren(),
        ].forEach((obstacle: any) => {
          obstacle.setAlpha(0);
          obstacle.setVisible(false);
          obstacle.destroy();
        });
        // Prevent obstacle spawning during Angel power-up
        const originalObstacleSpawn = this.handleObstacleSpawning.bind(this);
        this.handleObstacleSpawning = () => {
          if (this.character !== CharacterOptionsType.Angel) {
            originalObstacleSpawn();
          }
        };
        break;
      case CharacterOptionsType.Armor:
        this.armor_transition_music.play();
        this.shieldActive = true;
        this.armorHitWithObstaclesLeft = 1;
        break;

      default:
        break;
    }

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
      delay: 250,
      callback: () => {
        progress -= 1 / (this.transitionCharacterTime * 4); // Reduce progress
        this.updateProgressBar(progress);

        if (progress <= 0) {
          timer.remove(); // Stop when empty
          // change to previous character
          this.character = this.previous_character;
          this.jetpack = this.previous_jetpack;
          this.player.setTexture(`${this.character}_${this.jetpack}`);
          // reset all power up variables to normal values
          this.gameSpeedMultiplier = 1;
          this.obstaclesInactive = false;
          this.obstaclesInvisible = false;
          this.shieldActive = false;
          // Reset handlers to original functions
          if (powerUpCharacter === CharacterOptionsType.Angel) {
            this.handleObstacleSpawning =
              this.handleObstacleSpawning.bind(this);
          }
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

  // MAIN UPDATE FUNCTION
  updateGameState() {
    this.updateGameTimeAndSpeed();
    this.updateGameObjectsSpeed();
    this.handleMysteryBoxSpawning();
    this.handlePowerUpSpawning();
    this.handleCoinSpawning();
    this.handleObstacleSpawning();
  }

  updateDistance() {
    let distanceIncrement = this.currentGameSpeed / 5; // Convert to meters
    this.distanceTravelled += distanceIncrement; // Convert to meters
    this.distanceText.setText(`${Math.floor(this.distanceTravelled)}m`);

    // Award coins every 1000m
    if (Math.floor(this.distanceTravelled) - this.lastRewardDistance >= 1000) {
      this.lastRewardDistance += 1000;
      this.addCoins(30);
    }
  }

  // Function to add coins with animation
  addCoins(amount: number) {
    this.coinCount += amount;
    this.coinText.setText(`${this.coinCount}`);

    // Create "+30" animation near the coin counter
    const coinAnim = this.add.text(260, 20, "+30", {
      fontSize: "60px",
      color: "#FFD700",
      fontFamily: "jersey",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 8,
    });

    this.tweens.add({
      targets: coinAnim,
      y: 0,
      alpha: 0,
      duration: 2000,
      ease: "Power2",
      onComplete: () => {
        coinAnim.destroy();
      },
    });
  }

  updateGameTimeAndSpeed() {
    this.totalGameTime += 1;
    this.currentGameSpeed =
      this.gameSpeedMultiplier * this.START_SPEED +
      (this.totalGameTime * (this.END_SPEED - this.START_SPEED)) / 360;
  }

  updateGameObjectsSpeed() {
    // Calculate speed multiplier based on current game speed
    const speedMultiplier =
      (this.gameSpeedMultiplier * this.currentGameSpeed) / this.START_SPEED;
    this.currentGameObjectsSpeed = this.BASE_OBSTACLE_SPEED * speedMultiplier;
  }

  // HANDLER FUNCTIONS
  handleMysteryBoxSpawning() {
    console.log(
      "screenYRangeBlockedByBoxForSpawning",

      this.screenYRangeBlockedByBoxForSpawning
    );
    //@ts-ignore
    this.mystery_boxes?.children.each((mysteryBox: any) => {
      if (mysteryBox.x < -100) {
        this.screenYRangeBlockedByBoxForSpawning = [0, 0]; // Reset coin pattern range
        mysteryBox.destroy();
      }
    });

    this.mysteryBoxesToSpawn?.forEach((mysteryBox) => {
      if (this.totalGameTime == mysteryBox.timestamp) {
        // this.mystery_boxes.create(1300, 840, "mystery_box");
        const mysteryBox = this.mystery_boxes.create(1900, 840, "mystery_box");
        mysteryBox.body.setAllowGravity(false);
        mysteryBox.setScale(0.85);
        mysteryBox.setVelocityX(this.currentGameObjectsSpeed);
        mysteryBox.anims.play("mystery_box_animation", true);
        this.screenYRangeBlockedByBoxForSpawning = [840, 942]; // 102 px height of mystery box
      }
    });
  }

  handlePowerUpSpawning() {
    console.log(
      "screenYRangeBlockedByBoxForSpawning",

      this.screenYRangeBlockedByBoxForSpawning
    );
    //@ts-ignore
    this.powerup_boxes?.children.each((powerUpBox: any) => {
      if (powerUpBox.x < -100) {
        this.screenYRangeBlockedByBoxForSpawning = [0, 0]; //
        powerUpBox.destroy();
      }
    });

    this.powerUpsToSpawn?.forEach((powerUp: PowerUp) => {
      if (this.totalGameTime == powerUp.timestamp) {
        const powerUpBody = this.powerup_boxes.create(1900, 840, "power_up");
        powerUpBody.body.setAllowGravity(false);
        powerUpBody.setScale(0.85);
        powerUpBody.setVelocityX(this.currentGameObjectsSpeed);
        powerUpBody.anims.play("power_up_animation", true);
        this.screenYRangeBlockedByBoxForSpawning = [840, 942]; // 102 px height of power up box
        this.transitionCharacter = powerUp.character as CharacterOptionsType;
        this.transitionCharacterTime = powerUp.time;
      }
    });
  }

  handleCoinSpawning() {
    const currentTime = Date.now();
    // Clear existing coins that are too far left
    //@ts-ignore
    this.coins.children.each((coin: any) => {
      if (coin.x < -100) {
        this.screenYRangeBlockedByCoinForSpawning = [0, 0]; // Reset coin pattern range
        coin.destroy();
      }
    });

    let maxCoinCollectible: number;
    let spawnFunctionInvocationDelay: number = 0;
    if (CharacterOptionsType.Angel === this.character) {
      maxCoinCollectible = 30;
      spawnFunctionInvocationDelay = 2000;
    } else if (this.totalGameTime <= 30) {
      // First 30 seconds: 10 coins
      maxCoinCollectible = 10;
      spawnFunctionInvocationDelay = 7000;
    } else if (this.totalGameTime <= 90) {
      // Next 1 minute (30s - 90s): 30 coins
      maxCoinCollectible = 30;
      spawnFunctionInvocationDelay = 6000;
    } else if (this.totalGameTime <= 150) {
      // Next 1 minute (90s - 150s): 40 coins
      maxCoinCollectible = 40;
      spawnFunctionInvocationDelay = 5000;
    } else if (this.totalGameTime <= 210) {
      // Next 1 minute (150s - 210s): 60 coins
      maxCoinCollectible = 60;
      spawnFunctionInvocationDelay = 12000;
    } else {
      // 210s onwards: 60 coins per minute
      maxCoinCollectible = 60;
      spawnFunctionInvocationDelay = 12000;
    }

    // Determine pattern type based on difficulty level
    let patternType: PatternType;
    if (this.totalGameTime <= 90) {
      patternType = "low";
    } else if (this.totalGameTime <= 150) {
      patternType = "medium";
    } else {
      patternType = "high";
    }

    // Spawn coins only if enough time has passed
    if (currentTime - this.lastCoinSpawnTime >= spawnFunctionInvocationDelay) {
      this.spawnCoinsWithPattern(patternType);
      this.lastCoinSpawnTime = currentTime;
    }
  }

  handleObstacleSpawning() {
    const x = this.cameras.main.width + 100;
    const y = Phaser.Math.Between(100, this.cameras.main.height - 250);
    //@ts-ignore
    this.rockets?.children.each((rocket: any) => {
      if (rocket.x < -50) {
        rocket.destroy();
        this.rocket_launch_music.stop();
      }
    });

    console.log(
      "screenYRangeBlockedByCoinForSpawning",
      this.screenYRangeBlockedByCoinForSpawning
    );
    if (
      (this.screenYRangeBlockedByCoinForSpawning[0] > y - 300 &&
        this.screenYRangeBlockedByCoinForSpawning[0] < y + 51) ||
      (this.screenYRangeBlockedByCoinForSpawning[1] > y - 300 &&
        this.screenYRangeBlockedByCoinForSpawning[1] < y + 51)
    ) {
      console.log(
        "Coin pattern and obstacle overlap detected",
        y,
        this.screenYRangeBlockedByCoinForSpawning
      );
      return;
    }

    // Calculate elapsed time in seconds
    const elapsedSeconds = (Date.now() - this.gameStartTime) / 1000;

    if (elapsedSeconds <= 30) {
      // Level 1 (0-30s): Only zappers, 10 coins
      if (!this.lastZapperTime || this.time.now - this.lastZapperTime > 3000) {
        // check if laser exists before spawning zapper
        if (
          (this.screenYRangeBlockedByLaserForSpawning[0] > y - 300 &&
            this.screenYRangeBlockedByLaserForSpawning[0] < y + 51) ||
          (this.screenYRangeBlockedByLaserForSpawning[1] > y - 300 &&
            this.screenYRangeBlockedByLaserForSpawning[1] < y + 51)
        ) {
          console.log(
            "laser can overlap with zapper",
            y,
            this.screenYRangeBlockedByCoinForSpawning
          );
          return;
        }
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
        (!this.lastRocketTime || this.time.now - this.lastRocketTime > 9000)
      ) {
        this.spawnRocketWithWarning(x, y);
        this.lastRocketTime = this.time.now;
      }
    } else if (elapsedSeconds <= 150) {
      // Level 3 (90s-150s): Medium density with lasers, 40 coins
      const obstacleType = Phaser.Math.RND.pick([
        "zapper",
        "zapper",
        "rocket",
        "laser",
      ]);
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
        this.spawnRocketWithWarning(x, y);
        this.lastRocketTime = this.time.now;
      } else if (
        obstacleType === "laser" &&
        (!this.lastLaserWarning || this.time.now - this.lastLaserWarning > 8000)
      ) {
        this.spawnLaserWithWarning();
        this.lastLaserWarning = this.time.now;
      }
    } else if (elapsedSeconds <= 210) {
      // Level 4 (150s-210s): 50% increased difficulty, 60 coins
      const obstacleType = Phaser.Math.RND.pick([
        "zapper",
        "zapper",
        "rocket",
        "laser",
        "laser",
      ]);
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
        this.spawnRocketWithWarning(x, y);
        this.lastRocketTime = this.time.now;
      }
    } else {
      // Level 5 (210s+): Maximum difficulty (permanent), 60 coins
      const obstacleType = Phaser.Math.RND.pick(["zapper", "rocket", "laser"]);
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
        this.spawnRocketWithWarning(x, y);
        this.lastRocketTime = this.time.now;
      }
    }
  }

  spawnCoinsWithPattern(pattern: PatternType): void {
    const patternGroups = coinPatterns[pattern]; // total patterns of cetain pattern type e.g. low has 2 patterns
    const baseX = 1800; // Starting x-coordinate for coins
    const baseY = 200; // Base y-coordinate for vertical alignment
    // select a random pattern group
    const randomPatternGroup = Phaser.Math.RND.pick(patternGroups);

    for (let i = 0; i < randomPatternGroup.coinCount; i++) {
      const coin = this.coins.create(
        baseX + randomPatternGroup.positions[i].x,
        baseY + randomPatternGroup.positions[i].y,
        "coin"
      ) as Phaser.Physics.Arcade.Sprite;

      coin.setScale(0.18); // coin height is 87px
      //@ts-ignore
      coin.body.setAllowGravity(false);
      coin.setVelocityX(this.currentGameObjectsSpeed);
    }

    this.screenYRangeBlockedByCoinForSpawning = [
      randomPatternGroup.positions[0].y,
      randomPatternGroup.positions[randomPatternGroup.positions.length - 1].y +
        87,
    ];
  }

  collectCoin(player: any, coin: any) {
    coin.disableBody(true, true);
    this.coin_music.play();
    this.screenYRangeBlockedByCoinForSpawning = [0, 0]; // Reset coin pattern range

    this.coinCount += 1;
    this.coinText.setText(`${this.coinCount}`);
  }

  collectMysteryBox(player: any, mystery_box: any) {
    this.mysteryBoxCount++;
    console.log("Mystery Box collected");
    mystery_box.disableBody(true, true);
    this.mystery_box_music.play();
    this.screenYRangeBlockedByBoxForSpawning = [0, 0]; // Reset mystery box pattern range
  }

  collectPowerupBox(player: any, powerup_box: any) {
    console.log("collectPowerupBox triggered");
    powerup_box.disableBody(true, true);
    console.log("Powerup Box collected");

    // this.powerupCount += 1; // Increment powerup counter
    this.startPowerUpTransition(
      this.transitionCharacter as CharacterOptionsType, // Flash, Armor, Angel
      this.character,
      this.jetpack
    );
  }

  spawnZapper(x: number, y: number) {
    const randomConfig = Phaser.Math.RND.pick(zapperConfigs);
    const zapper = this.zappers.create(x, y, "zapper_90");
    zapper.setData("config", randomConfig);

    // Set zapper properties
    zapper.body.setAllowGravity(false);
    zapper.setScale(0.65);
    zapper.setSize(50, 50);
    zapper.setRotation(Phaser.Math.DegToRad(randomConfig.rotation));
    zapper.anims.play("zapper_90", true);
    zapper.setVelocityX(this.currentGameObjectsSpeed);

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
      body.setVelocityX(this.currentGameObjectsSpeed);
      body.setVisible(false);
      this.physics.add.existing(body);
      this.physics.add.overlap(
        this.player,
        body,
        //@ts-ignore
        this.hitZapper,
        null,
        this
      );
    });
  }

  spawnRocketWithWarning(x: number, y: number) {
    const warning = this.rocketWarning.create(x - 200, y, "rocket_warning");

    warning.setScale(1);
    warning.body.setAllowGravity(false);
    this.rocket_warning_music.play();
    warning.anims.play("rocket_warning_animation", true);

    this.time.delayedCall(1000, () => {
      warning.destroy();
      this.rocket_warning_music.stop();
      const rocket = this.rockets.create(x, y, "rocket");
      rocket.setVelocityX(this.currentGameObjectsSpeed * 2);
      rocket.setScale(0.8);
      rocket.body.setAllowGravity(false);
      rocket.anims.play("rocket", true);
      this.rocket_launch_music.play();
    });
  }

  spawnLaserWithWarning() {
    const laserY = Phaser.Math.Between(100, this.cameras.main.height - 100);

    const warning_left = this.rocketWarning.create(200, laserY, "laser_left");
    const warning_right = this.rocketWarning.create(
      this.cameras.main.width - 150,
      laserY,
      "laser_right"
    );
    const warning_duration = 2000;

    // Set up warning animations
    warning_left.setScale(1);
    warning_left.body.setAllowGravity(false);
    warning_left.anims.play("laser_left", true);

    warning_right.setScale(1);
    warning_right.body.setAllowGravity(false);
    warning_right.anims.play("laser_right", true);
    this.laser_active_music.play();
    // Clear warnings after duration
    this.time.delayedCall(warning_duration, () => {
      warning_left.destroy();
      warning_right.destroy();
    });

    this.time.delayedCall(1500, () => {
      // Ensure the laser is within the screen bounds
      // Fixed X position in the middle of the screen
      const laserX = this.cameras.main.width / 2;
      const laser = this.lasers.create(laserX, laserY, "laser");
      laser.setVelocityX(0);
      laser.setSize(laser.width * 0.9, laser.height * 0.6);
      laser.body.setAllowGravity(false);
      laser.anims.play("laser", true);

      this.laserActive = true; // Set laser active flag

      this.time.addEvent({
        delay: 6000, // Laser appears for 6 seconds
        callback: () => {
          laser.destroy();
          this.laser_active_music.stop();
          this.screenYRangeBlockedByLaserForSpawning = [0, 0];
        },
        callbackScope: this,
      });
      this.screenYRangeBlockedByLaserForSpawning = [laserX, laserY + 87];
    });
  }

  hitZapper(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    zapper: any
  ) {
    if (this.obstaclesInactive || this.obstaclesInvisible) return;
    if (this.shieldActive) {
      this.armorHitWithObstacle();
    } else {
      if (this.inTransition) return;
      this.inTransition = true; // running animation will be paused
      this.zapper_hit_music.play();
      this.player.setTexture("transition");
      this.player.play("player_transition");
      this.stopJetpackSound();
      this.time.delayedCall(100, () => {
        this.gameOver(this.player);
      });
    }
  }

  hitLaser(player: any, laser: any) {
    if (this.obstaclesInactive || this.obstaclesInvisible) return;
    if (this.shieldActive) {
      this.armorHitWithObstacle();
    } else {
      if (this.inTransition) return;
      this.inTransition = true; // running animation will be paused
      this.laser_active_music.play();
      this.player.setTexture("transition");
      this.player.play("player_transition");
      this.stopJetpackSound();
      this.laser_hit_music.play();
      this.time.delayedCall(100, () => {
        this.gameOver(this.player);
      });
    }
  }

  hitRocket(player: any, rocket: any) {
    if (this.obstaclesInactive || this.obstaclesInvisible) return;
    if (this.shieldActive) {
      this.armorHitWithObstacle();
    } else {
      if (this.inTransition) return;
      this.inTransition = true; // running animation will be paused
      this.rocket_launch_music.stop();
      this.player.setTexture("transition");
      this.player.play("player_transition");
      this.stopJetpackSound();
      this.rocket_hit_music.play();
      this.time.delayedCall(100, () => {
        this.gameOver(this.player);
      });
    }
  }

  armorHitWithObstacle() {
    if (this.inTransition) return;
    // Play transition animation - fire burst one
    this.inTransition = true; // running animation will be paused
    this.armor_transition_music.play();
    this.player.setTexture("transition");
    this.player.play("player_transition");

    // Remove progress bar (if it exists)
    if (this.progressBarFill && this.progressBarBackground) {
      this.progressBarFill.setVisible(false);
      this.progressBarBackground.setVisible(false);
    }
    // fix
    this.time.delayedCall(400, () => {
      this.resetPowerUpVariableForArmor();
    });
  }

  resetPowerUpVariableForArmor() {
    this.shieldActive = false;
    this.inTransition = false;
    this.character = this.previous_character;
    this.jetpack = this.previous_jetpack;
    this.player.setTexture(`${this.character}_${this.jetpack}`);
    this.gameSpeedMultiplier = 1;
    this.armorHitWithObstaclesLeft = 1;
  }

  gameOver(player: any) {
    player.disableBody(true, true);
    this.background_music.stop();
    this.inTransition = false;
    this.scene.start("GameOver", {
      coinCount: this.coinCount,
      distanceTravelled: this.distanceTravelled,
      character: this.character,
      environment: this.environment,
      jetpack: this.jetpack,
    });
  }
}
