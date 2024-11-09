import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token = new BehaviorSubject<string | null>(null);
  setToken(token:string ): void{
    this.token.next(token);
  }

  getToken(): string | null {
    return this.token.value;
  }

  getTokenObservable(){
    return this.token.asObservable();
  }
}
