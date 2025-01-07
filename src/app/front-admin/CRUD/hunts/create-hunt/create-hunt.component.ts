import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesServiceService } from '../../../../service/species-service.service';
import { HuntService } from '../../../../service/hunt.service';
import { ParticipationService } from '../../../../service/participation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComputationService } from '../../../../service/shared/computation.service';
import { TokenStorageServiceService } from '../../../../service/token-storage-service.service';


@Component({
  selector: 'app-create-hunt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-hunt.component.html',
   
})
export class CreateHuntComponent {
  isModalOpen = false;
  participantList: any = [];
  speciesList: any = [];
  isModalOpenUpdate = false;
  createHuntForm: FormGroup;


  constructor(private fb: FormBuilder ,private speciesServiceService: SpeciesServiceService, private huntService: HuntService, private participationService: ParticipationService, private computationService: ComputationService
    , private tokenStorageService: TokenStorageServiceService
  ) 
  {
    this.createHuntForm = this.fb.group({
      speciesId: ['',[Validators.required]],
      participationId: ['', [Validators.required]],
      weight: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getSpecies();
    this.getParticipants();
  }

  onSubmit(): void {
    if(this.tokenStorageService.getSub() === 'jury_test'){
      Swal.fire({
        icon: 'error',
        title: 'You are not allowed to create hunt',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
    if (this.createHuntForm.valid) {
      this.huntService.createHunt(this.createHuntForm.value)
        .subscribe(
          (response) => {
            this.computationService.triggerRefresh();
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  text: 'The hunt has been created with success.',
                  showConfirmButton: false,
                  timer: 1500 
              });
              this.toggleModal(false);
              this.createHuntForm.reset();
          },
          (error) => {
              Swal.fire({
                  position: 'top-end', 
                  icon: 'error',
                  text: 'Error on creating hunt: ' + error.error,
                  showConfirmButton: false,
                  timer: 1500 
              });
          }
        );
      }
    }
  }

  getParticipants(): void {
    this.participationService.getParticipationList(0, 20)
      .subscribe(
        (response) => {
          this.participantList = response.content;
          console.log('Participants:', this.participantList);
        },
        (error) => {
          console.error('Error fetching participants:', error);
        }
      );
  }
  getSpecies(): void {
    this.speciesServiceService.getSpeciesList(0, 50)
      .subscribe(
        (response) => {
          this.speciesList = response.content;
        },
        (error) => {
          console.error('Error fetching species list:', error);
        }
      );
  }
  toggleModal(state: boolean): void {
    this.isModalOpen = state;
  }
}
