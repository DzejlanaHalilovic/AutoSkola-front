import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="https://localhost:7193/api/Auth/"
  constructor(private http:HttpClient) { }

  getCredentials(user:any){
    return this.http.post<any>(`${this.url}login`,user);
  }

  isLoggedIn(){
    let token = localStorage.getItem('user');
    if(token == null)
    return false;
    return true;
  }
}
