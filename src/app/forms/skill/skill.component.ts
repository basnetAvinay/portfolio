import {Component, OnInit} from '@angular/core';
import {fadeLeft, fadeRight} from "../../animations/fade.animation";
import {AnimationParams, StateChangeExpression} from "../../animations/animation.constant";

interface BarChartSection {
  section: string,
  charts: BarChart[]
}

interface BarChart {
  name: string;
  data: number;
  tooltipText: string;
  barColor: string;
}

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  animations: [fadeLeft, fadeRight]
})
export class SkillComponent implements OnInit {

  barChartSections: BarChartSection[];
  fadeAnimation: AnimationParams = {
    value: StateChangeExpression.ENTER,
    params: {animationDuration: 1000, distance: 300}
  }

  constructor() {
  }

  ngOnInit(): void {
    this.initBarCharts();
  }

  initBarCharts(): void {
    const languagesChart: BarChart[] = [
      {name: 'JavaScript', data: 90, tooltipText: '90%', barColor: '#a84cb8'},
      {name: 'TypeScript', data: 90, tooltipText: '90%', barColor: '#2fa499'},
      {name: 'Java', data: 80, tooltipText: '80%', barColor: '#6f1a07'}
    ];

    const frontEnds: BarChart[] = [
      {name: 'Angular', data: 90, tooltipText: '90%', barColor: '#2c98f0'},
      {name: 'RxJS', data: 85, tooltipText: '85%', barColor: '#ec5453'},
      {name: 'NgRx', data: 85, tooltipText: '85%', barColor: '#f9bf3f'},
      {name: 'Angular Material', data: 90, tooltipText: '90%', barColor: '#F7F3E3'},
      {name: 'D3.js', data: 65, tooltipText: '65%', barColor: '#037971'},
      {name: 'Micro Frontends', data: 65, tooltipText: '65%', barColor: '#2EC4B6'},
    ];

    const backEnds: BarChart[] = [
      {name: 'Spring Boot', data: 80, tooltipText: '80%', barColor: '#E94F37'},
      {name: 'Spring Data JPA', data: 80, tooltipText: '80%', barColor: '#AF9164'},
      {name: 'Spring Security', data: 75, tooltipText: '75%', barColor: '#cfcfea'},
      {name: 'SQL', data: 70, tooltipText: '70%', barColor: '#4F517D'},
      {name: 'Microservices', data: 60, tooltipText: '60%', barColor: '#e31b6d'},
      {name: 'Hystrix', data: 75, tooltipText: '75%', barColor: '#2c98f0'},
    ];

    const misc: BarChart[] =[
      {name: 'Oauth', data: 90, tooltipText: '90%', barColor: '#2EC4B6'},
      {name: 'Git', data: 90, tooltipText: '90%', barColor: '#ec5453'},
      {name: 'Firebase', data: 70, tooltipText: '70%', barColor: '#4F517D'},
      // {name: 'NGINX'}
    ];

    this.barChartSections = [
      {section: 'Languages', charts: languagesChart},
      {section: 'Frontends', charts: frontEnds},
      {section: 'Backends', charts: backEnds},
      {section: 'Miscellaneous', charts: misc}
    ];


      // {name: 'Angular', data: 90, tooltipText: '90%', barColor: '#2c98f0'},
      // {name: 'RxJS', data: 85, tooltipText: '85%', barColor: '#ec5453'},
      // {name: 'NgRx', data: 85, tooltipText: '85%', barColor: '#f9bf3f'},
      // {name: 'Angular Material', data: 90, tooltipText: '90%', barColor: '#F7F3E3'},
      // {name: 'D3.js', data: 65, tooltipText: '65%', barColor: '#037971'},
      // {name: 'Micro Frontends', data: 65, tooltipText: '65%', barColor: '#2EC4B6'},
      // {name: 'Firebase', data: 70, tooltipText: '70%', barColor: '#4F517D'},

      // {name: 'JavaScript', data: 90, tooltipText: '90%', barColor: '#a84cb8'},
      // {name: 'TypeScript', data: 90, tooltipText: '90%', barColor: '#2fa499'},
      // {name: 'Angular', data: 90, tooltipText: '90%', barColor: '#e31b6d'},
      // {name: 'Java', data: 90, tooltipText: '90%', barColor: '#6f1a07'},
      // {name: 'Spring Boot', data: 90, tooltipText: '90%', barColor: '#F7F3E3'},
      // {name: 'Spring Data JPA', data: 90, tooltipText: '90%', barColor: '#AF9164'},
      // {name: 'Spring Security', data: 90, tooltipText: '90%', barColor: '#cfcfea'},
      // {name: 'Oauth', data: 90, tooltipText: '90%', barColor: '#2EC4B6'},
      // {name: 'SQL', data: 90, tooltipText: '90%', barColor: '#4F517D'},
      // {name: 'Firebase', data: 90, tooltipText: '90%', barColor: '#037971'},
      // {name: 'Git', data: 90, tooltipText: '90%', barColor: '#E94F37'},

  }
}
