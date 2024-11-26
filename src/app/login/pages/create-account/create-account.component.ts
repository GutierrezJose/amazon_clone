import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  createUserForm: FormGroup;
  contrasenasNoCoinciden: boolean = false;
  tieneNumeros: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.createUserForm = this.formBuilder.group({
      nombreCompleto: ['', [Validators.required, CustomValidators.noNumbersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      passwordRepeate: ['', [Validators.required, Validators.minLength(5)]]
    }, {validators: CustomValidators.passwordMatchValidator('password', 'passwordRepeate')});
  }

  hasErrors(field: string, typeError: string) {
    return this.createUserForm.get(field)?.hasError(typeError) && this.createUserForm.get(field)?.touched;
  }


  registrarUsuario() {
    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }

  }
}


function passwordMatchValidator(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}
/**
 * Pendiente: AGREGAR UNA VALIDACION EN EL INPUT DEL NOMBRE PARA QUE
 * NO PERMITA INGRESAR NUMEROS
 */

