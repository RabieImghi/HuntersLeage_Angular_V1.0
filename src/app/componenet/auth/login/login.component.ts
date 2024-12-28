import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthRequest} from "../interfaces/auth-request";
import { AuthServiceService} from "../service/auth-service.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });

  }

  onSubmit(): void {
    if(this.loginForm.valid){
      const authRequest = new  AuthRequest(this.loginForm.value.username, this.loginForm.value.password);
      this.authService.login(authRequest).subscribe(
        data => {
          this.router.navigateByUrl('')
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
