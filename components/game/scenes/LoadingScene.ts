import { Scene } from "phaser";

export class LoadingScene extends Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;
  private logo!: Phaser.GameObjects.Image;
  private readonly STEPS = 4;
  private currentProgress = 0;
  private targetProgress = 0;

  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    this.cameras.main.setBackgroundColor("#000000");
    this.createLoadingBar();

    this.simulateLoadingWithDelay();
    this.load.image("conso-jetpack-logo", "conso-jetpack-logo.png");
  }

  create() {
    const screenCenterX = this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.height / 2;

    this.logo = this.add.image(
      screenCenterX,
      screenCenterY - 100,
      "conso-jetpack-logo"
    );
    this.logo.setScale(0.5);
  }

  simulateLoadingWithDelay() {
    const stepValues = [0.25, 0.5, 0.75, 1];
    let currentStep = 0;

    const progressStep = () => {
      if (currentStep < stepValues.length) {
        this.targetProgress = stepValues[currentStep];
        this.tweens.add({
          targets: this,
          currentProgress: this.targetProgress,
          duration: 300,
          ease: "Linear",
          onUpdate: () => {
            this.updateLoadingBar(this.currentProgress);
          },
          onComplete: () => {
            if (currentStep < stepValues.length - 1) {
              this.time.delayedCall(500, () => {
                currentStep++;
                progressStep();
              });
            } else {
              this.scene.start("MainGame");
            }
          },
        });
      }
    };

    // Start the first step after a short delay
    this.time.delayedCall(500, progressStep);
  }

  createLoadingBar() {
    const width = 400;
    const height = 30;
    const x = (this.cameras.main.width - width) / 2;
    const y = (this.cameras.main.height + 150) / 2;

    // Background bar
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x2a2a2a, 1);
    this.loadingBar.fillRoundedRect(x - 2, y - 2, width + 4, height + 4, 5);

    // Progress bar
    this.progressBar = this.add.graphics();

    // Draw step divisions
    const stepWidth = width / this.STEPS;
    for (let i = 1; i < this.STEPS; i++) {
      this.loadingBar.fillStyle(0x1a1a1a, 1);
      this.loadingBar.fillRect(x + stepWidth * i - 1, y - 2, 2, height + 4);
    }

    // Loading text
    this.loadingText = this.add
      .text(this.cameras.main.width / 2, y + 50, "Loading...", {
        fontSize: "28px",
        color: "#FFFFFF",
        lineSpacing: 0.5,
        fontFamily: "handjet",
      })
      .setOrigin(0.5);
  }

  updateLoadingBar(value: number) {
    const width = 400;
    const height = 30;
    const x = (this.cameras.main.width - width) / 2;
    const y = (this.cameras.main.height + 150) / 2;

    // Calculate which step we're on (0-3)
    const currentStep = Math.floor(value * this.STEPS);
    const stepWidth = width / this.STEPS;

    this.progressBar.clear();
    this.progressBar.fillStyle(0x00ff00, 1);

    // Fill up to the current step
    if (currentStep > 0) {
      this.progressBar.fillRoundedRect(
        x,
        y,
        stepWidth * currentStep,
        height,
        5
      );
    }

    // Fill the current step based on progress within that step
    const stepProgress = (value * this.STEPS) % 1;
    const currentStepWidth = stepWidth * stepProgress;
    if (currentStepWidth > 0) {
      const startX = x + stepWidth * currentStep;
      const isFirstStep = currentStep === 0;
      const isLastStep = currentStep === this.STEPS - 1;

      this.progressBar.fillRoundedRect(startX, y, currentStepWidth, height, {
        tl: isFirstStep ? 5 : 0,
        tr: isLastStep && stepProgress === 1 ? 5 : 0,
        bl: isFirstStep ? 5 : 0,
        br: isLastStep && stepProgress === 1 ? 5 : 0,
      });
    }

    // Update loading text with current step
    const stepTexts = [
      "Initializing",
      "Loading Assets",
      "Preparing Game",
      "Finalizing",
    ];
    const currentStepText = stepTexts[Math.min(currentStep, this.STEPS - 1)];
    const percent = Math.round(value * 100);
    this.loadingText.setText(`${currentStepText}... ${percent}%`);
  }
}
