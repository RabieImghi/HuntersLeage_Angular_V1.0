import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Species {
  id: string;
  name: string;
  category: string;
  minimumWeight: boolean;
  difficulty: string;
  points: number;
}

interface Hunt {
  id: string;
  species: any;
  weight: number;
}

@Component({
  selector: 'app-manage-hunts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-hunts.component.html'
})
export class ManageHuntsComponent {

  Hunts: Hunt[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      species: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Tiger',
        category: 'BIG_GAME',
        minimumWeight: 100,
        difficulty: 'Hard',
        points: 50,
      },
      weight: 100,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      species: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Eagle',
        category: 'BIRD',
        minimumWeight: 5,
        difficulty: 'Medium',
        points: 30,
      },
      weight: 5,
    },
    {
      id: '123e4567-e89b-12d3-a451-456614174001',
      species: {
        id: '123e4567-e89b-12d3-a451-456614174001',
        name: 'Shark',
        category: 'SEA',
        minimumWeight: 500,
        difficulty: 'Hard',
        points: 60,
      },
      weight: 500,
    },
    {
      id: '123e4567-e89b-12d3-a451-456614174001',
      species: {
        id: '123e4567-e89b-12d3-a451-456614174001',
        name: 'Dolphin',
        category: 'SEA',
        minimumWeight: 200,
        difficulty: 'Medium',
        points: 40,
      },
      weight: 200,
    },
    {
      id: '123e4567-e89b-12d3-a451-456614174001',
      species: {
        id: '123e4567-e89b-12d3-a451-456614174001',
        name: 'Butterfly',
        category: 'BIRD',
        minimumWeight: 0.02,
        difficulty: 'Easy',
        points: 5,
      },
      weight: 0.1,
    },
  ];

  

}
