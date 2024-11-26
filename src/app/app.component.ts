import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TokenService } from './services/token.service';
import { IUser } from './model/IUser.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'amazon_clone';
  isLogged: boolean = false;
  private token = inject(TokenService);
  private userService = inject(UserService);
  user: IUser | null = null;
  constructor(private router: Router, private route: ActivatedRoute){}

  isLoginRoute(): boolean{
    if(this.router.url === '/login' || this.router.url === '/login/create-account'){
      return true;
    } else{
      return false;
    }
  }

  ngOnInit(): void {
    this.token.getTokenObservable().subscribe((token)=>{
      if(token != null){
        this.isLogged = true;
        this.userService.getUserInfo().subscribe((user: IUser) =>{
          this.user = user;
        })
      }
    })
  }
  

}