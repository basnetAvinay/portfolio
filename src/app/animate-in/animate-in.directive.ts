import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AnimationBuilder, AnimationFactory, AnimationPlayer} from '@angular/animations';
import {ObserverService} from './observer.service';

@Directive({
  selector: '[animateIn]'
})
export class AnimateInDirective implements OnInit {

  @Input() animateInAnimation;
  player: AnimationPlayer;

  constructor(private observerService: ObserverService,
              private el: ElementRef,
              private animationBuilder: AnimationBuilder) {
  }

  ngOnInit() {
    let animation: AnimationFactory;

    if (this.animateInAnimation) {
      animation = this.animationBuilder.build(this.animateInAnimation);
    }

    if (this.observerService.isSupported()) {
      this.player = animation.create(this.el.nativeElement);
      this.player.init();
      this.observerService.addTarget(this.el.nativeElement, this.startAnimating.bind(this));
    }
  }

  /**
   * Builds and triggers the animation
   * when it enters the viewport
   * @param {boolean} inViewport
   */
  startAnimating(inViewport: boolean) {
    if (inViewport) {
      this.player.play();
    }
  }

}
