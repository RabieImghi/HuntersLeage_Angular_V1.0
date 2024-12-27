import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html'
})
export class ResultComponent {
  userHistoricResponse = {
    user: {
      name: 'Ava M. Charlotte',
    },
    pastCompetitions: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        code: 'CMP-001',
        speciesType: 'Mammals',
        rank: 1,
        score: 98.5,
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        code: 'CMP-002',
        speciesType: 'Birds',
        rank: 3,
        score: 75.3,
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174002',
        code: 'CMP-003',
        speciesType: 'Reptiles',
        rank: 2,
        score: 88.2,
      },
    ],
  };
}
