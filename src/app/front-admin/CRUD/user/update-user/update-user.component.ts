import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import Swal from 'sweetalert2';
import { ComputationService } from '../../../../service/shared/computation.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent {
  @Input() user: any;
  isModalOpen: boolean = false;
  updateUserForm: FormGroup;

  role = [
    { value: 'MEMBER', label: 'Member' },
    { value: 'JURY', label: 'Jury' },
    { value: 'ADMIN', label: 'Admin' },
  ];

  constructor(private fb: FormBuilder, private userService: UserService, private com: ComputationService) {
    this.updateUserForm = this.fb.group({
      id: [''],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      licenseExpirationDate: ['', [Validators.required]],
      joinDate: ['', [Validators.required]],
    });
  }

  toggleModal(state: boolean) {
    this.isModalOpen = state;
    if (state && this.user) {
      this.updateUserForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      const updatedUser = { ...this.user, ...this.updateUserForm.value };
      console.log(updatedUser);
      this.userService.updateUser(updatedUser).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'User Updated',
            text: 'The user information has been successfully updated.',
            timer: 1500,
            showConfirmButton: false,
          });
          this.toggleModal(false);
          this.com.triggerRefresh();
          
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to update user: ${error.error.message || 'Unknown error'}`,
          });
          console.error(error);
        }
      );
    }
  }
}
