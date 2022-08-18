import {
  animate,
  AnimationAnimateMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  defaultAnimationDuration,
  defaultDistance,
  defaultZoomInScale, defaultZoomOutScale,
  StateChangeExpression
} from './animation.constant';

const defaultZoomAnimate: AnimationAnimateMetadata = animate(
  '{{animationDuration}}ms',
  style({opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)'})
);

export const zoomIn: AnimationTriggerMetadata = trigger('zoomIn', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {params: {zoomInOrOutScale: defaultZoomInScale, animationDuration: defaultAnimationDuration}})
]);

export const zoomInUp: AnimationTriggerMetadata = trigger('zoomInUp', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(0, {{distance}}px, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomInScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomInDown: AnimationTriggerMetadata = trigger('zoomInDown', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(0, -{{distance}}px, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomInScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomInRight: AnimationTriggerMetadata = trigger('zoomInRight', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(-{{distance}}px, 0, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomInScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomInLeft: AnimationTriggerMetadata = trigger('zoomInLeft', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d({{distance}}px, 0, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomInScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomOut: AnimationTriggerMetadata = trigger('zoomOut', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomOutScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomOutUp: AnimationTriggerMetadata = trigger('zoomOutUp', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(0, {{distance}}px, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomOutScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomOutDown: AnimationTriggerMetadata = trigger('zoomOutUp', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(0, -{{distance}}px, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomOutScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomOutRight: AnimationTriggerMetadata = trigger('zoomOutRight', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(-{{distance}}px, 0, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomOutScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);

export const zoomOutLeft: AnimationTriggerMetadata = trigger('zoomOutLeft', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d({{distance}}px, 0, 0) scale({{zoomInOrOutScale}})'}),
    defaultZoomAnimate
  ], {
    params: {
      zoomInOrOutScale: defaultZoomOutScale,
      distance: defaultDistance,
      animationDuration: defaultAnimationDuration
    }
  })
]);
