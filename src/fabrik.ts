import { IBone } from "./skeleton";
import { Vector, VEC } from "./vector";
import { ISkeletonTree } from "./skeleton";

const EPSILON = 0.00033;

export const boneMarch = (
  bone: IBone,
  target: Vector,
  isTail: boolean
): IBone => {
  let dir: Vector = VEC(0.0);

  if (isTail) {
    dir = bone.head.position.sub(target);
  } else {
    dir = bone.tail.position.sub(target);
  }

  if (dir.mag() <= EPSILON) return bone;

  dir = dir.unit();

  const length = Math.abs(bone.tail.position.sub(bone.head.position).mag());

  if (length <= EPSILON) return bone;

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

export const fabrikTree = (
  skeletonTree: ISkeletonTree,
  target: Vector,
  fixedPoint: Vector | null | undefined = null
): ISkeletonTree => {
  const bones = skeletonTree.base.bones;

  if (!fixedPoint) fixedPoint = bones[0].tail.position;

  bones[bones.length - 1] = boneMarch(bones[bones.length - 1], target, false);

  for (let i = bones.length - 2; i >= 0; i--) {
    bones[i] = boneMarch(bones[i], bones[i + 1].tail.position, false);
  }

  bones[0] = boneMarch(bones[0], fixedPoint, true);

  for (let i = 1; i < bones.length; i++) {
    bones[i] = boneMarch(bones[i], bones[i - 1].head.position, true);
  }

  const newBasePos = bones[bones.length - 1].head.position;

  const newDeps = skeletonTree.deps.map((dep, i) => {
    const resting = dep.base.bones[0].tail.resting;

    return fabrikTree(dep, target, newBasePos.add(resting));
  });

  return {
    base: { bones: bones },
    deps: newDeps,
  };
};
