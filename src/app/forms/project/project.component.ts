import {Component, OnInit} from '@angular/core';
import {FadeAnimationUtil} from '../../utils/animation/fade-animation.util';

interface Project {
  title: string;
  techStack: string;
  description: string;
  buttonName: string;
  projectLink: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  readonly FadeAnimationUtil = FadeAnimationUtil;

  projects: Project[] = [];

  constructor() {}

  ngOnInit(): void {
    this.projects = [
      {
        title: 'Voice Based Coding Environment',
        techStack: 'Node / Flask / NLP / Bravey',
        description: 'An AI-based code editor that allows you to code parallelly in Javascript and Python just by conversing with it.',
        buttonName: 'View Project',
        projectLink: 'https://drive.google.com/drive/folders/1QNrUSxPe8GDF56nKjxxqszkAXzx7R3yd'
      },
      {
        title: 'Researchers Hub',
        techStack: 'Django / Bootstrap',
        description: 'Online tool where distributed researchers can work together within a shared workspace to perform systematic literature review.',
        buttonName: 'Download Report',
        projectLink: 'https://github.com/basnetAvinay/researchersHub/blob/master/ResearchersHub_Report_Final.pdf'
      },
      {
        title: 'COVID-19 Analytics',
        techStack: 'Spring Boot',
        description: 'Interactive web app that updates daily to keep track of the coronavirus cases.',
        buttonName: 'View Site',
        projectLink: 'https://corona-virus-analytics.herokuapp.com/'
      },
    ];
  }
}
