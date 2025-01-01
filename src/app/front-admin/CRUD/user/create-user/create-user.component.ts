import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../../componenet/auth/service/auth-service.service';
import Swal from 'sweetalert2';
import { RegisterRequest } from '../../../../componenet/auth/interfaces/register-request';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {
  isModalOpen: boolean = false;
  createUserForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
    this.createUserForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      nationality: ['', [Validators.required]],
      licenseExpirationDate: ['', [Validators.required]],
      joinDate: ['', [Validators.required]],
    });
  }

  toggleModal(state: boolean) {
    this.isModalOpen = state;
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      const registerRequest = new RegisterRequest(
        this.createUserForm.value.username,
        this.createUserForm.value.password,
        this.createUserForm.value.email,
        this.createUserForm.value.firstName,
        this.createUserForm.value.lastName,
        this.createUserForm.value.cin,
        this.createUserForm.value.nationality,
        this.createUserForm.value.licenseExpirationDate,
        this.createUserForm.value.joinDate
      );

      console.log(registerRequest);
      this.authService.register(registerRequest).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'User Created',
            text: 'The user has been successfully created.',
            timer: 1500,
            showConfirmButton: false,
          });
          this.toggleModal(false);
          this.createUserForm.reset();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to create user: ${error.error.message || 'Unknown error'}`,
          });
          console.log(error.error)
        }
      );
    }
  }
}
