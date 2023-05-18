import { Vector, VEC } from "./vector";

export interface IMaterial {
  color?: string;
  font?: string;
  fontSize?: number;
  lineWidth?: number;
}

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  material: IMaterial,
  start: Vector,
  end: Vector
) => {
  const color = material.color || "#FFFFFF";

  ctx.save();

  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = material.lineWidth || 10;

  ctx.beginPath();

  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);

  ctx.closePath();
  ctx.stroke();

  ctx.restore();
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  material: IMaterial,
  text: string,
  position: Vector
) => {
  const color = material.color || "#FFFFFF";
  const font = material.font || "Sans-Serif";
  const fontSize = Math.round(material.fontSize || 10);

  ctx.save();

  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  ctx.font = `${fontSize}px ${font}`;
  ctx.fillText(text, position.x, position.y);

  ctx.restore();
};

export const drawCross = (
  ctx: CanvasRenderingContext2D,
  material: IMaterial,
  pos: Vector,
  length: number = 100
) => {
  drawLine(
    ctx,
    material,
    pos.add(VEC(-length / 2, 0, 0)),
    pos.add(VEC(length / 2, 0, 0))
  );
  drawLine(
    ctx,
    material,
    pos.add(VEC(0, -length / 2, 0)),
    pos.add(VEC(0, length / 2, 0))
  );
};
