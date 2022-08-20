import {Component, OnInit} from '@angular/core';
import {FadeAnimationUtil} from 'src/app/utils/animation/fade-animation.util';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  readonly FadeAnimationUtil = FadeAnimationUtil;

  constructor() { }

  ngOnInit(): void {
  }

}
