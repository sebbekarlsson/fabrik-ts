import { IBone } from "./skeleton";
import { Vector, VEC } from "./vector";

export const boneMarch = (
  bone: IBone,
  target: Vector,
  isTail: boolean
): IBone => {
  let dir: Vector = bone.tail.position.sub(target).unit();

  if (isTail) {
    dir = bone.head.position.sub(target).unit();
  }

  const length = Math.abs(bone.tail.position.sub(bone.head.position).mag());

  if (length <= 0.00001) return bone;

  if (isTail) {
    bone.tail.position = target;
    bone.head.position = bone.tail.position.add(dir.scale(length));
  } else {
    bone.head.position = target;
    bone.tail.position = bone.head.position.add(dir.scale(length));
  }

  return bone;
};

export const fabrik = (
  bones: IBone[],
  target: Vector,
  fixedPoint: Vector | null | undefined = null
): IBone[] => {
  if (!fixedPoint) fixedPoint = bones[0].tail.position;

  bones[bones.length - 1] = boneMarch(bones[bones.length - 1], target, false);

  for (let i = bones.length - 2; i >= 0; i--) {
    bones[i] = boneMarch(bones[i], bones[i + 1].tail.position, false);
  }

  bones[0] = boneMarch(bones[0], fixedPoint, true);

  for (let i = 1; i < bones.length; i++) {
    bones[i] = boneMarch(bones[i], bones[i - 1].head.position, true);
  }
  return bones;
};
