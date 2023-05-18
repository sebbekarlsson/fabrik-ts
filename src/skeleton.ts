import { Vector, VEC } from "./vector";

export interface IJoint {
  position: Vector;
  /*
    Can possibly hold more information:
    rotation, scale, constraints etc...
  */
}

export interface IBone {
  head: IJoint;
  tail: IJoint;
}

export interface ISkeleton {
  bones: IBone[];
}

export interface ISkeletonArmConfig {
  boneCount: number;
  boneLength: number;
  origin: Vector;
}

export const createArmSkeleton = (cfg: ISkeletonArmConfig): ISkeleton => {
  let bones: IBone[] = [];

  let pos: Vector = cfg.origin;

  for (let i = 0; i < cfg.boneCount; i++) {
    let tail: IJoint = { position: pos };

    let v = i * 20.0;

    // Let's just randomize the initial positions a bit
    let x = Math.cos(v) * cfg.boneLength;
    let y = Math.sin(v) * cfg.boneLength;
    x += (Math.random() * 2.0 - 1.0) * (cfg.boneLength * 0.5);
    y += (Math.random() * 2.0 - 1.0) * (cfg.boneLength * 0.5);

    pos = pos.add(VEC(x, y, 0));

    let head: IJoint = { position: pos };

    bones.push({ head, tail });
  }

  return { bones };
};
