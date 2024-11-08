import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amazon_clone';
  isLogged: boolean = false;
  user: string = 'Aqui va el nombre del usuario al ingresar';
  constructor(private router: Router){}

  isLoginRoute(): boolean{
    return this.router.url === '/login';
  }


}