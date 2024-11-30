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

  createUserForm: FormGroup;
  contrasenasNoCoinciden: boolean = false;
  tieneNumeros: boolean = false;
  userService = inject(UserService);
  name : string = '';
  email : string = '';
  password : string = '';
  avatar : string = 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png';
  usuarioCreado : boolean = false;
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
    } else {
      this.name = this.createUserForm.get('nombreCompleto')?.value;
      this.email = this.createUserForm.get('email')?.value;
      this.password = this.createUserForm.get('password')?.value;
      this.userService.createUSer(this.name, this.email, this.password, this.avatar).subscribe((response) => {
        if(response.status === 201){
          this.usuarioCreado = true
        }
      })
    }

  }
}

/**
 * Por hacer: Registro del usuario
 */