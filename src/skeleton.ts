import { Vector, VEC } from "./vector";

export interface ISkeletonTree {
  base: ISkeleton;
  deps: ISkeletonTree[];
}

export interface ISkeletonArmConfig {
  boneCount: number;
  boneLength: number;
  origin: Vector;
}

export interface IFingerConfig {
  boneCount: number;
  boneLength: number;
}

export interface IArmWithFingersConfig {
  armConfig: ISkeletonArmConfig;
  fingerCount: number;
  fingerConfig: IFingerConfig;
}

export interface IJoint {
  position: Vector;
  resting: Vector;
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

export interface ISkeletonTree {
  base: ISkeleton;
  deps: ISkeletonTree[];
}
export const createArmSkeleton = (cfg: ISkeletonArmConfig): ISkeleton => {
  let bones: IBone[] = [];

  let pos: Vector = cfg.origin;

  for (let i = 0; i < cfg.boneCount; i++) {
    let tail: IJoint = {
      position: pos,
      resting: Vector.random2D().scale(16.0),
    };

    pos = pos.add(VEC(0, cfg.boneLength, 0));

    let head: IJoint = { position: pos, resting: VEC(0.0) };

    bones.push({ head, tail });
  }

  return { bones };
};

export interface ISkeletonTree {
  base: ISkeleton;
  deps: ISkeletonTree[];
}

export const createArmWithFingers = (
  cfg: IArmWithFingersConfig
): ISkeletonTree => {
  let arm: ISkeleton = createArmSkeleton(cfg.armConfig);

  let fingers: ISkeletonTree[] = [];

  for (let i = 0; i < cfg.fingerCount; i++) {
    let finger: ISkeleton = createArmSkeleton({
      ...cfg.fingerConfig,
      boneLength: cfg.armConfig.boneLength * 0.5,
      origin: arm.bones[arm.bones.length - 1].tail.position
    });

    fingers.push({
      base: finger,
      deps: [],
    });
  }

  return {
    base: arm,
    deps: fingers,
  };
};
