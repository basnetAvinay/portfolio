import {Component, OnDestroy, OnInit} from '@angular/core';
import {FadeAnimationUtil} from 'src/app/utils/animation/fade-animation.util';
import {FadeAnimationParams} from '../../animate-in/animation.constant';
import {ActivatedRoute, IsActiveMatchOptions} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  readonly FadeAnimationUtil = FadeAnimationUtil;

  fadeUpAnimation: FadeAnimationParams = {animationDuration: 500, distance: 100};
  isMenuOpen = true;
  activeFragment = '';
  linkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  private unsubscribe = new Subject<void>();

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.fragment.pipe(takeUntil(this.unsubscribe)).subscribe(v => {
      console.log(v);
      this.activeFragment = v;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
