import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CompitetionServiceService } from '../../../../service/compitetion-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { CreateCompetition } from '../../../interface/create-competition';
import Swal from 'sweetalert2';
import { ComputationService } from '../../../../service/shared/computation.service';

@Component({
  selector: 'app-create-competitions',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-competitions.component.html',
})
export class CreateCompetitionsComponent {
  isModalOpen = false;
  form: FormGroup;

  constructor(private compitetionServiceService: CompitetionServiceService, private fb: FormBuilder,private computationService: ComputationService) {
    this.form = this.fb.group({
        code: ['', [Validators.required,Validators.pattern(/^[A-Za-z]+_\d{4}-\d{2}-\d{2}$/)]],
        location: ['', [Validators.required]],
        date: ['', [Validators.required]],
        speciesType: ['', [Validators.required]],
        minParticipants: ['', [Validators.required,Validators.min(1)]],
        maxParticipants: ['', [Validators.required,Validators.min(1)]],
        openRegistration: [false],
    });
   }

  

  onSubmit(): void {
    const competition = this.form.value as CreateCompetition;
    console.log(competition);
    this.compitetionServiceService.createCompetition(competition)
      .subscribe(
        (response) => {
          this.toggleModal(false);
          this.successAlert();
          this.form.reset();
          this.computationService.triggerRefresh();
        },
        (error) => {
          this.errorAlert(error.error);
        });
  }



  toggleModal(state: boolean): void {
    this.isModalOpen = state;
  }
  errorAlert(error: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error creating competition : ' + error,
      showConfirmButton: false,
      timer: 1500
    });
  }
  successAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Competition created successfully',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
