class Dot {
  x: number;
  y: number;
  r: number;
  dR: number;
  alpha: number;
  dAlpha: number;

  constructor(
    x: number,
    y: number,
    r: number,
    dR: number,
    alpha: number,
    dAlpha: number,
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dR = dR;
    this.alpha = alpha;
    this.dAlpha = dAlpha;
  }
}

export class StarPainter {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private density = 1 / 1000;
  private count: number;
  private maxRadius = 5;
  private maxDR = this.maxRadius;
  private maxAlpha = 0.5;
  private maxDAlpha = this.maxAlpha;
  private dots: Dot[] = [];
  private timestamp: number;
  private maxDt = 0.1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d")!; // TODO Check if not null
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.strokeStyle = "black";
    this.count = this.calcCount();
    this.context.lineWidth = 1;
    this.timestamp = performance.now();

    this.redraw();
    this.createUserEvents();
    requestAnimationFrame(this.move.bind(this));
  }

  private redraw() {
    this.dots = [];

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
      const dR: number = 2 * Math.random() * this.maxDR - this.maxDR;
      const alpha: number = Math.random() * this.maxAlpha;
      const dAlpha: number =
        2 * Math.random() * this.maxDAlpha - this.maxDAlpha;

      this.dots.push(new Dot(x, y, r, dR, alpha, dAlpha));
    }
  }

  private move() {
    const updateR = (dot: Dot, dt: number) => {
      if (dot.r + dot.dR * dt < 0 || this.maxRadius < dot.r + dot.dR * dt)
        dot.dR = -dot.dR;
      dot.r += dot.dR * dt;
    };

    const updateAlpha = (dot: Dot, dt: number) => {
      if (
        dot.alpha + dot.dAlpha * dt < 0 ||
        this.maxAlpha < dot.alpha + dot.dAlpha * dt
      )
        dot.dAlpha = -dot.dAlpha;
      dot.alpha += dot.dAlpha * dt;
    };

    const getDt = () => {
      const newTimestamp = performance.now();
      const dt = (newTimestamp - this.timestamp) / 1000;
      this.timestamp = newTimestamp;
      return dt > this.maxDt ? 0 : dt;
    };

    this.clear();

    const dt = getDt();

    for (const dot of this.dots) {
      updateR(dot, dt);
      updateAlpha(dot, dt);
      const { x, y, r, alpha } = dot;
      this.context.beginPath();
      this.context.arc(x, y, r, 0, 2 * Math.PI);
      this.context.globalAlpha = alpha;
      this.context.fill();
    }

    requestAnimationFrame(this.move.bind(this));
  }

  private createUserEvents() {
    addEventListener("resize", () => this.redraw());
  }

  private calcCount() {
    return Math.round(innerWidth * innerHeight * this.density);
  }

  private clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
