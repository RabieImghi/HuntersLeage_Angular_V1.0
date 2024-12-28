import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSpeciesComponent } from '../CRUD/Species/create-species/create-species.component';
import { UpdateSpeciesComponent } from '../CRUD/Species/update-species/update-species.component';
import { DeleteSpeciesComponent } from '../CRUD/Species/delete-species/delete-species.component';

interface SpecieResponse {
  id: string;
  name: string;
  category: string;
  minimumWeight: number;
  difficulty: string;
  points: number;
}


@Component({
  selector: 'app-manage-species',
  standalone: true,
  imports: [CommonModule, CreateSpeciesComponent, UpdateSpeciesComponent, DeleteSpeciesComponent],
  templateUrl: './manage-species.component.html'
})
export class ManageSpeciesComponent {


  species: SpecieResponse[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Tiger',
      category: 'BIG_GAME',
      minimumWeight: 100,
      difficulty: 'COMMON',
      points: 50,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Eagle',
      category: 'BIRD',
      minimumWeight: 5,
      difficulty: 'LEGENDARY',
      points: 30,
    },
    {
      id: '123e4567-e89b-12d3-a451-456614174001',
      name: 'Shark',
      category: 'SEA',
      minimumWeight: 500,
      difficulty: 'COMMON',
      points: 60,
    },
    {
      id: '123e4567-e89b-12d3-a451-456614174001',
      name: 'Dolphin',
      category: 'SEA',
      minimumWeight: 200,
      difficulty: 'LEGENDARY',
      points: 40,
    },
    {
      id: '123e4567-e89b-12d3-a451-456614174001',
      name: 'Butterfly',
      category: 'BIRD',
      minimumWeight: 0.02,
      difficulty: 'EPIC',
      points: 5,
    },
  ];
}
