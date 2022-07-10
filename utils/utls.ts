export type Point = { x: number; y: number };
export interface LineCoords {
  a: Point;
  b: Point;
}

export const calculateX = (
  start: number,
  length: number,
  angleInRadians: number
): number => start + length * Math.cos(angleInRadians);

export const calculateY = (
  start: number,
  length: number,
  angleInRadians: number
): number => start + length * Math.sin(angleInRadians);

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const lerp = (start: number, end: number, value: number) => {
  return (1 - value) * start + value * end;
};

export const invLerp = (start: number, end: number, value: number) =>
  clamp((value - start) / (end - value));

export const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const createPoint = (x: number, y: number): Point => ({ x, y });

export function pointOnCircle(center: Point, radius: number, angle: number) {
  return {
    x: calculateX(center.x, radius, toRadians(angle * -1)),
    y: calculateY(center.y, radius, toRadians(angle * -1)),
  };
}

export const projectPoint = (
  point: Point,
  length: number,
  angleInRadians: number
): Point =>
  createPoint(
    calculateX(point.x, length, angleInRadians),
    calculateY(point.y, length, angleInRadians)
  );
export const createLine = (
  origin: Point,
  length: number,
  angle = 0
): LineCoords => ({
  a: origin,
  b: projectPoint(origin, length, angle),
});

export function toDegrees(angleInRadians: number) {
  return angleInRadians * (180 / Math.PI);
}

export function toRadians(angleInDegrees: number) {
  return angleInDegrees * (Math.PI / 180);
}
