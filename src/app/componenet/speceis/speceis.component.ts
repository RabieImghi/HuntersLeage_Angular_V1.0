import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';  

interface Species {
  name: string;
  category: string;
  minimumWeight: number;
  difficulty: string;
  points: number;
  hunted: number;
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
      difficulty: 'LEGENDARY',
      points: 50,
      hunted : 10
    },
    {
      name: 'Eagle',
      category: 'BIRD',
      minimumWeight: 5,
      difficulty: 'EPIC',
      points: 30,
      hunted : 30
    },
    {
      name: 'Shark',
      category: 'SEA',
      minimumWeight: 500,
      difficulty: 'COMMON',
      points: 60,
      hunted : 40
    },
    {
      name: 'Dolphin',
      category: 'SEA',
      minimumWeight: 200,
      difficulty: 'COMMON',
      points: 40,
      hunted : 60
    },
    {
      name: 'Butterfly',
      category: 'BIRD',
      minimumWeight: 0.02,
      difficulty: 'RARE',
      points: 5,
      hunted : 30
    },
    {
      name: 'Elephant',
      category: 'BIG_GAME',
      minimumWeight: 500,
      difficulty: 'LEGENDARY',
      points: 60,
      hunted : 50
    },
    {
      name: 'Hawk',
      category: 'BIRD',
      minimumWeight: 6,
      difficulty: 'EPIC',
      points: 35,
      hunted : 60
    },
    {
      name: 'Chameleon',
      category: 'BIG_GAME',
      minimumWeight: 2,
      difficulty: 'EPIC',
      points: 20,
      hunted : 43
    },
  ];
}
