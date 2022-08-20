import {Component, OnInit} from '@angular/core';
import {FadeAnimationUtil} from "../../utils/animation/fade-animation.util";

interface Experience {
  jobTitle: string;
  companyName: string;
  startDate: string;
  techStack: string;
  endDate: string;
  description: string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  readonly FadeAnimationUtil = FadeAnimationUtil;

  experiences: Experience[] = [];

  constructor() {}

  ngOnInit(): void {
    this.experiences = [
      {
        jobTitle: 'Java Intern',
        companyName: 'Cedar Gate Technologies',
        startDate: 'January 2021',
        endDate: 'July 2021',
        techStack: 'Java / Grails / Groovy / GSP / AWS',
        description: 'Worked on two major products Deerwalk Care Manager and Deerwalk Health Portal'
      },
      {
        jobTitle: 'Software Engineer I',
        companyName: 'Cotiviti Nepal',
        startDate: 'August 2021',
        endDate: 'Present',
        techStack: 'Java / Spring / SQL / TypeScript / Angular / D3.js',
        description: 'Working on Medical Intelligence'
      }
    ];
  }
}
