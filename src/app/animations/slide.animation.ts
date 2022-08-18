import {
  animate,
  AnimationAnimateMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger
} from '@angular/animations';
import {defaultAnimationDuration, defaultSlidePercentage, StateChangeExpression} from './animation.constant';

const defaultSlideAnimate: AnimationAnimateMetadata = animate(
  '{{animationDuration}}ms',
  style({transform: 'translate3d(0, 0, 0)'})
);

export const slideUp: AnimationTriggerMetadata = trigger('slideUp', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'translate3d(0, {{slidePercentage}}%, 0)'}),
    defaultSlideAnimate
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      slidePercentage: defaultSlidePercentage
    }
  })
]);

export const slideDown: AnimationTriggerMetadata = trigger('slideDown', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'translate3d(0, -{{slidePercentage}}%, 0)'}),
    defaultSlideAnimate
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      slidePercentage: defaultSlidePercentage
    }
  })
]);

export const slideRight: AnimationTriggerMetadata = trigger('slideRight', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'translate3d(-{{slidePercentage}}%, 0, 0)'}),
    defaultSlideAnimate
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      slidePercentage: defaultSlidePercentage
    }
  })
]);

export const slideLeft: AnimationTriggerMetadata = trigger('slideLeft', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'translate3d({{slidePercentage}}%, 0, 0)'}),
    defaultSlideAnimate
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      slidePercentage: defaultSlidePercentage
    }
  })
]);
