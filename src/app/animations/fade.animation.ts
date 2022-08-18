import {
  animate,
  AnimationAnimateMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger
} from '@angular/animations';
import {defaultAnimationDuration, defaultDistance, StateChangeExpression} from './animation.constant';

const defaultFadeAnimate: AnimationAnimateMetadata = animate(
  '{{animationDuration}}ms',
  style({opacity: 1, transform: 'translate3d(0, 0, 0)'})
);

export const fadeUp: AnimationTriggerMetadata = trigger('fadeUp', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(0, {{distance}}px, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);

export const fadeDown: AnimationTriggerMetadata = trigger('fadeDown', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(0, -{{distance}}px, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);

export const fadeRight: AnimationTriggerMetadata = trigger('fadeRight', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(-{{distance}}px, 0, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);

export const fadeLeft: AnimationTriggerMetadata = trigger('fadeLeft', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d({{distance}}px, 0, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);

export const fadeUpRight: AnimationTriggerMetadata = trigger('fadeUpRight', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(-{{distance}}px, {{distance}}px, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);

export const fadeUpLeft: AnimationTriggerMetadata = trigger('fadeUpLeft', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d({{distance}}px, {{distance}}px, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);

export const fadeDownRight: AnimationTriggerMetadata = trigger('fadeDownRight', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d(-{{distance}}px, -{{distance}}px, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);

export const fadeDownLeft: AnimationTriggerMetadata = trigger('fadeDownLeft', [
  transition(StateChangeExpression.ENTER, [
    style({opacity: 0, transform: 'translate3d({{distance}}px, -{{distance}}px, 0)'}),
    defaultFadeAnimate
  ], {params: {distance: defaultDistance, animationDuration: defaultAnimationDuration}})
]);
