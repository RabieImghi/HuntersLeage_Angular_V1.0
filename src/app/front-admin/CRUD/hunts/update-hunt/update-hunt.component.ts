import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { SpeciesServiceService } from '../../../../service/species-service.service';
import { HuntService } from '../../../../service/hunt.service';
import { ParticipationService } from '../../../../service/participation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComputationService } from '../../../../service/shared/computation.service';
import { TokenStorageServiceService } from '../../../../service/token-storage-service.service';

@Component({
  selector: 'app-update-hunt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-hunt.component.html',
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
export class UpdateHuntComponent {

  @Input() hunt: any;
  participantList: any = [];
  speciesList: any = [];
  isModalOpenUpdate = false;
  updateHuntForm: FormGroup;
  
  constructor(private fb: FormBuilder ,
    private speciesServiceService: SpeciesServiceService, 
    private huntService: HuntService, 
    private participationService: ParticipationService,
    private computationService: ComputationService,
    private tokenStorageService: TokenStorageServiceService
  ) { 
    this.updateHuntForm = this.fb.group({
      speciesId: ['',[Validators.required]],
      participationId: ['', [Validators.required]],
      weight: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.getSpecies();
    this.getParticipants();
  }

  toggleModalUpdate(state: boolean): void {
    this.isModalOpenUpdate = state;
    if (state && this.hunt) {
      this.updateHuntForm.patchValue({
        speciesId: this.hunt.species?.id || '',
        participationId: this.hunt.participation?.id || '',
        weight: this.hunt.weight || '',
      });
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

  onSubmit(): void {
    if(this.tokenStorageService.getSub() === 'jury_test'){
      Swal.fire({
        icon: 'error',
        title: 'You are not allowed to update hunt',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      const hunt = {
        id: this.hunt.id,
        speciesId: this.updateHuntForm.value.speciesId,
        participationId: this.updateHuntForm.value.participationId,
        weight: this.updateHuntForm.value.weight,
      };
      
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to update hunt with Id: ${this.hunt.id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
      if (result.isConfirmed) {
        this.huntService.updateHunt(hunt).subscribe(
            (response) => {
              this.computationService.triggerRefresh();
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  text: 'The hunt has been updated.',
                  showConfirmButton: false,
                  timer: 1500 
              });
              this.toggleModalUpdate(false);
            },
            (error) => {
            Swal.fire({
                position: 'top-end', 
                icon: 'error',
                text: 'Error on updating hunt: ' + error.error,
                showConfirmButton: false,
                timer: 1500 
            });
            } 
        );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'The competition is safe :)', 'info');
        }
      });
    }

    
  }

  

}
