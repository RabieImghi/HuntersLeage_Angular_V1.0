import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

interface Species {
  id: String;
  name: string;
  category: string;
  minimumWeight: number;
  difficulty: string;
  points: number;
}

interface User {
  username: string;
}
interface competition {
  code: string;
}

interface Participant {
  id: string;
  score: number;
  user: User;
  competition: competition;
}

@Component({
  selector: 'app-create-hunt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-hunt.component.html',
   animations: [
      trigger('fadeAnimation', [
        transition(':enter', [style({ opacity: 0 }), animate('300ms ease-out', style({ opacity: 1 }))]),
        transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
      ]),
      trigger('scaleAnimation', [
        transition(':enter', [
          style({ transform: 'scale(0)', opacity: 0 }),
          animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
        ]),
        transition(':leave', [
          animate('300ms ease-in', style({ transform: 'scale(0)', opacity: 0 })),
        ]),
      ]),
    ],
})
export class CreateHuntComponent {
  isModalOpen = false;

  toggleModal(state: boolean): void {
    this.isModalOpen = state;
  }
  participantList: Participant[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      score: 100,
      user: {
        username: 'John',
      },
      competition: {
        code: 'C00-01',
      },
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      score: 50,
      user: {
        username: 'Jane',
      },
      competition: {
        code: 'C00-02',
      },
    }
  ]

  speciesList: Species[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Tiger',
      category: 'BIG_GAME',
      minimumWeight: 100,
      difficulty: 'Hard',
      points: 50,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Eagle',
      category: 'BIRD',
      minimumWeight: 5,
      difficulty: 'Medium',
      points: 30,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174002',
      name: 'Shark',
      category: 'SEA',
      minimumWeight: 500,
      difficulty: 'Hard',
      points: 60,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174003',
      name: 'Dolphin',
      category: 'SEA',
      minimumWeight: 200,
      difficulty: 'Medium',
      points: 40,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174004',
      name: 'Butterfly',
      category: 'BIRD',
      minimumWeight: 1,
      difficulty: 'Easy',
      points: 20,
    },
  ];
}
