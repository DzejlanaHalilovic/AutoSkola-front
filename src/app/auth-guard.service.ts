import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private loginService:LoginService,private router:Router) {


  }
  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      // Ako je korisnik već prijavljen, preusmeri na željenu rutu
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
