import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-species',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-species.component.html'
})
export class CreateSpeciesComponent {
  isModalOpen = false;

  toggleModal(state: boolean): void {
    this.isModalOpen = state;
  }

  speciesTypes = [
    { value: 'SEA', label: 'SEA (9)' },
    { value: 'BIG_GAME', label: 'BIG GAME (3)' },
    { value: 'BIRD', label: 'BIRD (5)' },
  ];

  difficulties = [
    { value: 'COMMON', label: 'COMMON (1)' },
    { value: 'RARE', label: 'RARE (2)' },
    { value: 'EPIC', label: 'EPIC (3)' },
    { value: 'LEGENDARY', label: 'LEGENDARY (5)' },
  ];

 

}
