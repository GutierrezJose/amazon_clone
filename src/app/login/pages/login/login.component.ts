import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  blankInput: boolean = false;

  private userService = inject(UserService);
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }


  hasErrors(field: string, typeError: string) {
    return this.loginForm.get(field)?.hasError(typeError) && this.loginForm.get(field)?.touched;
  }

  verificarEmail() {
    if (this.loginForm.get('email')?.value == 0) {
      this.blankInput = true;
    } else {
      this.userService.verificarEmailIngresado(this.loginForm.get('email')?.value).subscribe((response: any) => {
        if (response.isAvailable) {
          console.log('El email está disponible');
        } else {
          console.log('El email no está disponible');
        }
      })
    }
  }
}

