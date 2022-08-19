import {Component} from '@angular/core';
import {FadeAnimationUtil} from '../../utils/animation/fade-animation.util';
import {FadeAnimationParams} from '../../animate-in/animation.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly FadeAnimationUtil = FadeAnimationUtil;

  isMenuOpen = true;
  fadeUpAnimation: FadeAnimationParams = {animationDuration: 1000, distance: 300};

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
