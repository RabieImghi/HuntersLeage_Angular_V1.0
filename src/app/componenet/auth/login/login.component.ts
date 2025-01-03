import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthRequest} from "../interfaces/auth-request";
import { AuthServiceService} from "../service/auth-service.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: String = '';
  errorUsername: boolean = false;
  errorPassword: boolean = false;
  isSubmitForm: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });

  }
  ngOnInit(): void {
    this.errorUsername = false;
    this.errorPassword = false;
  }

  onSubmit(): void {
    this.isSubmitForm = true;
    if(this.loginForm.valid){
      const authRequest = new  AuthRequest(this.loginForm.value.username, this.loginForm.value.password);
      this.authService.login(authRequest).subscribe(
        data => {
          this.router.navigateByUrl('')
        },
        error => {
          this.isSubmitForm = false;
          this.errorMessage = error.error;
          if(this.errorMessage.includes('username'))
            this.errorUsername = true;
          else if(this.errorMessage.includes('Les identifications'))
            this.errorPassword = true;
          this.errorAlert();
          
        }
      )
    }else{
      this.isSubmitForm = false;
      this.displayValidationErrors();
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
  displayValidationErrors() {
    const controls = this.loginForm.controls;
    this.errorMessage = '';
    let usernameError = '';
    let passwordError = '';

    for (const name in controls) {
      if (controls[name].invalid) {
        const controlErrors = controls[name].errors;
        if (controlErrors?.['required'])  {
          if(name === 'username'){
            this.errorUsername = true;
            usernameError = 'Username is required.';
          }
          else{
            this.errorPassword = true;  
            passwordError = 'Password is required.';
          }
        }
        if (controlErrors?.['minlength']) {
          if(name === 'username'){
            this.errorUsername = true;
            usernameError = 'Username must be at least 3 characters long.';
          }
          else{
            this.errorPassword = true;
            passwordError = 'Password must be at least 6 characters long.';
          }
        }
      }
    }

    if (usernameError) {
      this.errorMessage += usernameError+'<br>';
    }
    if (passwordError) {
      this.errorMessage += (this.errorMessage ? ' ' : '') + passwordError+'<br>';
    }
    if (this.errorMessage) {
      this.errorAlert();
    }
  }
  

}
