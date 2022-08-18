import {Component, OnInit} from '@angular/core';
import {fadeUp} from '../../animations/fade.animation';
import {AnimationParams, StateChangeExpression, ZoomAnimationParams} from '../../animations/animation.constant';
import {zoomIn} from '../../animations/zoom.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeUp,
    zoomIn
  ]
})
export class HomeComponent implements OnInit {

  isMenuOpen = true;
  fadeUpAnimation: AnimationParams = {
    value: StateChangeExpression.ENTER,
    params: {animationDuration: 500, distance: 150}
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
