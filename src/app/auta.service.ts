import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutaService {

  url= environment.apiUrl
  constructor(private http:HttpClient) { }

  getAuta(){
    return this.http.get<any>(`${this.url}/api/Automobil`);
  }
  getAutaByUserId(userId:any) {
  return this.http.get<any>(`${this.url}/api/Automobil/user/${userId}`);
  }

  createauto(auto:any){
    return this.http.post<any>(`${this.url}/api/UserAuto`,auto);
  }

}
