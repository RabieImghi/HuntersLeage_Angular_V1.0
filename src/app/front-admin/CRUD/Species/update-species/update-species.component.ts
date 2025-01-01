import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SpeciesServiceService } from '../../../../service/species-service.service';
import { ComputationService } from '../../../../service/shared/computation.service';

@Component({
  selector: 'app-update-species',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-species.component.html'
})
export class UpdateSpeciesComponent implements OnInit {
  @Input() specie: any;

  isModalOpen = false;
  updateSpeciesForm: FormGroup;

  constructor(private fb: FormBuilder, private speciesService: SpeciesServiceService, private computationService: ComputationService) {
    this.updateSpeciesForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.pattern('^(SEA|BIG_GAME|BIRD)$')]],
      minimumWeight: ['', [Validators.required, Validators.min(0.1)]],
      difficulty: ['', [Validators.required, Validators.pattern('^(COMMON|RARE|EPIC|LEGENDARY)$')]],
      points: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    if (this.specie) {
      this.updateSpeciesForm.patchValue(this.specie);
    }
  }

  toggleModal(state: boolean): void {
    this.isModalOpen = state;
  }

  updateSpecies(): void {
    if (this.updateSpeciesForm.valid) {
      const updatedSpecies = this.updateSpeciesForm.value;
      this.speciesService.updateSpecies(updatedSpecies).subscribe(
        () => {
          this.toggleModal(false);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'The Species has been updated with success.',
            showConfirmButton: false,
            timer: 1500
          });
          this.computationService.triggerRefresh();
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Error on updating Species: ' + error.error,
            showConfirmButton: false,
            timer: 1500
          });
          console.error(error.error);
        }
      );
      this.toggleModal(false);
    }
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
