import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';
import {
  defaultAnimationDuration,
  defaultPerspectiveDistance, defaultRotateDegree,
  StateChangeExpression
} from './animation.constant';

export const flipLeft: AnimationTriggerMetadata = trigger('flipLeft', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'perspective({{perspectiveDistance}}px) rotateY(-{{rotateDegree}}deg)'}),
    animate(
      '{{animationDuration}}ms',
      style({transform: 'perspective({{perspectiveDistance}}px) rotateY(0)'})
    )
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      perspectiveDistance: defaultPerspectiveDistance,
      rotateDegree: defaultRotateDegree
    }
  })
]);

export const flipRight: AnimationTriggerMetadata = trigger('flipRight', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'perspective({{perspectiveDistance}}px) rotateY({{rotateDegree}}deg)'}),
    animate(
      '{{animationDuration}}ms',
      style({transform: 'perspective({{perspectiveDistance}}px) rotateY(0)'})
    )
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      perspectiveDistance: defaultPerspectiveDistance,
      rotateDegree: defaultRotateDegree
    }
  })
]);

export const flipUp: AnimationTriggerMetadata = trigger('flipUp', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'perspective({{perspectiveDistance}}px) rotateY(-{{rotateDegree}}deg)'}),
    animate(
      '{{animationDuration}}ms',
      style({transform: 'perspective({{perspectiveDistance}}px) rotateX(0)'})
    )
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      perspectiveDistance: defaultPerspectiveDistance,
      rotateDegree: defaultRotateDegree
    }
  })
]);

export const flipDown: AnimationTriggerMetadata = trigger('flipDown', [
  transition(StateChangeExpression.ENTER, [
    style({transform: 'perspective({{perspectiveDistance}}px) rotateY({{rotateDegree}}deg)'}),
    animate(
      '{{animationDuration}}ms',
      style({transform: 'perspective({{perspectiveDistance}}px) rotateX(0)'})
    )
  ], {
    params: {
      animationDuration: defaultAnimationDuration,
      perspectiveDistance: defaultPerspectiveDistance,
      rotateDegree: defaultRotateDegree
    }
  })
]);
