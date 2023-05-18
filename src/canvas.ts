export interface ICanvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}

export const setupCanvas = (canvas: HTMLCanvasElement): ICanvas => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const ctx = canvas.getContext("2d");

  return { canvas, ctx };
};
