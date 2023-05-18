import { Vector, VEC } from "./vector";
import { ISkeletonTree, ISkeleton, IBone, IJoint } from "./skeleton";

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

const boneMaterial: IMaterial = {
  color: "#FFFFFF",
  lineWidth: 2,
};

const jointMaterial: IMaterial = {
  color: "#FF0000",
  lineWidth: 1,
};

export const drawJoint = (ctx: CanvasRenderingContext2D, joint: IJoint) => {
  drawCross(ctx, jointMaterial, joint.position);
};

export const drawBone = (
  ctx: CanvasRenderingContext2D,
  bone: IBone,
  color?: string
) => {
  drawLine(
    ctx,
    { ...boneMaterial, color: color || boneMaterial.color },
    bone.head.position,
    bone.tail.position
  );
  //  drawJoint(ctx, bone.head);
  //  drawJoint(ctx, bone.tail);
};

export const drawSkeleton = (
  ctx: CanvasRenderingContext2D,
  skeleton: ISkeleton,
  color?: string
) => {
  skeleton.bones.forEach((bone) => {
    drawBone(ctx, bone, color);
  });
};

export const drawSkeletonTree = (
  ctx: CanvasRenderingContext2D,
  skeletonTree: ISkeletonTree,
  color?: string
) => {
  drawSkeleton(ctx, skeletonTree.base, color);
  skeletonTree.deps.forEach((depSkeletonTree) => {
    drawSkeletonTree(ctx, depSkeletonTree, "red");
  });
};
