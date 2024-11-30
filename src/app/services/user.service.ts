import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://api.escuelajs.co/api/v1';
  private http = inject(HttpClient);
  private token = inject(TokenService);


  verificarEmailIngresado(email: string) : Observable <any>{
    return this.http.post(`${this.baseUrl}/users/is-available`, {email});
  }

  login(email: string, password: string) : Observable <any>{
    return this.http.post(`${this.baseUrl}/auth/login`, {email, password});
  }

  getUserInfo(): Observable <any>{
    return this.http.get(`${this.baseUrl}/auth/profile`, { headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token.getToken()}`
    })})
  }

  createUSer(name: string, email: string, password: string, avatar: string): Observable <any>{
    return this.http.post(`${this.baseUrl}/users`, {name, email, password, avatar}, {observe: 'response'});
  }
}
