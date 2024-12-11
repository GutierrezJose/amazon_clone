import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

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
}