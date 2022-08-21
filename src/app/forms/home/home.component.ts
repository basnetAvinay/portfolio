import {Component} from '@angular/core';
import {FadeAnimationUtil} from '../../utils/animation/fade-animation.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly FadeAnimationUtil = FadeAnimationUtil;
}
