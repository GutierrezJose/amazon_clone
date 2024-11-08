import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }


  hasErrors(field: string, typeError: string){
    return this.loginForm.get(field)?.hasError(typeError) && this.loginForm.get(field)?.touched;
  }
}
