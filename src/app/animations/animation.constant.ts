export enum StateChangeExpression {
  ENTER = ':enter',
  LEAVE = ':leave'
}

export interface AnimationParams {
  value: StateChangeExpression;
  params: FadeAnimationParams | ZoomAnimationParams | SlideAnimationParams;
}

export interface AnimateDuration {
  animationDuration: number; // e.g, animation duration in millisecond
}

export interface FadeAnimationParams extends AnimateDuration {
  distance: number; // e.g, 200
}

export interface ZoomAnimationParams extends FadeAnimationParams {
  zoomInOrOutScale: number; // e.g, 0.8
}

export interface SlideAnimationParams extends AnimateDuration {
  slidePercentage: number; // e.g, 80
}

export interface FlipAnimationParams extends AnimateDuration {
  perspectiveDistance: number;
  rotateDegree: number;
}

export const defaultZoomInScale = 0.6;
export const defaultZoomOutScale = 1.2;
export const defaultDistance = 100;
export const defaultAnimationDuration = 500;
export const defaultSlidePercentage = 100;
export const defaultPerspectiveDistance = 2500;
export const defaultRotateDegree = 100;
