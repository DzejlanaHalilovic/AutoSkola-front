import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RasporedService {
  url= environment.apiUrl
  constructor(private http:HttpClient) { }

  postRasporedzakorisnike(raspored:any){
    return this.http.post<any>(`${this.url}/api/Raspored`,raspored);
  }


}
