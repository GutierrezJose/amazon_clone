import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { access } from 'fs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  blankEmailInput: boolean = false;
  blankPasswordInput: boolean = false;
  emailCorrect: boolean = false;
  email: string = '';
  datosIncorrectos = false;
  private userService = inject(UserService);
  private router = inject(Router);
  private tokenService = inject(TokenService);
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    })
  }


  hasErrors(field: string, typeError: string) {
    return this.loginForm.get(field)?.hasError(typeError) && this.loginForm.get(field)?.touched;
  }

  verificarEmail() {
    if (this.loginForm.get('email')?.value == 0) {
      this.blankEmailInput = true;
    } else {
      this.userService.verificarEmailIngresado(this.loginForm.get('email')?.value).subscribe((response: any) => {
        if (response.isAvailable == false) {
          this.emailCorrect = true;
          this.email = this.loginForm.get('email')?.value;
        }
      })
    }
  }

  login() {
    if (this.loginForm.get('password')?.value == 0) {
      this.blankPasswordInput = true;
    } else {
      this.userService.login(this.email, this.loginForm.get('password')?.value).subscribe(
        (response: any) => {
        const { access_token, refresh_token } = response;
        this.tokenService.setToken(access_token);
        this.router.navigate(['/']);
      },
    (error: any) => {
      this.datosIncorrectos = true;
    })
    }
  }
}