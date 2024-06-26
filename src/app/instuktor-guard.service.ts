import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from './interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class InstuktorGuardService {

  constructor(private store: Store<{user: User}>, private router:Router) {
    this.store.select('user').subscribe(res=> this.user =  res);
  }
  user : User = {} as User
  // canActivate(): boolean {
  //   if (this.user?.role == 'Instuktor') {
  //     // Ako je korisnik administrator, dozvoli pristup ruti
  //     return true;
  //   } else {
  //     // Ako korisnik nije administrator, preusmjeri na drugu rutu iali prikaži poruku o nedozvoljenom pristupu
  //     this.router.navigate(['unauthorized']);
  //     return false;
  //   }
  // }
}
