export const VEC = (x: number = 0, y: number = 0, z: number = 0): Vector =>
  new Vector(x, y, z);

export class Vector {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(other: Vector) {
    return VEC(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  sub(other: Vector) {
    return VEC(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  scale(scalar: number) {
    return VEC(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  mag() {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
  }

  // alias for mag()
  length() {
    return this.mag();
  }

  unit() {
    let mag = this.mag();
    if (mag === 0.0 || isNaN(mag) || mag === Infinity) return VEC(0, 0, 0);
    return VEC(this.x / mag, this.y / mag, this.z / mag);
  }
}
