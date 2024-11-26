import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static noNumbersValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (/\d/.test(value)) {
                return {
                    hasNumber: 'No se puede ingresar números'
                }
            } else {
                return null
            }

        }
    }

    static passwordMatchValidator(passwordKey: string, passwordRepeatedKey: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            if(formGroup.get(passwordRepeatedKey)?.touched){
                const password = formGroup.get(passwordKey)?.value;
                const passwordRepeate = formGroup.get(passwordRepeatedKey)?.value;
                if (password !== passwordRepeate) {
                    return {
                        passwordNotMatch: 'Las contraseñas no coinciden'
                    }
                } else {
                    return null
                }
            } else{
                return null;
            }
        }
    }
}