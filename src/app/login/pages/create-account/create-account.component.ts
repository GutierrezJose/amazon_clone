import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  userService = inject(UserService);
  createUserForm: FormGroup;
  contrasenasNoCoinciden: boolean = false;
  tieneNumeros: boolean = false;
  correoNoDisponible: boolean = false;
  usuarioCreado: boolean = false;

  name: string = '';
  email: string = '';
  password: string = '';
  passwordRepeate: string = '';
  avatar: string = 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png';
  constructor(private formBuilder: FormBuilder) {
    this.createUserForm = this.formBuilder.group({
      nombreCompleto: ['', [Validators.required, CustomValidators.noNumbersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      passwordRepeate: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  hasErrors(field: string, typeError: string) {
    return this.createUserForm.get(field)?.hasError(typeError) && this.createUserForm.get(field)?.touched;
  }


  registrarUsuario() {

    if (this.createUserForm.get('password')?.value !== this.createUserForm.get('passwordRepeate')?.value) {
      this.contrasenasNoCoinciden = true;
      return;
    } else {
      this.contrasenasNoCoinciden = false;
    }

    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    } else {
      this.name = this.createUserForm.get('nombreCompleto')?.value;
      this.email = this.createUserForm.get('email')?.value;
      this.password = this.createUserForm.get('password')?.value;
      this.userService.createUSer(this.name, this.email, this.password, this.avatar).subscribe((response) => {
        if (response.status === 201) {
          this.usuarioCreado = true
        }
      })
    }
  }
}