import { ICanvas, setupCanvas } from "./canvas";
import { Vector, VEC } from "./vector";
import { IMouse } from "./mouse";

export type FApplicationUpdate = (app: IApp) => void;
export type FApplicationDraw = (app: IApp) => void;
export type FApplicationInit = (app: IApp) => void;

export interface IAppConfig {
  draw?: FApplicationDraw;
  update?: FApplicationUpdate;
  init?: FApplicationInit;
}

const defaultConfig: IAppConfig = {};

export interface IApp {
  canvas: ICanvas;
  config: IAppConfig;
  minViewport: () => Vector;
  maxViewport: () => Vector;
  mouse: IMouse;
}

export const setupApp = (
  canvasID: string,
  config: IAppConfig = defaultConfig
) => {
  const canvasElement: HTMLCanvasElement = document.getElementById(
    canvasID
  ) as HTMLCanvasElement;
  if (!canvasElement) {
    throw new Error("Canvas element not found.");
  }

  const canvas = setupCanvas(canvasElement);

  const getMinViewport = () => VEC(canvas.canvas.width, canvas.canvas.height);
  const getMaxViewport = () => {
    const rect = canvas.canvas.getBoundingClientRect();
    return VEC(rect.width, rect.height);
  };

  let app: IApp = {
    canvas,
    config,
    minViewport: getMinViewport,
    maxViewport: getMaxViewport,
    mouse: { position: VEC(0, 0, 0), pressed: false },
  };

  return () => {
    const update = (app: IApp) => {
      if (config.update) {
        config.update(app);
      }
    };

    const draw = (app: IApp) => {
      const viewport = app.minViewport();
      app.canvas.ctx.fillStyle = "black";
      app.canvas.ctx.clearRect(0, 0, viewport.x, viewport.y);
      app.canvas.ctx.fillRect(0, 0, viewport.x, viewport.y);
      if (config.draw) {
        config.draw(app);
      }
    };

    const loop = (app: IApp) => {
      update(app);
      draw(app);
      requestAnimationFrame(() => loop(app));
    };

    const onMouseMove = (e: MouseEvent) => {
      const minViewport = getMinViewport();
      const maxViewport = getMaxViewport();

      const scaleX = minViewport.x / maxViewport.x;
      const scaleY = minViewport.y / maxViewport.y;
      const rect = canvas.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * scaleX;
      const y = /*maxViewport.y - */ (e.clientY - rect.top) * scaleY;
      app.mouse.position.x = x;
      app.mouse.position.y = y;
    };

    const onMouseDown = (e: MouseEvent) => {
      app.mouse.pressed = true;
    };

    const onMouseUp = (e: MouseEvent) => {
      app.mouse.pressed = false;
    };

    canvas.canvas.addEventListener("mousemove", onMouseMove);
    canvas.canvas.addEventListener("mousedown", onMouseDown);
    canvas.canvas.addEventListener("mouseup", onMouseUp);

    if (app.config.init) {
      app.config.init(app);
    }
    loop(app);
  };
};
