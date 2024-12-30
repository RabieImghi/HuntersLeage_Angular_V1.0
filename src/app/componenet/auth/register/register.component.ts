import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { RegisterRequest } from '../interfaces/register-request';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthRequest } from '../interfaces/auth-request';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  errorMessage: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  RegisterForm: FormGroup;
  isErrorInUsername: boolean = false;
  isErrorInPassword: boolean = false;
  isErrorInEmail: boolean = false;

  constructor(private authService: AuthServiceService, private fb: FormBuilder, private router: Router) { 
    this.RegisterForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    
    })

  }


  onSubmit(): void {
    if(this.RegisterForm.valid){
      const DateNow: string = new Date().toISOString().split('Z')[0];
      const nextYearDate: string = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split('Z')[0];
      

      const registerRequest = new RegisterRequest(
        this.RegisterForm.value.username, 
        this.RegisterForm.value.password, 
        this.RegisterForm.value.email,
        'null','null','null','null',nextYearDate,DateNow);
      this.authService.register(registerRequest).subscribe(
        data => {
          const authRequest = new AuthRequest(this.RegisterForm.value.username, this.RegisterForm.value.password);
          this.authService.login(authRequest).subscribe(
            data => {
              this.router.navigateByUrl('');
            },
            error => {
              this.errorMessage = error.error;
              this.errorAlert();
            }
          );
        },
        error =>{
          this.errorMessage = error.error;
          this.errorAlert();
        }
      );
    }else{
      this.displayValidationErrors();
    }
    
  }

  displayValidationErrors() {
    const controls = this.RegisterForm.controls;
    this.errorMessage = '';
    let usernameError = '';
    let passwordError = '';
    let emailError = '';
  
    for (const name in controls) {
      if (controls[name].invalid) {
        const controlErrors = controls[name].errors;
        if (controlErrors?.['required']) {
          if (name === 'username') {
            usernameError = 'Username is required';
            this.isErrorInUsername = true;
          } else if (name === 'password') {
            passwordError = 'Password is required';
            this.isErrorInPassword = true;
          } else if (name === 'email') {
            emailError = 'Email is required';
            this.isErrorInEmail = true;
          }
        }
        if (controlErrors?.['minlength']) {
          if (name === 'username') {
            usernameError = 'Username must be at least 3 characters';
            this.isErrorInUsername = true;
          } else if (name === 'password') {
            passwordError = 'Password must be at least 6 characters';
            this.isErrorInPassword = true;
          } else if (name === 'email') {
            emailError = 'Email must be at least 6 characters';
            this.isErrorInEmail = true;
          }
        }
      }
    }
  
    if (usernameError !== '') {
      this.errorMessage += usernameError + '<br>';
    }
    if (passwordError !== '') {
      this.errorMessage += passwordError + '<br>';
    }
    if (emailError !== '') {
      this.errorMessage += emailError + '<br>';
    }
  
    if (this.errorMessage) {
      this.errorAlert();
    }
  }

   errorAlert() {
      Swal.fire({
        position: 'top-end', 
        icon: 'error',
        title: this.errorMessage,
        showConfirmButton: false, 
        timer: 3500, 
        toast: true, 
        timerProgressBar: true,
      });
    }



}
