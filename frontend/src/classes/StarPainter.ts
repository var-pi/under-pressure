export class StarPainter {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private density = 1 / 1000;
  private count: number;
  private maxRadius = 5;
  private maxAlpha = 0.5;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d")!; // TODO Check if not null
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.strokeStyle = "black";
    this.count = this.calcCount();
    this.context.lineWidth = 1;

    this.redraw();
    this.createUserEvents();
  }

  private redraw() {
    console.log(this.context);

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.count = this.calcCount();

    this.context.fillStyle = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--col-fg-accent");

    for (let i = 0; i < this.count; i++) {
      const x: number = Math.random() * innerWidth;
      const y: number = Math.random() * innerHeight;
      const r: number = Math.random() * this.maxRadius;
      const alpha: number = Math.random() * this.maxAlpha;

      this.context.beginPath();
      this.context.arc(x, y, r, 0, 2 * Math.PI);
      this.context.globalAlpha = alpha;
      this.context.fill();
    }
  }

  private createUserEvents() {
    addEventListener("resize", () => this.redraw());
    // Register event handlers (e.g., mouse down, move, up)
    // Update clickX, clickY, and clickDrag arrays
    // Call redraw() to update the canvas
  }

  private calcCount() {
    return Math.round(innerWidth * innerHeight * this.density);
  }
}
