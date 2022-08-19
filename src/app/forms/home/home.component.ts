import {Component, OnInit} from '@angular/core';
import {fadeDown, fadeLeft, fadeRight, fadeUp, fadeUpLeft, fadeUpRight} from '../../animations/fade.animation';
import {AnimationParams, StateChangeExpression} from '../../animations/animation.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeLeft, fadeRight, fadeUp, fadeDown, fadeUpLeft, fadeUpRight]
})
export class HomeComponent implements OnInit {

  isMenuOpen = true;
  fadeUpAnimation: AnimationParams = {
    value: StateChangeExpression.ENTER,
    params: {animationDuration: 1000, distance: 300}
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
