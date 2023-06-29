import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OdsustvoService {

  url= environment.apiUrl
  constructor(private http:HttpClient) { }


  createOdsustvo(odsustvo:any){
    return this.http.post<any>(`${this.url}/api/UserRaspored`,odsustvo);
  }
  getAllOdsustvo(){
    return this.http.get<any>(`${this.url}/api/UserRaspored`);
  }
  getuserodsustvo(id:any){
    return this.http.get<any>(`${this.url}/api/UserRaspored/${id}`)
  }
  nijeodrzancas(cas:any){
    return this.http.post<any>(`${this.url}/api/Raspored/nijepostovanraspored`,cas);
  }

}
