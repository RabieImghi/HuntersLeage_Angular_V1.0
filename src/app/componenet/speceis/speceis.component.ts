import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';  

interface Species {
  name: string;
  category: string;
  minimumWeight: number;
  difficulty: string;
  points: number;
}
@Component({
  selector: 'app-speceis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speceis.component.html'
})
export class SpeceisComponent {


  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  speciesList: Species[] = [
    {
      name: 'Tiger',
      category: 'BIG_GAME',
      minimumWeight: 100,
      difficulty: 'Hard',
      points: 50,
    },
    {
      name: 'Eagle',
      category: 'BIRD',
      minimumWeight: 5,
      difficulty: 'Medium',
      points: 30,
    },
    {
      name: 'Shark',
      category: 'SEA',
      minimumWeight: 500,
      difficulty: 'Hard',
      points: 60,
    },
    {
      name: 'Dolphin',
      category: 'SEA',
      minimumWeight: 200,
      difficulty: 'Medium',
      points: 40,
    },
    {
      name: 'Butterfly',
      category: 'BIRD',
      minimumWeight: 0.02,
      difficulty: 'Easy',
      points: 5,
    },
    {
      name: 'Elephant',
      category: 'BIG_GAME',
      minimumWeight: 500,
      difficulty: 'Hard',
      points: 60,
    },
    {
      name: 'Hawk',
      category: 'BIRD',
      minimumWeight: 6,
      difficulty: 'Medium',
      points: 35,
    },
    {
      name: 'Chameleon',
      category: 'BIG_GAME',
      minimumWeight: 2,
      difficulty: 'Medium',
      points: 20,
    },
  ];
}
