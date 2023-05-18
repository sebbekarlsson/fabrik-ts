import "./style.css";
import { setupApp, IApp } from "./app";
import { createArmWithFingers, ISkeletonTree } from "./skeleton";
import { fabrikTree } from "./fabrik";
import { COLORS } from "./colors";
import { Vector, VEC } from "./vector";
import { drawSkeletonTree, drawCross, drawText } from "./draw";

let armSkeleton: ISkeletonTree | null = null;

const app = setupApp("canvas", {
  init: (app: IApp) => {
    const viewport = app.minViewport();
    const half = viewport.scale(0.5);
    armSkeleton = createArmWithFingers({
      armConfig: {
        boneCount: 8,
        boneLength: 60,
        origin: half,
      },
      fingerCount: 5,
      fingerConfig: {
        boneCount: 3,
        boneLength: 20,
      },
    });
  },
  update: (app: IApp) => {
    if (!armSkeleton) return;
    const mouse = app.mouse;
    const target: Vector = mouse.position;

    if (mouse.pressed) {
      armSkeleton = fabrikTree(armSkeleton, target);
    }
  },
  draw: (app: IApp) => {
    if (!armSkeleton) return;

    // 1. Draw skeleton
    drawSkeletonTree(app.canvas.ctx, armSkeleton);

    const mouse = app.mouse;
    const mousePos = mouse.position;
    const minViewport = app.minViewport();
    const maxViewport = app.maxViewport();
    const dx = minViewport.x / maxViewport.x;
    const dy = minViewport.y / maxViewport.y;

    // 2. Draw mouse cross
    drawCross(app.canvas.ctx, { lineWidth: 2 }, mousePos, dx * 64);

    // 3. Draw help text
    if (!mouse.pressed) {
      const fontSize = 24.0 * dx;

      drawText(
        app.canvas.ctx,
        { fontSize: fontSize, color: "#c8d6e5" },
        "Press and hold left mouse button.",
        VEC(dx * 8 * 2, dy * 16 * 2, 0)
      );
    }
  },
})();
