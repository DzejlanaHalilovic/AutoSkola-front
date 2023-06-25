import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url= environment.apiUrl
  constructor(private http:HttpClient) { }

  getAllRoles(){
    return this.http.get<any>(`${this.url}/role`);
  }

  createUser(user: any){
    return this.http.post<any>(`${this.url}/api/Auth/register`,user);
  }
  createinstuktorraspored(instruktor:any){
    return this.http.post<any>(`${this.url}/api/Raspored/korisnici`,instruktor);
  }

  getLearnerList(){
    return this.http.get<any>(`${this.url}/polaznik-list`);
  }

  getInstructorList(){
    return this.http.get<any>(`${this.url}/instuktor-list`)
  }

  acceptUser(id:number){
    return this.http.put<any>(`${this.url}/api/User/accept/${id}`,null);
  }
  declineUser(id:number){
    return this.http.delete<any>(`${this.url}/api/User/decline/${id}`);
  }

  updateUser(id:number){
    return this.http.get<any>(`${this.url}/api/User`);
  }
  deleteUser(id:number){
    return this.http.delete<any>(`${this.url}/api/User/${id}`);
  }

  getUsers(){
    return this.http.get<any>(`${this.url}/api/User`);
  }
  getById(id:number){
    return this.http.get<any>(`${this.url}/api/User/${id}`);
  }
  checkToken(token : any)
  {
    const options = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.http.post<any>(`${this.url}/api/Auth/check-token`, token, options)
  }
  getAllKategories(){
    return this.http.get<any>(`${this.url}/api/Kategorija`);
  }
  getPolazniciByTipKategorije(tipKategorije: string) {
    return this.http.get<any>(`${this.url}/api/User/polaznicikategorija?tipKategorije=${tipKategorije}`);
  }

  getInstuktoriByTipKategorije(tipKategorije: string) {
    return this.http.get<any>(`${this.url}/api/User/instuktorikategorija?tipKategorije=${tipKategorije}`);
  }

  getkategorijauser(tipKategorije: string){
    return this.http.get<any>(`${this.url}//api/User/kategorija?tipKategorije=${tipKategorije}`);
  }

  getPolaznikSaInstuktorom(){
    return this.http.get<any>(`${this.url}/api/PolaznikInstuktor`);
  }
}


