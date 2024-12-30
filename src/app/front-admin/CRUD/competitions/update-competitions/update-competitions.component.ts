import { Component, Input,OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { UpdateCompetition } from '../../../interface/update-competition';
import Swal from 'sweetalert2';
import { ComputationService } from '../../../../service/shared/computation.service';
import { CompitetionServiceService } from '../../../../service/compitetion-service.service';


@Component({
  selector: 'app-update-competitions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-competitions.component.html',
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
export class UpdateCompetitionsComponent {

  @Input() competition: any;

  form: FormGroup;
  constructor(private fb: FormBuilder, private c: CompitetionServiceService, private computationService: ComputationService) {
    this.form = this.fb.group({
      id: [false],
      code: ['',[Validators.required,Validators.pattern(/^[A-Za-z]+_\d{4}-\d{2}-\d{2}$/)]],
      location: ['', [Validators.required]],
      date: ['', [Validators.required]],
      speciesType: ['', [Validators.required]],
      minParticipants: ['', [Validators.required,Validators.min(1)]],
      maxParticipants: ['', [Validators.required,Validators.min(1)]],
      openRegistration: [false],
    });
  }

  onSubmit(): void {
    const competition = this.form.value as UpdateCompetition;
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to update competition with Code: ${this.competition.code}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.c.updateCompetition(competition).subscribe(
          (response)=>{
            this.successAlert();
            this.form.reset();
            this.computationService.triggerRefresh();
          },
          (error)=>{
            this.errorAlert(error.error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The competition is safe :)', 'info');
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['competition'] && this.competition) {
      this.form.patchValue({
        id: this.competition.id,
        code: this.competition.code,
        location: this.competition.location,
        date: this.competition.date,
        speciesType: this.competition.speciesType,
        minParticipants: this.competition.minParticipants,
        maxParticipants: this.competition.maxParticipants,
        openRegistration: this.competition.openRegistration,
      });
    }
  }


  competitionTypes = [
    { value: 'SEA', label: 'SEA (9)' },
    { value: 'BIG_GAME', label: 'BIG GAME (3)' },
    { value: 'BIRD', label: 'BIRD (5)' },
  ];
  isModalOpenUpdate = false;

  toggleModalUpdate(state: boolean): void {
    this.isModalOpenUpdate = state;
  }
  successAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Competition updated successfully',
      showConfirmButton: false,
      timer: 3500
    });
  }
  errorAlert(error: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error creating competition : ' + error,
      showConfirmButton: false,
      timer: 3500
    })
  }
}
