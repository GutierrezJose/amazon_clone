import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://api.escuelajs.co/api/v1';
  private http = inject(HttpClient);

  verificarEmailIngresado(email: string) : Observable <any>{
    return this.http.post(`${this.baseUrl}/users/is-available`, {email});
  }

}
