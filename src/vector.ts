export const VEC = (x: number = 0, y: number = 0, z: number = 0): Vector =>
  new Vector(x, y, z);

const isZero = (v: number) => Math.abs(v) <= 0.0001;

export class Vector {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static random2D() {
    return VEC(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0, 0);
  }

  static random3D() {
    return VEC(
      Math.random() * 2.0 - 1.0,
      Math.random() * 2.0 - 1.0,
      Math.random() * 2.0 - 1.0
    );
  }

  add(other: Vector) {
    return VEC(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  sub(other: Vector) {
    return VEC(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  mul(other: Vector) {
    return VEC(this.x * other.x, this.y * other.y, this.z * other.z);
  }

  dot(b: Vector) {
    const a = this;
    const dot_x = a.x * b.x;
    const dot_y = a.y * b.y;
    const dot_z = a.z * b.z;
    return dot_x + dot_y + dot_z;
  }

  distance2D(b: Vector) {
    const a = this;
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  distance3D(b: Vector) {
    const a = this;
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
    );
  }

  distance(b: Vector) {
    return this.distance3D(b);
  }

  inv() {
    return VEC(
      isZero(this.x) ? 0.0 : 1.0 / this.x,
      isZero(this.y) ? 0.0 : 1.0 / this.y,
      isZero(this.z) ? 0.0 : 1.0 / this.z
    );
  }

  /*
    float vector3_distance3d(Vector3 a, Vector3 b) {
    return sqrtf(powf(a.x - b.x, 2) + powf(a.y - b.y, 2) + powf(a.z - b.z, 2));
    }

    float vector3_distance2d(Vector3 a, Vector3 b) {
    return (hypotf(b.x - a.x, b.y - a.y));
    }
  */

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
