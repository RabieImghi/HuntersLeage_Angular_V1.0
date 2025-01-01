import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesServiceService } from '../../../../service/species-service.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComputationService } from '../../../../service/shared/computation.service';

@Component({
  selector: 'app-create-species',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-species.component.html'
})
export class CreateSpeciesComponent {
  isModalOpen = false;
  creteSpeciesForm: FormGroup;

  constructor(private speciesService: SpeciesServiceService, private fb: FormBuilder, private computationService: ComputationService) {
    this.creteSpeciesForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.pattern('^(SEA|BIG_GAME|BIRD)$')]],
      minimumWeight: ['', [Validators.required, Validators.min(0.1)]],
      difficulty: ['', [Validators.required, Validators.pattern('^(COMMON|RARE|EPIC|LEGENDARY)$')]],
      points: ['', [Validators.required, Validators.min(1)]],
    })
  }
  createSpecies(): void {
    const species = this.creteSpeciesForm.value;
    this.speciesService.createSpecies(species).subscribe(
      () => {
        this.toggleModal(false);
        this.creteSpeciesForm.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'The hunt has been created with success.',
          showConfirmButton: false,
          timer: 1500 
        });
        this.computationService.triggerRefresh();
      },
      (error) => {
        Swal.fire({
          position: 'top-end', 
          icon: 'error',
          text: 'Error on creating hunt: ' + error.error,
          showConfirmButton: false,
          timer: 1500 
        });
        console.error(error.error);
      }
    );
  }

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
