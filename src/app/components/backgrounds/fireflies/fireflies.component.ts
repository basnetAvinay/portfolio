import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fireflies',
  templateUrl: './fireflies.component.html',
  styleUrls: ['./fireflies.component.scss']
})
export class FirefliesComponent implements OnInit {

  readonly fireflyCount = 15;

  constructor() { }

  ngOnInit(): void {
  }

}
