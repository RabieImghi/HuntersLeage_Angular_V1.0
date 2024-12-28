import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompetitionsComponent } from '../CRUD/competitions/create-competitions/create-competitions.component';
import { DeleteCompetitionsComponent } from '../CRUD/competitions/delete-competitions/delete-competitions.component';
import { UpdateCompetitionsComponent } from '../CRUD/competitions/update-competitions/update-competitions.component';

interface CompetitionResponseVm {
  id: string;
  code: string;
  location: string;
  date: string;
  speciesType: string;
  minParticipants: number;
  maxParticipants: number;
  openRegistration: boolean;
}

@Component({
  selector: 'app-manage-competitions',
  standalone: true,
  imports: [CommonModule, CreateCompetitionsComponent, DeleteCompetitionsComponent, UpdateCompetitionsComponent],  
  templateUrl: './manage-competitions.component.html'
})


export class ManageCompetitionsComponent {

  competitions: CompetitionResponseVm[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      code: 'COMP-001',
      location: 'New York City',
      date: '2024-03-12T08:00:00',
      speciesType: 'BRID',
      minParticipants: 10,
      maxParticipants: 50,
      openRegistration: true,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      code: 'COMP-002',
      location: 'Los Angeles',
      date: '2024-03-14T09:00:00',
      speciesType: 'BIG_GAME',
      minParticipants: 5,
      maxParticipants: 20,
      openRegistration: false,
    },
    {
      id: '123e4567-e89b-12d3-a451-456614174001',
      code: 'COMP-003',
      location: 'Morrocco',
      date: '2024-03-14T09:00:00',
      speciesType: 'SEA',
      minParticipants: 10,
      maxParticipants: 20,
      openRegistration: true,
    },
  ];

 
}
