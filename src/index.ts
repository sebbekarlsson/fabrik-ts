import "./style.css";

import { setupApp, IApp } from "./app";
import { createArmSkeleton, ISkeleton, IBone, IJoint } from "./skeleton";
import { fabrik } from "./fabrik";
import { COLORS } from "./colors";
import { Vector, VEC } from "./vector";
import { drawLine, drawText } from "./draw";

let armSkeleton: ISkeleton | null = null;

const drawSkeleton = (app: IApp, skeleton: ISkeleton) => {
  const { ctx } = app.canvas;

  for (let i = 0; i < skeleton.bones.length; i++) {
    const bone = skeleton.bones[i];
    const color = COLORS[i % COLORS.length];

    drawLine(
      ctx,
      { color: color, lineWidth: 10 },
      bone.head.position,
      bone.tail.position
    );
  }
};

const app = setupApp("canvas", {
  init: (app: IApp) => {
    const viewport = app.minViewport();
    const half = viewport.scale(0.5);
    armSkeleton = createArmSkeleton({
      boneCount: 32,
      boneLength: 16,
      origin: half,
    });
  },
  update: (app: IApp) => {
    if (!armSkeleton) return;
    const mouse = app.mouse;
    const target: Vector = mouse.position;

    if (mouse.pressed) {
      armSkeleton.bones = fabrik(armSkeleton.bones, target);
    }
  },
  draw: (app: IApp) => {
    if (!armSkeleton) return;
    const mouse = app.mouse;

    if (!mouse.pressed) {
      drawText(
        app.canvas.ctx,
        { fontSize: 16, color: "#c8d6e5" },
        "Press and hold left mouse button.",
        VEC(8 * 2, 16 * 2, 0)
      );
    }

    drawSkeleton(app, armSkeleton);
  },
})();
